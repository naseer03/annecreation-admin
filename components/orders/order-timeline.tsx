"use client"

import { Button } from "@/components/ui/button"

import { CheckCircle2, Clock, Package, ShoppingCart, Truck, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderTimelineProps {
  order: any
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  // Generate timeline events based on order status
  const timelineEvents = [
    {
      id: 1,
      title: "Order Placed",
      description: `Order #${order.id} was placed by ${order.customer}`,
      date: order.dateModified,
      time: "10:00 AM",
      icon: ShoppingCart,
      status: "completed",
    },
    {
      id: 2,
      title: "Payment Confirmed",
      description: "Payment of ₹" + order.total + " was confirmed",
      date: order.dateModified,
      time: "10:15 AM",
      icon: CheckCircle2,
      status: "completed",
    },
    {
      id: 3,
      title: "Processing",
      description: "Order is being processed and prepared for shipping",
      date: order.status === "Pending" ? "" : order.dateModified,
      time: order.status === "Pending" ? "" : "02:30 PM",
      icon: Package,
      status: order.status === "Pending" ? "pending" : "completed",
    },
    {
      id: 4,
      title: "Shipped",
      description: "Order has been shipped via Express Delivery",
      date: ["Shipped", "Delivered"].includes(order.status) ? order.dateModified : "",
      time: ["Shipped", "Delivered"].includes(order.status) ? "09:45 AM" : "",
      icon: Truck,
      status: ["Shipped", "Delivered"].includes(order.status) ? "completed" : "pending",
    },
    {
      id: 5,
      title: order.status === "Cancelled" ? "Cancelled" : "Delivered",
      description: order.status === "Cancelled" ? "Order was cancelled" : "Order was delivered to the shipping address",
      date: order.status === "Delivered" || order.status === "Cancelled" ? order.dateModified : "",
      time: order.status === "Delivered" || order.status === "Cancelled" ? "03:20 PM" : "",
      icon: order.status === "Cancelled" ? XCircle : CheckCircle2,
      status: order.status === "Delivered" ? "completed" : order.status === "Cancelled" ? "cancelled" : "pending",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900">Order Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="relative flex gap-4">
                {index !== timelineEvents.length - 1 && (
                  <div
                    className={`absolute left-5 top-7 h-[calc(100%-24px)] w-px ${
                      event.status === "completed"
                        ? "bg-green-500"
                        : event.status === "cancelled"
                          ? "bg-red-500"
                          : "bg-gray-200"
                    }`}
                  />
                )}
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                    event.status === "completed"
                      ? "bg-green-100"
                      : event.status === "cancelled"
                        ? "bg-red-100"
                        : "bg-gray-100"
                  }`}
                >
                  <event.icon
                    className={`h-5 w-5 ${
                      event.status === "completed"
                        ? "text-green-600"
                        : event.status === "cancelled"
                          ? "text-red-600"
                          : "text-gray-500"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-medium ${
                        event.status === "completed"
                          ? "text-green-600"
                          : event.status === "cancelled"
                            ? "text-red-600"
                            : "text-gray-900"
                      }`}
                    >
                      {event.title}
                    </h3>
                    {event.date && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>
                          {event.date} {event.time}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900">Shipping Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Shipping Method</h4>
                <p className="text-gray-900">Express Delivery</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Tracking Number</h4>
                <p className="text-gray-900">
                  {["Shipped", "Delivered"].includes(order.status) ? "IND" + order.id.split("-")[2] + "XP" : "N/A"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Estimated Delivery</h4>
                <p className="text-gray-900">
                  {order.status === "Delivered"
                    ? "Delivered"
                    : order.status === "Cancelled"
                      ? "Cancelled"
                      : order.status === "Shipped"
                        ? "1-2 days"
                        : order.status === "Processing"
                          ? "3-5 days"
                          : "5-7 days"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Shipping Carrier</h4>
                <p className="text-gray-900">BlueDart Express</p>
              </div>
            </div>

            {["Shipped", "Delivered"].includes(order.status) && (
              <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4">
                <h4 className="mb-2 font-medium text-gray-900">Tracking Information</h4>
                <p className="text-sm text-gray-700">
                  Your order is {order.status === "Delivered" ? "delivered" : "on its way"}. You can track your order
                  using the tracking number provided above.
                </p>
                <Button className="mt-2 bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/90">Track Order</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
