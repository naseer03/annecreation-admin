"use client";

import { useState, useMemo } from "react";
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
  Edit,
  Trash,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProductDialog } from "./product-dialog";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "@/lib/redux/api/productApi";
import { ProductImage } from "@/components/ui/product-image";
import { useToast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function ProductsList() {
  // State for sorting
  const [sortField, setSortField] = useState<"name" | "price" | "category">(
    "name"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // State for filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<boolean[]>([
    true,
    false,
  ]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch products
  const { data: productData, isLoading } = useGetProductsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery || undefined,
    sortBy: sortField,
    sortOrder: sortDirection,
  });

  // Toast notifications
  const { toast } = useToast();

  // Delete product mutation
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // Toggle sort direction or change sort field
  const handleSort = (field: "name" | "price" | "category") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Toggle status selection
  const toggleStatus = (status: boolean) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((s) => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedStatus([true, false]);
    setSortField("name");
    setSortDirection("asc");
  };

  // Function to handle product deletion
  const handleDeleteProduct = async (productId: number) => {
    try {
      const result = await deleteProduct(productId.toString()).unwrap();
      toast({
        title: "Product deleted",
        description: result.message || "Product was deleted successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border border-gray-200 bg-white shadow-md">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">
              All Products
            </CardTitle>
            <CardDescription className="text-gray-500">
              {productData?.pagination.total || 0} products found
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search products..."
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
                  Status
                  {selectedStatus.length < 2 && (
                    <Badge className="ml-1 bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/80">
                      {selectedStatus.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={selectedStatus.includes(true)}
                  onCheckedChange={() => toggleStatus(true)}
                >
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatus.includes(false)}
                  onCheckedChange={() => toggleStatus(false)}
                >
                  Inactive
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="border-gray-300"
              onClick={clearFilters}
            >
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
                <TableHead className="w-[80px] font-semibold text-gray-700">
                  Image
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 p-0 font-semibold text-gray-700 hover:bg-transparent hover:text-gray-900"
                    onClick={() => handleSort("name")}
                  >
                    Product Name
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
                    onClick={() => handleSort("category")}
                  >
                    Category
                    {sortField === "category" &&
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
                    onClick={() => handleSort("price")}
                  >
                    Price
                    {sortField === "price" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                {/* <TableHead className="font-semibold text-gray-700">
                  Quantity
                </TableHead> */}
                <TableHead className="font-semibold text-gray-700">
                  Status
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Loading products...
                  </TableCell>
                </TableRow>
              ) : productData?.products.length ? (
                productData.products.map((product) => (
                  <TableRow
                    key={product.product_id}
                    className="hover:bg-gray-50"
                  >
                    <TableCell>
                      <div className="h-10 w-10 overflow-hidden rounded-md border border-gray-200">
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {product.model}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </TableCell>
                    {/* <TableCell>{product.quantity}</TableCell> */}
                    <TableCell>
                      <Badge
                        className={
                          product.status
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }
                      >
                        {product.status ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <ProductDialog mode="edit" product={product}>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </ProductDialog>
                          <ConfirmDialog
                            title="Delete Product"
                            description={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
                            confirmText="Delete"
                            cancelText="Cancel"
                            variant="destructive"
                            isLoading={isDeleting}
                            onConfirm={() =>
                              handleDeleteProduct(product.product_id)
                            }
                            trigger={
                              <DropdownMenuItem
                                className="text-red-600"
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            }
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No products found.
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
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gray-300"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <span className="mx-2 text-sm">
              Page {currentPage} of {productData?.pagination.pages || 1}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gray-300"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === (productData?.pagination.pages || 1)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gray-300"
              onClick={() => setCurrentPage(productData?.pagination.pages || 1)}
              disabled={currentPage === (productData?.pagination.pages || 1)}
            >
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
