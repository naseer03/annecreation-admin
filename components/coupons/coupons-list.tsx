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
  Edit,
  Trash,
  Copy,
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
import { CouponDialog } from "./coupon-dialog"

// Define the coupon data structure
interface Coupon {
  id: number
  name: string
  code: string
  discount: string
  discountType: "Percentage" | "Fixed Amount"
  dateStart: string
  dateEnd: string
  status: "Active" | "Inactive" | "Expired"
  usageLimit?: number
  usageCount?: number
  minimumSpend?: number
}

// Sample coupon data
const couponsData: Coupon[] = [
  {
    id: 1,
    name: "Summer Sale",
    code: "SUMMER25",
    discount: "25",
    discountType: "Percentage",
    dateStart: "2023-06-01",
    dateEnd: "2023-08-31",
    status: "Active",
    usageLimit: 100,
    usageCount: 45,
    minimumSpend: 1000,
  },
  {
    id: 2,
    name: "New Customer",
    code: "WELCOME10",
    discount: "10",
    discountType: "Percentage",
    dateStart: "2023-01-01",
    dateEnd: "2023-12-31",
    status: "Active",
    usageLimit: 1000,
    usageCount: 358,
    minimumSpend: 500,
  },
  {
    id: 3,
    name: "Diwali Special",
    code: "DIWALI500",
    discount: "500",
    discountType: "Fixed Amount",
    dateStart: "2023-10-15",
    dateEnd: "2023-11-15",
    status: "Inactive",
    usageLimit: 200,
    usageCount: 0,
    minimumSpend: 2000,
  },
  {
    id: 4,
    name: "Weekend Flash Sale",
    code: "FLASH20",
    discount: "20",
    discountType: "Percentage",
    dateStart: "2023-05-01",
    dateEnd: "2023-05-31",
    status: "Expired",
    usageLimit: 50,
    usageCount: 50,
    minimumSpend: 1500,
  },
  {
    id: 5,
    name: "Free Shipping",
    code: "FREESHIP",
    discount: "100",
    discountType: "Fixed Amount",
    dateStart: "2023-07-01",
    dateEnd: "2023-12-31",
    status: "Active",
    usageLimit: 500,
    usageCount: 123,
    minimumSpend: 1000,
  },
  {
    id: 6,
    name: "Birthday Special",
    code: "BDAY15",
    discount: "15",
    discountType: "Percentage",
    dateStart: "2023-01-01",
    dateEnd: "2023-12-31",
    status: "Active",
    usageLimit: 1000,
    usageCount: 278,
    minimumSpend: 0,
  },
  {
    id: 7,
    name: "Clearance Sale",
    code: "CLEAR30",
    discount: "30",
    discountType: "Percentage",
    dateStart: "2023-08-15",
    dateEnd: "2023-09-15",
    status: "Inactive",
    usageLimit: 0,
    usageCount: 0,
    minimumSpend: 2500,
  },
  {
    id: 8,
    name: "First Order",
    code: "FIRST200",
    discount: "200",
    discountType: "Fixed Amount",
    dateStart: "2023-01-01",
    dateEnd: "2023-12-31",
    status: "Active",
    usageLimit: 1,
    usageCount: 456,
    minimumSpend: 1000,
  },
  {
    id: 9,
    name: "Loyalty Reward",
    code: "LOYAL50",
    discount: "50",
    discountType: "Fixed Amount",
    dateStart: "2023-01-01",
    dateEnd: "2023-12-31",
    status: "Active",
    usageLimit: 0,
    usageCount: 89,
    minimumSpend: 500,
  },
  {
    id: 10,
    name: "Holiday Special",
    code: "HOLIDAY25",
    discount: "25",
    discountType: "Percentage",
    dateStart: "2023-12-01",
    dateEnd: "2023-12-31",
    status: "Inactive",
    usageLimit: 300,
    usageCount: 0,
    minimumSpend: 1000,
  },
]

// Get unique statuses for filtering
const statuses = Array.from(new Set(couponsData.map((coupon) => coupon.status)))
const discountTypes = ["Percentage", "Fixed Amount"]

