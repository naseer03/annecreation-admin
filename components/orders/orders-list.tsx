"use client"
import { useState, useMemo , useEffect } from "react"
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
import { useGetRecentOrdersQuery } from "@/lib/redux/api/ordersApi"

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

// Helper to map status_id to status string
const mapStatus = (status_id: number): Order["status"] => {
  switch (status_id) {
    case 1:
      return "Processing";
    case 2:
      return "Pending";
    case 3:
      return "Shipped";
    case 4:
      return "Cancelled";
    case 5:
      return "Delivered";
    default:
      return "Pending";
  }
};


  

export function OrdersList() {
  // State for sorting
  const [sortField, setSortField] = useState<"id" | "customer" | "total" | "dateModified">("dateModified")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Fetch orders from API with pagination
  const { data, isLoading, isError } = useGetRecentOrdersQuery({ page: currentPage, limit: itemsPerPage });

  // Map API response to local Order type
  const ordersData: Order[] = Array.isArray(data?.orders)
    ? data.orders.map((order: any) => ({
        id: order.order_id ? `ORD-${order.order_id}` : "",
        customer: order.customer?.name || "",
        email: order.customer?.email || "",
        phone: order.customer?.telephone || "",
        product: Array.isArray(order.products)
          ? order.products.map((p: any) => p.name).join(", ")
          : "",
        status: mapStatus(order.status_id),
        total: order.total || 0,
        device: "Desktop", // Set device if available in API, else default
        dateModified: order.date_added
          ? new Date(order.date_added).toLocaleDateString()
          : "",
      })
    )
    : [];

  // Get unique statuses for filtering
  const statuses = Array.from(new Set(ordersData.map((order) => order.status)));

  // State for filtering
  const [searchQuery, setSearchQuery] = useState("")
  const [searchField, setSearchField] = useState<"all" | "id" | "customer" | "email" | "phone">("all")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(statuses)

  // Sync selectedStatuses with statuses when API data changes
  useEffect(() => {
    // Only update selectedStatuses if contents actually changed
    if (statuses.length !== selectedStatuses.length || !statuses.every((s) => selectedStatuses.includes(s))) {
      setSelectedStatuses(statuses);
    }
  }, [statuses]);
  // Remove this state
  // const [selectedDevices, setSelectedDevices] = useState<string[]>(devices)

  // Toggle sort direction or change sort field
  const handleSort = (field: "id" | "customer" | "total" | "dateModified") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    return ordersData
      .filter((order) => {
        // Filter by search query based on selected search field
        if (searchQuery) {
          if (searchField === "id") {
            return order.id.toLowerCase().includes(searchQuery.toLowerCase());
          } else if (searchField === "customer") {
            return order.customer.toLowerCase().includes(searchQuery.toLowerCase());
          } else if (searchField === "email") {
            return order.email.toLowerCase().includes(searchQuery.toLowerCase());
          } else if (searchField === "phone") {
            return order.phone.toLowerCase().includes(searchQuery.toLowerCase());
          } else {
            // Search in all fields
            return (
              order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order.phone.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
        }
        return true;
      })
      .filter((order) => selectedStatuses.includes(order.status))
      .sort((a, b) => {
        // Sort by selected field and direction
        if (sortField === "id") {
          return sortDirection === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        } else if (sortField === "customer") {
          return sortDirection === "asc" ? a.customer.localeCompare(b.customer) : b.customer.localeCompare(a.customer);
        } else if (sortField === "total") {
          return sortDirection === "asc" ? a.total - b.total : b.total - a.total;
        } else {
          return sortDirection === "asc"
            ? a.dateModified.localeCompare(b.dateModified)
            : b.dateModified.localeCompare(a.dateModified);
        }
      });
  }, [ordersData, sortField, sortDirection, searchQuery, searchField, selectedStatuses]);

  // Pagination from API response
  const totalOrders = typeof data?.totalOrders === "number" ? data.totalOrders : ordersData.length;
  const totalPages = Math.max(1, Math.ceil(totalOrders / itemsPerPage));

  // Handle page change
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

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
            <CardDescription className="text-gray-500">
              {isLoading
                ? "Loading orders..."
                : isError
                ? "Failed to load orders."
                : `${filteredAndSortedOrders.length} orders found`}
            </CardDescription>
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
                  disabled={isLoading}
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center text-red-600">
                    Failed to load orders.
                  </TableCell>
                </TableRow>
              ) : filteredAndSortedOrders.length > 0 ? (
                filteredAndSortedOrders.map((order) => (
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
                setItemsPerPage(Number(value));
                setCurrentPage(1);
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
  );
}
