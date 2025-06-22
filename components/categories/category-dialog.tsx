"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CategoryDetailsForm } from "./category-details-form"
import { CategorySeoForm } from "./category-seo-form"

interface CategoryDialogProps {
  children: React.ReactNode
  mode?: "create" | "edit"
  category?: any
}

export function CategoryDialog({ children, mode = "create", category }: CategoryDialogProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{mode === "create" ? "Add New Category" : "Edit Category"}</DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Create a new category for your products." : "Update the details of this category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Category Details</TabsTrigger>
              <TabsTrigger value="seo">SEO Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <CategoryDetailsForm category={category} />
            </TabsContent>
            <TabsContent value="seo" className="mt-6">
              <CategorySeoForm category={category} />
            </TabsContent>
          </Tabs>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/90">
              {mode === "create" ? "Create Category" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
