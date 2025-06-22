"use client"

import { Mail, Phone, MapPin, ShoppingBag, Calendar, Monitor, Smartphone, Tablet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface OrderCustomerProps {
  order: any
}

export function OrderCustomer({ order }: OrderCustomerProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-900">Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <span className="text-lg font-medium text-gray-700">
                    {order.customer
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{order.customer}</h3>
                  <p className="text-sm text-gray-500">Customer since Jan 2023</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{order.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{order.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Mumbai, Maharashtra, India</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-300">
                  View Profile
                </Button>
                <Button variant="outline" className="border-gray-300">
                  Send Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-900">Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Total Orders</span>
                </div>
                <span className="font-medium text-gray-900">5</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">First Order</span>
                </div>
                <span className="font-medium text-gray-900">Jan 15, 2023</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Last Order</span>
                </div>
                <span className="font-medium text-gray-900">{order.dateModified}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Total Spent</span>
                </div>
                <span className="font-medium text-gray-900">₹{order.total * 5}</span>
              </div>

              <Button className="w-full bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/90">View All Orders</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-900">Device Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {order.device === "Desktop" ? (
                <Monitor className="h-5 w-5 text-gray-500" />
              ) : order.device === "Mobile" ? (
                <Smartphone className="h-5 w-5 text-gray-500" />
              ) : (
                <Tablet className="h-5 w-5 text-gray-500" />
              )}
              <div>
                <h3 className="font-medium text-gray-900">Device Type</h3>
                <p className="text-gray-700">{order.device}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-md border border-gray-200 p-3">
                <h4 className="text-sm font-medium text-gray-700">Browser</h4>
                <p className="text-gray-900">Chrome 98.0.4758.102</p>
              </div>
              <div className="rounded-md border border-gray-200 p-3">
                <h4 className="text-sm font-medium text-gray-700">Operating System</h4>
                <p className="text-gray-900">
                  {order.device === "Desktop" ? "Windows 11" : order.device === "Mobile" ? "Android 12" : "iPadOS 15"}
                </p>
              </div>
              <div className="rounded-md border border-gray-200 p-3">
                <h4 className="text-sm font-medium text-gray-700">IP Address</h4>
                <p className="text-gray-900">103.86.XX.XX</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
