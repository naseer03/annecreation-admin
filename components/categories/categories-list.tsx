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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CategoryDialog } from "./category-dialog"

// Define the category data structure
interface Category {
  id: number
  name: string
  count: number
  sortPosition: number
}

// Parse the provided categories and add counts where available
const categoriesData: Category[] = [
  { id: 1, name: "Butterfly", count: 42, sortPosition: 1 },
  { id: 2, name: "Leafs", count: 38, sortPosition: 2 },
  { id: 3, name: "Boat Necks", count: 56, sortPosition: 3 },
  { id: 4, name: "Bridal", count: 29, sortPosition: 4 },
  { id: 5, name: "Cross Stitch", count: 45, sortPosition: 5 },
  { id: 6, name: "Peacock, Parrot", count: 33, sortPosition: 6 },
  { id: 7, name: "Pot Necks", count: 41, sortPosition: 7 },
  { id: 8, name: "Chain Stitch", count: 52, sortPosition: 8 },
  { id: 9, name: "Elephant", count: 27, sortPosition: 9 },
  { id: 10, name: "Kids Necks", count: 38, sortPosition: 10 },
  { id: 11, name: "Cutwork", count: 63, sortPosition: 11 },
  { id: 12, name: "Creative Designs & Gods", count: 47, sortPosition: 12 },
  { id: 13, name: "Blouse Necks", count: 72, sortPosition: 13 },
  { id: 14, name: "Belts", count: 31, sortPosition: 14 },
  { id: 15, name: "Jewels Instruments", count: 25, sortPosition: 15 },
  { id: 16, name: "V Neck Designs", count: 58, sortPosition: 16 },
  { id: 17, name: "Mango Designs", count: 36, sortPosition: 17 },
  { id: 18, name: "Bunches & Buties Collar", count: 44, sortPosition: 18 },
  { id: 19, name: "Coat Necks", count: 39, sortPosition: 19 },
  { id: 20, name: "Net Designs", count: 28, sortPosition: 20 },
  { id: 21, name: "Rangoli", count: 32, sortPosition: 21 },
  { id: 22, name: "Double Shoulder Neck Designs", count: 47, sortPosition: 22 },
  { id: 23, name: "Mirror Designs", count: 53, sortPosition: 23 },
  { id: 24, name: "Figures", count: 41, sortPosition: 24 },
  { id: 25, name: "Back Drop Designs", count: 37, sortPosition: 25 },
  { id: 26, name: "Lotus & Roses", count: 45, sortPosition: 26 },
  { id: 27, name: "Animals", count: 136, sortPosition: 27 },
  { id: 28, name: "Hand Lines", count: 29, sortPosition: 28 },
  { id: 29, name: "3D Emboses", count: 42, sortPosition: 29 },
  { id: 30, name: "Birds", count: 87, sortPosition: 30 },
  { id: 31, name: "Pineapple, Circle Hands", count: 34, sortPosition: 31 },
  { id: 32, name: "Allover Blouses", count: 51, sortPosition: 32 },
]

// Get unique sort position ranges for filtering
const sortPositionRanges = ["1-10", "11-20", "21-30", "31-40"]

export function CategoriesList() {
  // State for sorting
  const [sortField, setSortField] = useState<"name" | "count">("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // State for filtering
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRanges, setSelectedRanges] = useState<string[]>(sortPositionRanges)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Toggle sort direction or change sort field
  const handleSort = (field: "name" | "count") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort categories
  const filteredAndSortedCategories = useMemo(() => {
    return categoriesData
      .filter((category) => {
        // Filter by search query
        const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase())

        // Filter by selected sort position ranges
        const matchesRange = selectedRanges.some((range) => {
          const [min, max] = range.split("-").map(Number)
          return category.sortPosition >= min && category.sortPosition <= max
        })

        return matchesSearch && matchesRange
      })
      .sort((a, b) => {
        // Sort by selected field and direction
        if (sortField === "name") {
          return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        } else if (sortField === "sortPosition") {
          return sortDirection === "asc" ? a.sortPosition - b.sortPosition : b.sortPosition - a.sortPosition
        } else {
          return sortDirection === "asc" ? a.count - b.count : b.count - a.count
        }
      })
  }, [categoriesData, sortField, sortDirection, searchQuery, selectedRanges])

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedCategories.length / itemsPerPage)
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedCategories.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedCategories, currentPage, itemsPerPage])

  // Handle page change
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  // Toggle sort position range selection
  const toggleSortPositionRange = (range: string) => {
    if (selectedRanges.includes(range)) {
      setSelectedRanges(selectedRanges.filter((r) => r !== range))
    } else {
      setSelectedRanges([...selectedRanges, range])
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedRanges(sortPositionRanges)
  }

  return (
    <Card className="border border-gray-200 bg-white shadow-md">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Categories</CardTitle>
            <CardDescription className="text-gray-500">
              {filteredAndSortedCategories.length} categories found
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 border-gray-300"
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
                  Filter
                  {selectedRanges.length < sortPositionRanges.length && (
                    <Badge className="ml-1 bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/80">
                      {selectedRanges.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Sort Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sortPositionRanges.map((range) => (
                  <DropdownMenuCheckboxItem
                    key={range}
                    checked={selectedRanges.includes(range)}
                    onCheckedChange={() => toggleSortPositionRange(range)}
                  >
                    {range}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button variant="outline" size="sm" className="w-full border-gray-300" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
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
                    Name
                    {sortField === "name" &&
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
                    onClick={() => handleSort("sortPosition")}
                  >
                    Sort Position
                    {sortField === "sortPosition" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">Products</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map((category) => (
                  <TableRow key={category.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{category.name}</TableCell>
                    <TableCell>{category.sortPosition}</TableCell>
                    <TableCell>{category.count}</TableCell>
                    <TableCell className="text-right">
                      <CategoryDialog mode="edit" category={category}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        >
                          Edit
                        </Button>
                      </CategoryDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No categories found.
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
