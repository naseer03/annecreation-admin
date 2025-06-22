"use client"

import { useState } from "react"
import { Clock, Globe, Laptop, Smartphone, Tablet } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for online users
const onlineUsers = [
  {
    id: "1",
    ip: "192.168.1.1",
    location: "New Delhi, India",
    device: "desktop",
    browser: "Chrome",
    os: "Windows",
    currentPage: "/products/embroidered-cushion",
    referrer: "Google",
    timeOnSite: "4m 32s",
    lastActive: "Just now",
  },
  {
    id: "2",
    ip: "203.0.113.1",
    location: "Mumbai, India",
    device: "mobile",
    browser: "Safari",
    os: "iOS",
    currentPage: "/checkout",
    referrer: "Direct",
    timeOnSite: "2m 15s",
    lastActive: "1m ago",
  },
  {
    id: "3",
    ip: "198.51.100.1",
    location: "Bangalore, India",
    device: "tablet",
    browser: "Firefox",
    os: "Android",
    currentPage: "/cart",
    referrer: "Facebook",
    timeOnSite: "8m 47s",
    lastActive: "3m ago",
  },
  {
    id: "4",
    ip: "203.0.113.42",
    location: "Chennai, India",
    device: "desktop",
    browser: "Edge",
    os: "Windows",
    currentPage: "/categories/home-decor",
    referrer: "Instagram",
    timeOnSite: "1m 05s",
    lastActive: "Just now",
  },
  {
    id: "5",
    ip: "198.51.100.42",
    location: "Hyderabad, India",
    device: "mobile",
    browser: "Chrome",
    os: "Android",
    currentPage: "/",
    referrer: "Direct",
    timeOnSite: "0m 45s",
    lastActive: "2m ago",
  },
  {
    id: "6",
    ip: "192.0.2.1",
    location: "Kolkata, India",
    device: "desktop",
    browser: "Chrome",
    os: "macOS",
    currentPage: "/products/table-runner",
    referrer: "Email",
    timeOnSite: "6m 12s",
    lastActive: "5m ago",
  },
  {
    id: "7",
    ip: "198.51.100.7",
    location: "Pune, India",
    device: "mobile",
    browser: "Chrome",
    os: "Android",
    currentPage: "/account/orders",
    referrer: "Direct",
    timeOnSite: "3m 22s",
    lastActive: "Just now",
  },
  {
    id: "8",
    ip: "203.0.113.8",
    location: "Ahmedabad, India",
    device: "tablet",
    browser: "Safari",
    os: "iPadOS",
    currentPage: "/categories/kitchen",
    referrer: "Google",
    timeOnSite: "1m 45s",
    lastActive: "4m ago",
  },
]

export function OnlineUsersList() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Calculate pagination
  const totalPages = Math.ceil(onlineUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = onlineUsers.slice(startIndex, endIndex)

  // Total online users count
  const totalOnlineUsers = onlineUsers.length

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Active Visitors</CardTitle>
          <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>{totalOnlineUsers} online</span>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visitor</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Current Page</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.ip}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Globe className="h-3 w-3" /> {user.location}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.device === "desktop" && <Laptop className="h-4 w-4" />}
                    {user.device === "mobile" && <Smartphone className="h-4 w-4" />}
                    {user.device === "tablet" && <Tablet className="h-4 w-4" />}
                    <span className="text-xs">
                      {user.browser} / {user.os}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-medium">{user.currentPage}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{user.referrer}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="h-3 w-3" />
                    {user.timeOnSite}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs">{user.lastActive}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
