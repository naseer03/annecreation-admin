"use client"

import type React from "react"

import { useState } from "react"
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
import { CustomerForm } from "./customer-form"

interface CustomerDialogProps {
  children: React.ReactNode
  mode?: "create" | "edit"
  customer?: any
}

export function CustomerDialog({ children, mode = "create", customer }: CustomerDialogProps) {
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
          <DialogTitle className="text-xl">{mode === "create" ? "Add New Customer" : "Edit Customer"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new customer account with contact information."
              : "Update the customer's information."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <CustomerForm customer={customer} />

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
              {mode === "create" ? "Create Customer" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