export function CouponsList() {
  // State for sorting
  const [sortField, setSortField] = useState<"name" | "dateStart" | "dateEnd">("dateStart")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // State for filtering
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(statuses)
  const [selectedDiscountTypes, setSelectedDiscountTypes] = useState<string[]>(discountTypes)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Toggle sort direction or change sort field
  const handleSort = (field: "name" | "dateStart" | "dateEnd") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort coupons
  const filteredAndSortedCoupons = useMemo(() => {
    return couponsData
      .filter((coupon) => {
        // Filter by search query
        if (searchQuery) {
          return (
            coupon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }
        return true
      })
      .filter(
        (coupon) =>
          // Filter by selected statuses
          selectedStatuses.includes(coupon.status) &&
          // Filter by selected discount types
          selectedDiscountTypes.includes(coupon.discountType),
      )
      .sort((a, b) => {
        // Sort by selected field and direction
        if (sortField === "name") {
          return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        } else if (sortField === "dateStart") {
          return sortDirection === "asc"
            ? a.dateStart.localeCompare(b.dateStart)
            : b.dateStart.localeCompare(a.dateStart)
        } else {
          return sortDirection === "asc" ? a.dateEnd.localeCompare(b.dateEnd) : b.dateEnd.localeCompare(a.dateEnd)
        }
      })
  }, [couponsData, sortField, sortDirection, searchQuery, selectedStatuses, selectedDiscountTypes])

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedCoupons.length / itemsPerPage)
  const paginatedCoupons = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedCoupons.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedCoupons, currentPage, itemsPerPage])

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

  // Toggle discount type selection
  const toggleDiscountType = (type: string) => {
    if (selectedDiscountTypes.includes(type)) {
      setSelectedDiscountTypes(selectedDiscountTypes.filter((t) => t !== type))
    } else {
      setSelectedDiscountTypes([...selectedDiscountTypes, type])
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedStatuses(statuses)
    setSelectedDiscountTypes(discountTypes)
  }

  // Copy coupon code to clipboard
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    // You could add a toast notification here
  }

  return (
    <Card className="border border-gray-200 bg-white shadow-md">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">All Coupons</CardTitle>
            <CardDescription className="text-gray-500">{filteredAndSortedCoupons.length} coupons found</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name or code..."
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1 border-gray-300">
                  <FilterIcon className="h-4 w-4" />
                  Discount Type
                  {selectedDiscountTypes.length < discountTypes.length && (
                    <Badge className="ml-1 bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/80">
                      {selectedDiscountTypes.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Discount Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {discountTypes.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedDiscountTypes.includes(type)}
                    onCheckedChange={() => toggleDiscountType(type)}
                  >
                    {type}
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
                    onClick={() => handleSort("name")}
                  >
                    Coupon Name
                    {sortField === "name" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">Code</TableHead>
                <TableHead className="font-semibold text-gray-700">Discount</TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 p-0 font-semibold text-gray-700 hover:bg-transparent hover:text-gray-900"
                    onClick={() => handleSort("dateStart")}
                  >
                    Date Start
                    {sortField === "dateStart" &&
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
                    onClick={() => handleSort("dateEnd")}
                  >
                    Date End
                    {sortField === "dateEnd" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCoupons.length > 0 ? (
                paginatedCoupons.map((coupon) => (
                  <TableRow key={coupon.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{coupon.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">{coupon.code}</code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(coupon.code)}
                          title="Copy to clipboard"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {coupon.discountType === "Percentage" ? `${coupon.discount}%` : `₹${coupon.discount}`}
                    </TableCell>
                    <TableCell className="text-gray-700">{coupon.dateStart}</TableCell>
                    <TableCell className="text-gray-700">{coupon.dateEnd}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          coupon.status === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : coupon.status === "Inactive"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                        }
                      >
                        {coupon.status}
                      </Badge>
                    </TableCell>
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
                          <CouponDialog mode="edit" coupon={coupon}>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </CouponDialog>
                          <DropdownMenuItem onClick={() => copyToClipboard(coupon.code)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Code
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No coupons found.
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
