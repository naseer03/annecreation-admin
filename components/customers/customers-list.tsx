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
  Eye,
  Mail,
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
import { CustomerDialog } from "./customer-dialog"

// Define the customer data structure
interface Customer {
  id: number
  name: string
  email: string
  telephone: string
  city: string
  state: string
  status: "Active" | "Inactive" | "Pending"
  dateAdded: string
}

// Sample customer data
const customersData: Customer[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    telephone: "+91 98765 43210",
    city: "Mumbai",
    state: "Maharashtra",
    status: "Active",
    dateAdded: "2023-05-15",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@example.com",
    telephone: "+91 87654 32109",
    city: "Ahmedabad",
    state: "Gujarat",
    status: "Active",
    dateAdded: "2023-05-16",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    telephone: "+91 76543 21098",
    city: "Delhi",
    state: "Delhi",
    status: "Inactive",
    dateAdded: "2023-05-17",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    telephone: "+91 65432 10987",
    city: "Kolkata",
    state: "West Bengal",
    status: "Pending",
    dateAdded: "2023-05-18",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    telephone: "+91 54321 09876",
    city: "Jaipur",
    state: "Rajasthan",
    status: "Active",
    dateAdded: "2023-05-19",
  },
  {
    id: 6,
    name: "Neha Verma",
    email: "neha.verma@example.com",
    telephone: "+91 43210 98765",
    city: "Bengaluru",
    state: "Karnataka",
    status: "Active",
    dateAdded: "2023-05-20",
  },
  {
    id: 7,
    name: "Rajesh Khanna",
    email: "rajesh.khanna@example.com",
    telephone: "+91 32109 87654",
    city: "Chennai",
    state: "Tamil Nadu",
    status: "Inactive",
    dateAdded: "2023-05-21",
  },
  {
    id: 8,
    name: "Ananya Mishra",
    email: "ananya.mishra@example.com",
    telephone: "+91 21098 76543",
    city: "Hyderabad",
    state: "Telangana",
    status: "Active",
    dateAdded: "2023-05-22",
  },
  {
    id: 9,
    name: "Sanjay Joshi",
    email: "sanjay.joshi@example.com",
    telephone: "+91 10987 65432",
    city: "Pune",
    state: "Maharashtra",
    status: "Pending",
    dateAdded: "2023-05-23",
  },
  {
    id: 10,
    name: "Meera Reddy",
    email: "meera.reddy@example.com",
    telephone: "+91 09876 54321",
    city: "Coimbatore",
    state: "Tamil Nadu",
    status: "Active",
    dateAdded: "2023-05-24",
  },
  {
    id: 11,
    name: "Arjun Nair",
    email: "arjun.nair@example.com",
    telephone: "+91 98765 12345",
    city: "Kochi",
    state: "Kerala",
    status: "Active",
    dateAdded: "2023-05-25",
  },
  {
    id: 12,
    name: "Kavita Menon",
    email: "kavita.menon@example.com",
    telephone: "+91 87654 23456",
    city: "Thiruvananthapuram",
    state: "Kerala",
    status: "Inactive",
    dateAdded: "2023-05-26",
  },
]

// Get unique states and statuses for filtering
const states = Array.from(new Set(customersData.map((customer) => customer.state)))
// const statuses = Array.from(new Set(customersData.map((customer) => customer.status)))

