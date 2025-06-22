"use client"

import { useState, useMemo } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
  MoreHorizontal,
  Eye,
  FileText,
  Truck,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { OrderDialog } from "./order-dialog"

// Define the order data structure
interface Order {
  id: string
  customer: string
  email: string
  phone: string
  product: string
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
  total: number
  device: "Desktop" | "Mobile" | "Tablet"
  dateModified: string
}

// Sample order data
const ordersData: Order[] = [
  {
    id: "ORD-2023-1001",
    customer: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    product: "Butterfly Design Pattern",
    status: "Delivered",
    total: 60,
    device: "Desktop",
    dateModified: "2023-05-15",
  },
  {
    id: "ORD-2023-1002",
    customer: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    product: "Leaf Pattern Collection",
    status: "Processing",
    total: 75,
    device: "Mobile",
    dateModified: "2023-05-16",
  },
  {
    id: "ORD-2023-1003",
    customer: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 76543 21098",
    product: "Boat Neck Design",
    status: "Shipped",
    total: 90,
    device: "Desktop",
    dateModified: "2023-05-17",
  },
  {
    id: "ORD-2023-1004",
    customer: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    phone: "+91 65432 10987",
    product: "Bridal Collection Pattern",
    status: "Pending",
    total: 120,
    device: "Mobile",
    dateModified: "2023-05-18",
  },
  {
    id: "ORD-2023-1005",
    customer: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 54321 09876",
    product: "Cross Stitch Pattern",
    status: "Delivered",
    total: 65,
    device: "Tablet",
    dateModified: "2023-05-19",
  },
  {
    id: "ORD-2023-1006",
    customer: "Neha Verma",
    email: "neha.verma@example.com",
    phone: "+91 43210 98765",
    product: "Peacock Design",
    status: "Cancelled",
    total: 85,
    device: "Desktop",
    dateModified: "2023-05-20",
  },
  {
    id: "ORD-2023-1007",
    customer: "Rajesh Khanna",
    email: "rajesh.khanna@example.com",
    phone: "+91 32109 87654",
    product: "Pot Neck Pattern",
    status: "Delivered",
    total: 70,
    device: "Mobile",
    dateModified: "2023-05-21",
  },
  {
    id: "ORD-2023-1008",
    customer: "Ananya Mishra",
    email: "ananya.mishra@example.com",
    phone: "+91 21098 76543",
    product: "Chain Stitch Collection",
    status: "Processing",
    total: 80,
    device: "Desktop",
    dateModified: "2023-05-22",
  },
  {
    id: "ORD-2023-1009",
    customer: "Sanjay Joshi",
    email: "sanjay.joshi@example.com",
    phone: "+91 10987 65432",
    product: "Elephant Design",
    status: "Shipped",
    total: 95,
    device: "Tablet",
    dateModified: "2023-05-23",
  },
  {
    id: "ORD-2023-1010",
    customer: "Meera Reddy",
    email: "meera.reddy@example.com",
    phone: "+91 09876 54321",
    product: "Kids Neck Pattern",
    status: "Delivered",
    total: 60,
    device: "Mobile",
    dateModified: "2023-05-24",
  },
  {
    id: "ORD-2023-1011",
    customer: "Arjun Nair",
    email: "arjun.nair@example.com",
    phone: "+91 98765 12345",
    product: "Cutwork Design",
    status: "Pending",
    total: 110,
    device: "Desktop",
    dateModified: "2023-05-25",
  },
  {
    id: "ORD-2023-1012",
    customer: "Kavita Menon",
    email: "kavita.menon@example.com",
    phone: "+91 87654 23456",
    product: "Creative God Design",
    status: "Processing",
    total: 130,
    device: "Mobile",
    dateModified: "2023-05-26",
  },
]

// Get unique statuses and devices for filtering
const statuses = Array.from(new Set(ordersData.map((order) => order.status)))
// Remove this line
// const devices = Array.from(new Set(ordersData.map((order) => order.device)))

