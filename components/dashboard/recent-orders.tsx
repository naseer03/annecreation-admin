import { ArrowRightIcon, CheckCircle2, Clock, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    date: "2023-05-15",
    amount: "₹129.99",
    status: "Completed",
  },
  {
    id: "ORD-002",
    customer: "Michael Brown",
    date: "2023-05-14",
    amount: "₹59.99",
    status: "Processing",
  },
  {
    id: "ORD-003",
    customer: "Emily Davis",
    date: "2023-05-13",
    amount: "₹89.99",
    status: "Completed",
  },
  {
    id: "ORD-004",
    customer: "James Wilson",
    date: "2023-05-12",
    amount: "₹149.99",
    status: "Cancelled",
  },
  {
    id: "ORD-005",
    customer: "Olivia Martinez",
    date: "2023-05-11",
    amount: "₹79.99",
    status: "Processing",
  },
]

export function RecentOrders() {
  return (
    <Card className="border border-gray-200 bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-gray-900">Recent Orders</CardTitle>
          <CardDescription className="text-gray-500">You have {orders.length} orders this month</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1 border border-gray-300">
          View All
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Order ID</TableHead>
                <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                <TableHead className="font-semibold text-gray-700">Date</TableHead>
                <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
                  <TableCell className="text-gray-700">{order.customer}</TableCell>
                  <TableCell className="text-gray-700">{order.date}</TableCell>
                  <TableCell className="font-medium text-gray-900">{order.amount}</TableCell>
                  <TableCell>
                    {order.status === "Completed" ? (
                      <div className="flex w-24 items-center justify-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{order.status}</span>
                      </div>
                    ) : order.status === "Processing" ? (
                      <div className="flex w-24 items-center justify-center gap-1 rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{order.status}</span>
                      </div>
                    ) : (
                      <div className="flex w-24 items-center justify-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">
                        <XCircle className="h-3.5 w-3.5" />
                        <span>{order.status}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
