"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { ImagePlus, X, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetCategoriesQuery } from "@/lib/redux/api/categoryApi";
import { ProductFormData } from "./product-dialog";
import { ProductImageUpload } from "./product-image-upload";

// Define the category structure based on the API response
interface ApiCategory {
  category_id: number;
  name: string;
  parent_id: number;
  image: string;
  sort_order: number;
  status: boolean;
  path: number[];
}

// Define the API response structure
interface ApiResponse {
  categories: ApiCategory[];
  total: number;
}

// Add this new interface for the hierarchical category structure
interface CategoryNode extends ApiCategory {
  children?: CategoryNode[];
  level: number;
}

interface ProductDetailsFormProps {
  product?: any;
  formData: ProductFormData;
  onChange: (field: keyof ProductFormData, value: any) => void;
  onImagesChange: (images: File[]) => void;
  onRemoveImage: (index: number) => void;
  validationErrors?: {
    name: boolean;
    stitches: boolean;
    dimensions: boolean;
    designSpec: boolean;
  };
}

// Machine formats
const machineFormats = [
  "Usha-JEF-450-11x8",
  "Usha-JEF-550-14x8",
  "Brother-DST-v3se-12x8",
  "Brother-Pes-bp3600-14x9.5",
  "Bernina-dst-14x8",
  "DST for both multi + v3",
  "Full Dst Single Head",
];