export function OrdersList() {
  // State for sorting
  const [sortField, setSortField] = useState<"id" | "customer" | "total" | "dateModified">("dateModified")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // State for filtering
  const [searchQuery, setSearchQuery] = useState("")
  const [searchField, setSearchField] = useState<"all" | "id" | "customer" | "email" | "phone">("all")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(statuses)
  // Remove this state
  // const [selectedDevices, setSelectedDevices] = useState<string[]>(devices)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Toggle sort direction or change sort field
  const handleSort = (field: "id" | "customer" | "total" | "dateModified") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    return ordersData
      .filter((order) => {
        // Filter by search query based on selected search field
        if (searchQuery) {
          if (searchField === "id") {
            return order.id.toLowerCase().includes(searchQuery.toLowerCase())
          } else if (searchField === "customer") {
            return order.customer.toLowerCase().includes(searchQuery.toLowerCase())
          } else if (searchField === "email") {
            return order.email.toLowerCase().includes(searchQuery.toLowerCase())
          } else if (searchField === "phone") {
            return order.phone.toLowerCase().includes(searchQuery.toLowerCase())
          } else {
            // Search in all fields
            return (
              order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order.phone.toLowerCase().includes(searchQuery.toLowerCase())
            )
          }
        }
        return true
      })
      .filter(
        (order) =>
          // Filter by selected statuses
          selectedStatuses.includes(order.status),
        // Remove this line: && selectedDevices.includes(order.device)
      )
      .sort((a, b) => {
        // Sort by selected field and direction
        if (sortField === "id") {
          return sortDirection === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
        } else if (sortField === "customer") {
          return sortDirection === "asc" ? a.customer.localeCompare(b.customer) : b.customer.localeCompare(a.customer)
        } else if (sortField === "total") {
          return sortDirection === "asc" ? a.total - b.total : b.total - a.total
        } else {
          return sortDirection === "asc"
            ? a.dateModified.localeCompare(b.dateModified)
            : b.dateModified.localeCompare(a.dateModified)
        }
      })
  }, [ordersData, sortField, sortDirection, searchQuery, searchField, selectedStatuses])

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage)
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedOrders, currentPage, itemsPerPage])

  // Handle page change
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  // Toggle status selection
  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
    } else {
      setSelectedStatuses([...selectedStatuses, status])
    }
  }

  // Remove this function
  // const toggleDevice = (device: string) => {
  //   if (selectedDevices.includes(device)) {
  //     setSelectedDevices(selectedDevices.filter((d) => d !== device))
  //   } else {
  //     setSelectedDevices([...selectedDevices, device])
  //   }
  // }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSearchField("all")
    setSelectedStatuses(statuses)
    // Remove this line: setSelectedDevices(devices)
    setCurrentPage(1)
  }

  return (
    <Card className="border border-gray-200 bg-white shadow-md">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">All Orders</CardTitle>
            <CardDescription className="text-gray-500">{filteredAndSortedOrders.length} orders found</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Select
                value={searchField}
                onValueChange={(value: "all" | "id" | "customer" | "email" | "phone") => setSearchField(value)}
              >
                <SelectTrigger className="w-full sm:w-[150px] border-gray-300">
                  <SelectValue placeholder="Search by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  <SelectItem value="id">Order ID</SelectItem>
                  <SelectItem value="customer">Customer Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative w-full sm:w-auto">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder={`Search by ${searchField === "all" ? "any field" : searchField}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 border-gray-300 w-full"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-7 w-7"
                    onClick={() => setSearchQuery("")}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1 border-gray-300">
                  <FilterIcon className="h-4 w-4" />
                  Status
                  {selectedStatuses.length < statuses.length && (
                    <Badge className="ml-1 bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/80">
                      {selectedStatuses.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {statuses.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={() => toggleStatus(status)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Remove this dropdown menu */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1 border-gray-300">
                  <FilterIcon className="h-4 w-4" />
                  Device
                  {selectedDevices.length < devices.length && (
                    <Badge className="ml-1 bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/80">
                      {selectedDevices.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Device</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {devices.map((device) => (
                  <DropdownMenuCheckboxItem
                    key={device}
                    checked={selectedDevices.includes(device)}
                    onCheckedChange={() => toggleDevice(device)}
                  >
                    {device}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu> */}

            <Button variant="outline" className="border-gray-300" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 p-0 font-semibold text-gray-700 hover:bg-transparent hover:text-gray-900"
                    onClick={() => handleSort("id")}
                  >
                    Order ID
                    {sortField === "id" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">Product</TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 p-0 font-semibold text-gray-700 hover:bg-transparent hover:text-gray-900"
                    onClick={() => handleSort("customer")}
                  >
                    Customer
                    {sortField === "customer" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">Email</TableHead>
                <TableHead className="font-semibold text-gray-700">Phone Number</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 p-0 font-semibold text-gray-700 hover:bg-transparent hover:text-gray-900"
                    onClick={() => handleSort("total")}
                  >
                    Total
                    {sortField === "total" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 p-0 font-semibold text-gray-700 hover:bg-transparent hover:text-gray-900"
                    onClick={() => handleSort("dateModified")}
                  >
                    Date Modified
                    {sortField === "dateModified" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
                    <TableCell className="text-gray-700">{order.product}</TableCell>
                    <TableCell className="font-medium text-gray-900">{order.customer}</TableCell>
                    <TableCell className="text-gray-700">{order.email}</TableCell>
                    <TableCell className="text-gray-700">{order.phone}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              : order.status === "Shipped"
                                ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                : order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                  : "bg-red-100 text-red-800 hover:bg-red-200"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">₹{order.total}</TableCell>
                    <TableCell className="text-gray-700">{order.dateModified}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <OrderDialog order={order}>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </OrderDialog>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Generate Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="h-8 w-[70px] border-gray-300">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">Items per page</p>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gray-300"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gray-300"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <span className="mx-2 text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gray-300"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gray-300"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
