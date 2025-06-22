"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderDetails } from "./order-details"
import { OrderCustomer } from "./order-customer"
import { OrderTimeline } from "./order-timeline"

interface OrderDialogProps {
  children: React.ReactNode
  order: any
}

export function OrderDialog({ children, order }: OrderDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Order {order.id}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="customer">Customer Info</TabsTrigger>
            <TabsTrigger value="timeline">Order Timeline</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <OrderDetails order={order} />
          </TabsContent>
          <TabsContent value="customer" className="mt-6">
            <OrderCustomer order={order} />
          </TabsContent>
          <TabsContent value="timeline" className="mt-6">
            <OrderTimeline order={order} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
