"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Printer } from "lucide-react"

interface OrderDetailsProps {
  order: any
}

export function OrderDetails({ order }: OrderDetailsProps) {
  // Sample order items for the demo
  const orderItems = [
    {
      id: 1,
      name: order.product,
      price: order.total,
      quantity: 1,
      image: "/abstract-geometric-shapes.png",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
          <p className="text-sm text-gray-500">Order placed on {order.dateModified}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1 border-gray-300">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button className="gap-1 bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/90">
            <FileText className="h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Order Status</h4>
            <Badge
              className={
                order.status === "Delivered"
                  ? "mt-1 bg-green-100 text-green-800 hover:bg-green-200"
                  : order.status === "Processing"
                    ? "mt-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
                    : order.status === "Shipped"
                      ? "mt-1 bg-purple-100 text-purple-800 hover:bg-purple-200"
                      : order.status === "Pending"
                        ? "mt-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        : "mt-1 bg-red-100 text-red-800 hover:bg-red-200"
              }
            >
              {order.status}
            </Badge>
          </div>
          <div className="text-right">
            <h4 className="font-medium text-gray-900">Order ID</h4>
            <p className="text-gray-700">{order.id}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h4 className="mb-4 font-medium text-gray-900">Order Items</h4>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <h5 className="font-medium text-gray-900">{item.name}</h5>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="font-medium text-gray-900">₹{order.total}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="font-medium text-gray-900">₹0.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Tax</p>
              <p className="font-medium text-gray-900">₹0.00</p>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <p className="font-medium text-gray-900">Total</p>
              <p className="font-medium text-gray-900">₹{order.total}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <h4 className="mb-2 font-medium text-gray-900">Shipping Address</h4>
          <p className="text-gray-700">{order.customer}</p>
          <p className="text-gray-700">123 Main Street</p>
          <p className="text-gray-700">Apartment 4B</p>
          <p className="text-gray-700">Mumbai, Maharashtra 400001</p>
          <p className="text-gray-700">India</p>
          <p className="mt-2 text-gray-700">{order.phone}</p>
        </div>

        <div className="rounded-md border border-gray-200 bg-white p-4">
          <h4 className="mb-2 font-medium text-gray-900">Payment Information</h4>
          <p className="text-gray-700">Payment Method: Credit Card</p>
          <p className="text-gray-700">Card: **** **** **** 1234</p>
          <p className="text-gray-700">Status: Paid</p>
          <p className="text-gray-700">Date: {order.dateModified}</p>
          <p className="text-gray-700">Transaction ID: TXN-{order.id.split("-")[2]}</p>
        </div>
      </div>
    </div>
  )
}
