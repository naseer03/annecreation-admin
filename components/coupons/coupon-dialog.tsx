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
import { CouponForm } from "./coupon-form"

interface CouponDialogProps {
  children: React.ReactNode
  mode?: "create" | "edit"
  coupon?: any
}

export function CouponDialog({ children, mode = "create", coupon }: CouponDialogProps) {
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
          <DialogTitle className="text-xl">{mode === "create" ? "Add New Coupon" : "Edit Coupon"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new discount coupon for your customers."
              : "Update the details of this coupon."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <CouponForm coupon={coupon} />

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
              {mode === "create" ? "Create Coupon" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