export function ProductDetailsForm({
  product,
  formData,
  onChange,
  onImagesChange,
  onRemoveImage,
  validationErrors,
}: ProductDetailsFormProps) {
  // Use type assertion to tell TypeScript that the data is the ApiResponse structure
  const { data: apiResponse, isLoading: categoriesLoading } =
    useGetCategoriesQuery({});

  // Extract the categories array from the response
  const categoriesData = apiResponse as ApiResponse | undefined;
  const categories = categoriesData?.categories || [];

  console.log("API Response:", apiResponse);
  console.log("Categories array:", categories);

  // State to hold preview image URLs for uploaded images
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Debug the categories data
  useEffect(() => {
    console.log("Categories length:", categories?.length);
    console.log("First category:", categories?.[0]);
  }, [categories]);

  // Handle image selection
  const handleImageSelect = (files: File[]) => {
    // Generate preview URLs for the images
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewUrls]);

    // Pass the files to parent component
    onImagesChange(files);
  };

  // Handle removing an image
  const handleRemoveImage = (index: number) => {
    // Remove the preview URL
    const newPreviewUrls = [...previewImages];
    if (newPreviewUrls[index]) {
      URL.revokeObjectURL(newPreviewUrls[index]); // Clean up object URL
    }
    newPreviewUrls.splice(index, 1);
    setPreviewImages(newPreviewUrls);

    // Tell parent to remove the image
    onRemoveImage(index);
  };

  // Toggle category selection
  const toggleCategory = (categoryId: number) => {
    const isSelected = formData.categories.includes(categoryId);
    let newCategories: number[];

    if (isSelected) {
      newCategories = formData.categories.filter((id) => id !== categoryId);
    } else {
      newCategories = [...formData.categories, categoryId];
    }

    onChange("categories", newCategories);
  };

  const [primaryImage, setPrimaryImage] = useState<string>(
    product?.primaryImage || ""
  );
  const [selectedImages, setSelectedImages] = useState<string[]>(
    product?.images || []
  );
  const [globalPrice, setGlobalPrice] = useState<string>(
    product?.price?.toString() || ""
  );
  const [applyGlobalPrice, setApplyGlobalPrice] = useState(false);
  const [machineFormatPrices, setMachineFormatPrices] = useState<
    Record<string, string>
  >(
    product?.machineFormatPrices ||
      machineFormats.reduce((acc, format) => ({ ...acc, [format]: "" }), {})
  );
  const [selectedMachineFormats, setSelectedMachineFormats] = useState<
    string[]
  >(product?.selectedMachineFormats || []);

  // Build category hierarchy
  const categoryHierarchy = useMemo(() => {
    if (!categories) return [];

    const categoryMap = new Map<number, CategoryNode>();
    const rootCategories: CategoryNode[] = [];

    // First pass: Create all category nodes
    categories.forEach((category) => {
      categoryMap.set(category.category_id, {
        ...category,
        level: 0,
        children: [],
      });
    });

    // Second pass: Build hierarchy
    categories.forEach((category) => {
      const node = categoryMap.get(category.category_id)!;
      if (category.parent_id === 0) {
        node.level = 0;
        rootCategories.push(node);
      } else {
        const parent = categoryMap.get(category.parent_id);
        if (parent) {
          node.level = parent.level + 1;
          parent.children = parent.children || [];
          parent.children.push(node);
        }
      }
    });

    return rootCategories;
  }, [categories]);

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  // Recursive function to render category tree
  const renderCategoryTree = (categories: CategoryNode[], level = 0) => {
    return categories.map((category) => (
      <div
        key={category.category_id}
        className="break-inside-avoid"
        style={{ marginLeft: `${level * 1.5}rem` }}
      >
        <div className="flex items-center space-x-2 py-1">
          <Checkbox
            id={`category-${category.category_id}`}
            checked={formData.categories.includes(category.category_id)}
            onCheckedChange={() => toggleCategory(category.category_id)}
          />
          <Label
            htmlFor={`category-${category.category_id}`}
            className="cursor-pointer text-sm text-gray-700 flex items-center gap-2"
          >
            {category.name}
            {!category.status && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                Hidden
              </span>
            )}
          </Label>
        </div>
        {category.children && category.children.length > 0 && (
          <div className="border-l border-gray-200 ml-2 pl-2">
            {renderCategoryTree(category.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const handlePrimaryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would handle file uploads to a server
      // For this demo, we'll just add a placeholder image
      setPrimaryImage(
        `/placeholder.svg?height=300&width=300&query=primary-product-image-${Date.now()}`
      );
    }
  };

  const handleAdditionalImagesUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // In a real app, you would handle file uploads to a server
    // For this demo, we'll just add placeholder images
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(
        (_, index) =>
          `/placeholder.svg?height=100&width=100&query=product-image-${Date.now()}-${index}`
      );
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  const removePrimaryImage = () => {
    setPrimaryImage("");
  };

  const handleGlobalPriceChange = (value: string) => {
    setGlobalPrice(value);
    if (applyGlobalPrice) {
      const updatedPrices = { ...machineFormatPrices };
      selectedMachineFormats.forEach((format) => {
        updatedPrices[format] = value;
      });
      setMachineFormatPrices(updatedPrices);
    }
  };

  const toggleApplyGlobalPrice = () => {
    const newState = !applyGlobalPrice;
    setApplyGlobalPrice(newState);

    if (newState) {
      // When checking "Add Price to all Products":
      // 1. Select all machine formats
      setSelectedMachineFormats([...machineFormats]);

      // 2. Apply the global price to all machine formats
      const updatedPrices = { ...machineFormatPrices };
      machineFormats.forEach((format) => {
        updatedPrices[format] = globalPrice;
      });
      setMachineFormatPrices(updatedPrices);
    }
    // When unchecking, we don't change the selections to allow users to keep their choices
  };

  const toggleMachineFormat = (format: string) => {
    if (selectedMachineFormats.includes(format)) {
      setSelectedMachineFormats(
        selectedMachineFormats.filter((f) => f !== format)
      );
    } else {
      setSelectedMachineFormats([...selectedMachineFormats, format]);
    }
  };

  const handleMachineFormatPriceChange = (format: string, value: string) => {
    setMachineFormatPrices({
      ...machineFormatPrices,
      [format]: value,
    });
  };

  // Check if categories exist and have length
  const hasCategories = Array.isArray(categories) && categories.length > 0;

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-gray-700">
              Product Name
            </Label>
            <Input
              id="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
              className={`border-gray-300 ${
                validationErrors?.name ? "border-red-500" : ""
              }`}
            />
            {validationErrors?.name && (
              <p className="text-xs text-red-500">
                Please enter a product name
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="model" className="text-gray-700">
              Model
            </Label>
            <Input
              id="model"
              placeholder="Enter model code"
              value={formData.model}
              onChange={(e) => onChange("model", e.target.value)}
              className="border-gray-300"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sku" className="text-gray-700">
              SKU
            </Label>
            <Input
              id="sku"
              placeholder="Enter SKU"
              value={formData.sku}
              onChange={(e) => onChange("sku", e.target.value)}
              className="border-gray-300"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price" className="text-gray-700">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price"
              value={formData.price.toString()}
              onChange={(e) =>
                onChange("price", parseFloat(e.target.value) || 0)
              }
              className="border-gray-300"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-gray-700">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter stock quantity"
              value={formData.quantity.toString()}
              onChange={(e) =>
                onChange("quantity", parseInt(e.target.value) || 0)
              }
              className="border-gray-300"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) => onChange("description", e.target.value)}
              className="min-h-[120px] resize-y border-gray-300"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="weight" className="text-gray-700">
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              step="0.01"
              placeholder="Enter weight in kg"
              value={formData.weight?.toString() || ""}
              onChange={(e) =>
                onChange("weight", parseFloat(e.target.value) || undefined)
              }
              className="border-gray-300"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-gray-700">Dimensions (cm)</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="Length"
                type="number"
                step="0.1"
                value={formData.dimensions?.length?.toString() || ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  onChange("dimensions", {
                    ...(formData.dimensions || { width: 0, height: 0 }),
                    length: value,
                  });
                }}
                className="border-gray-300"
              />
              <Input
                placeholder="Width"
                type="number"
                step="0.1"
                value={formData.dimensions?.width?.toString() || ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  onChange("dimensions", {
                    ...(formData.dimensions || { length: 0, height: 0 }),
                    width: value,
                  });
                }}
                className="border-gray-300"
              />
              <Input
                placeholder="Height"
                type="number"
                step="0.1"
                value={formData.dimensions?.height?.toString() || ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  onChange("dimensions", {
                    ...(formData.dimensions || { length: 0, width: 0 }),
                    height: value,
                  });
                }}
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="status"
              checked={formData.status}
              onCheckedChange={(checked) => onChange("status", !!checked)}
            />
            <Label htmlFor="status" className="text-gray-700">
              Product is active
            </Label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ProductImageUpload
          onImageSelect={handleImageSelect}
          selectedImages={formData.images}
          previewImages={previewImages}
          onRemoveImage={handleRemoveImage}
          label="Product Images"
          description="Upload product images (JPEG, PNG, GIF, WebP - max 5MB each)"
        />
      </div>

      <div className="mt-6">
        <Label className="text-gray-700">Categories</Label>
        <div className="mt-2 max-h-[200px] overflow-y-auto rounded-md border border-gray-300 p-3">
          <div className="mb-2">
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-gray-300"
            />
          </div>

          {categoriesLoading ? (
            <div className="flex items-center justify-center py-4 text-gray-500">
              Loading categories...
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {categories
                .filter((cat) =>
                  cat.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((category) => (
                  <div
                    key={category.category_id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${category.category_id}`}
                      checked={formData.categories.includes(
                        category.category_id
                      )}
                      onCheckedChange={() =>
                        toggleCategory(category.category_id)
                      }
                    />
                    <Label
                      htmlFor={`category-${category.category_id}`}
                      className="cursor-pointer text-sm text-gray-700"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-4 text-gray-500">
              No categories available
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">
          Product Specifications
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="design-spec" className="text-gray-700">
              Design Specification <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="design-spec"
              placeholder="Enter design specifications"
              className={`min-h-[120px] resize-y border-gray-300 ${
                validationErrors?.designSpec === false ? "border-red-500" : ""
              }`}
              defaultValue={product?.designSpec || ""}
            />
            {validationErrors?.designSpec === false && (
              <p className="text-sm text-red-500">
                Design specification is required
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stitches" className="text-gray-700">
              Stitches <span className="text-red-500">*</span>
            </Label>
            <Input
              id="stitches"
              type="number"
              placeholder="Number of stitches"
              defaultValue={product?.stitches || ""}
              className={`border-gray-300 ${
                validationErrors?.stitches === false ? "border-red-500" : ""
              }`}
            />
            {validationErrors?.stitches === false && (
              <p className="text-sm text-red-500">
                Stitches must be a valid number greater than 0
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="dimensions" className="text-gray-700">
            Dimensions (Area / Height / Width){" "}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="dimensions"
            placeholder="e.g., 100 sq cm / 10 cm / 10 cm"
            defaultValue={
              product?.area || product?.height || product?.width
                ? `${product?.area || ""} / ${product?.height || ""} / ${
                    product?.width || ""
                  }`
                : ""
            }
            className={`border-gray-300 ${
              validationErrors?.dimensions === false ? "border-red-500" : ""
            }`}
          />
          {validationErrors?.dimensions === false && (
            <p className="text-sm text-red-500">
              Dimensions must be in format: area/height/width
            </p>
          )}
          <p className="text-xs text-gray-500">
            Enter dimensions in format: Area / Height / Width
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="color-needles" className="text-gray-700">
            Colour / Needles
          </Label>
          <Input
            id="color-needles"
            placeholder="Colour / Needles information"
            defaultValue={product?.colorNeedles || ""}
            className="border-gray-300"
          />
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">
          Pricing & Machine Formats
        </h3>

        <div className="flex items-center gap-4 rounded-md border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="apply-global-price"
              checked={applyGlobalPrice}
              onCheckedChange={toggleApplyGlobalPrice}
            />
            <Label htmlFor="apply-global-price" className="text-gray-700">
              Add Price to all Products
            </Label>
          </div>
          <div className="w-32">
            <Input
              type="number"
              min="0"
              placeholder="Price"
              value={globalPrice}
              onChange={(e) => handleGlobalPriceChange(e.target.value)}
              className="border-gray-300"
            />
          </div>
        </div>

        <div
          className={`space-y-4 rounded-md border ${
            applyGlobalPrice
              ? "border-[#ffb729]/30 bg-[#fff8e6]"
              : "border-gray-200"
          } p-4`}
        >
          {machineFormats.map((format) => (
            <div key={format} className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`format-${format}`}
                  checked={selectedMachineFormats.includes(format)}
                  onCheckedChange={() => toggleMachineFormat(format)}
                />
                <Label
                  htmlFor={`format-${format}`}
                  className={`text-gray-700 ${
                    applyGlobalPrice ? "font-medium" : ""
                  }`}
                >
                  {format}
                </Label>
              </div>

              <div>
                <Label htmlFor={`price-${format}`} className="sr-only">
                  Price for {format}
                </Label>
                <Input
                  id={`price-${format}`}
                  type="number"
                  min="0"
                  placeholder="Price"
                  value={machineFormatPrices[format]}
                  onChange={(e) =>
                    handleMachineFormatPriceChange(format, e.target.value)
                  }
                  className="border-gray-300"
                  disabled={!selectedMachineFormats.includes(format)}
                />
              </div>

              <div>
                <Label htmlFor={`upload-${format}`} className="sr-only">
                  Upload for {format}
                </Label>
                <Input
                  id={`upload-${format}`}
                  type="file"
                  className="border-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-[#ffb729] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#311807] hover:file:bg-[#ffb729]/90"
                  disabled={!selectedMachineFormats.includes(format)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