export function CustomersList() {
  // State for sorting
  const [sortField, setSortField] = useState<"name" | "dateAdded">("dateAdded")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // State for filtering
  const [searchQuery, setSearchQuery] = useState("")
  const [searchField, setSearchField] = useState<"all" | "name" | "email" | "telephone">("all")
  const [selectedStates, setSelectedStates] = useState<string[]>(states)
  // const [selectedStatuses, setSelectedStatuses] = useState<string[]>(statuses)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Toggle sort direction or change sort field
  const handleSort = (field: "name" | "dateAdded") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort customers
  const filteredAndSortedCustomers = useMemo(() => {
    return customersData
      .filter((customer) => {
        // Filter by search query based on selected search field
        if (searchQuery) {
          if (searchField === "name") {
            return customer.name.toLowerCase().includes(searchQuery.toLowerCase())
          } else if (searchField === "email") {
            return customer.email.toLowerCase().includes(searchQuery.toLowerCase())
          } else if (searchField === "telephone") {
            return customer.telephone.toLowerCase().includes(searchQuery.toLowerCase())
          } else {
            // Search in all fields
            return (
              customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              customer.telephone.toLowerCase().includes(searchQuery.toLowerCase())
            )
          }
        }
        return true
      })
      .filter(
        (customer) =>
          // Filter by selected states
          selectedStates.includes(customer.state),
        //   &&
        //   // Filter by selected statuses
        //   selectedStatuses.includes(customer.status),
      )
      .sort((a, b) => {
        // Sort by selected field and direction
        if (sortField === "name") {
          return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        } else {
          return sortDirection === "asc"
            ? a.dateAdded.localeCompare(b.dateAdded)
            : b.dateAdded.localeCompare(a.dateAdded)
        }
      })
  }, [customersData, sortField, sortDirection, searchQuery, searchField, selectedStates])

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedCustomers.length / itemsPerPage)
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedCustomers.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedCustomers, currentPage, itemsPerPage])

  // Handle page change
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  // Toggle state selection
  const toggleState = (state: string) => {
    if (selectedStates.includes(state)) {
      setSelectedStates(selectedStates.filter((s) => s !== state))
    } else {
      setSelectedStates([...selectedStates, state])
    }
  }

  // Toggle status selection
  // const toggleStatus = (status: string) => {
  //   if (selectedStatuses.includes(status)) {
  //     setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
  //   } else {
  //     setSelectedStatuses([...selectedStatuses, status])
  //   }
  // }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSearchField("all")
    setSelectedStates(states)
    // setSelectedStatuses(statuses)
  }

  return (
    <Card className="border border-gray-200 bg-white shadow-md">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">All Customers</CardTitle>
            <CardDescription className="text-gray-500">
              {filteredAndSortedCustomers.length} customers found
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Select
                value={searchField}
                onValueChange={(value: "all" | "name" | "email" | "telephone") => setSearchField(value)}
              >
                <SelectTrigger className="w-full sm:w-[150px] border-gray-300">
                  <SelectValue placeholder="Search by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  <SelectItem value="name">Customer Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="telephone">Telephone</SelectItem>
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
                  State
                  {selectedStates.length < states.length && (
                    <Badge className="ml-1 bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/80">
                      {selectedStates.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by State</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {states.map((state) => (
                  <DropdownMenuCheckboxItem
                    key={state}
                    checked={selectedStates.includes(state)}
                    onCheckedChange={() => toggleState(state)}
                  >
                    {state}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter Removed */}

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
                    Customer Name
                    {sortField === "name" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">E-Mail</TableHead>
                <TableHead className="font-semibold text-gray-700">Telephone</TableHead>
                {/* <TableHead className="font-semibold text-gray-700">City</TableHead> */}
                <TableHead className="font-semibold text-gray-700">State</TableHead>
                {/* <TableHead className="font-semibold text-gray-700">Status</TableHead> */}
                <TableHead className="font-semibold text-gray-700">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 p-0 font-semibold text-gray-700 hover:bg-transparent hover:text-gray-900"
                    onClick={() => handleSort("dateAdded")}
                  >
                    Date Added
                    {sortField === "dateAdded" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{customer.name}</TableCell>
                    <TableCell className="text-gray-700">{customer.email}</TableCell>
                    <TableCell className="text-gray-700">{customer.telephone}</TableCell>
                    {/* <TableCell className="text-gray-700">{customer.city}</TableCell> */}
                    <TableCell className="text-gray-700">{customer.state}</TableCell>
                    {/* <TableCell>
                      <Badge
                        className={
                          customer.status === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : customer.status === "Inactive"
                              ? "bg-red-100 text-red-800 hover:bg-red-200"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </TableCell> */}
                    <TableCell className="text-gray-700">{customer.dateAdded}</TableCell>
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <CustomerDialog mode="edit" customer={customer}>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </CustomerDialog>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
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
                  <TableCell colSpan={8} className="h-24 text-center">
                    No customers found.
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
