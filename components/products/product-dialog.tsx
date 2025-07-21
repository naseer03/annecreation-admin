"use client";

import type React from "react";

import { useState,useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductDetailsForm } from "./product-details-form";
import { useGetProductByIdQuery } from "@/lib/redux/api/productApi";
import { ProductSeoForm } from "./product-seo-form";
import {
  useCreateProductMutation,
  useUploadProductImagesMutation,
} from "@/lib/redux/api/productApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProductDialogProps {
  children: React.ReactNode;
  mode?: "create" | "edit";
  product?: any;
}

export interface ProductFormData {
  name: string;
  model: string;
  sku: string;
  price: number;
  quantity: number;
  description: string;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  meta_title?: string;
  meta_description?: string;
  meta_keyword?: string;
  images: File[];
  categories: number[];
  designSpec?: string;
  stitches?: number;
  colorNeedles?: string;
  machineFormatFiles?: Record<string, File | null>;
  selectedMachineFormats?: string[];
  machineFormatPrices?: Record<string, string>;
  status: boolean;
  // ...other fields as needed
}
  

export function ProductDialog({
  children,
  mode = "create",
  product,
}: ProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    model: "",
    sku: "",
    price: 0,
    quantity: 0,
    status: true,
    categories: [],
    description: "",
    images: [],
  });

  // Fetch product details if in edit mode and product id is provided
  const { data: fetchedProduct, isLoading: isProductLoading } =
    useGetProductByIdQuery(
      mode === "edit" && product?.product_id ? product.product_id.toString() : "",
      { skip: mode !== "edit" || !product?.product_id }
    );

  // Pre-fill form when fetchedProduct changes
  useEffect(() => {
    if (mode === "edit" && fetchedProduct) {
      setFormData({
        name: fetchedProduct.descriptions?.[0]?.name || "",
        model: fetchedProduct.model || "",
        sku: fetchedProduct.sku || "",
        price: fetchedProduct.price || 0,
        quantity: fetchedProduct.quantity || 0,
        status: fetchedProduct.status ?? true,
        categories: fetchedProduct.categories || [],
        description: fetchedProduct.descriptions?.[0]?.description || "",
        images: [], // Images should be handled separately (e.g., preview URLs)
        weight: typeof fetchedProduct.weight === "number" ? fetchedProduct.weight : undefined,
        dimensions: fetchedProduct.dimensions || {
          length: 0,
          width: 0,
          height: 0,
        },
      });
    }
  }, [mode, fetchedProduct]);

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [uploadImages, { isLoading: isUploading }] =
    useUploadProductImagesMutation();

  const isLoading = isCreating || isUploading;

  const handleFormChange = (field: keyof ProductFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleImagesChange = (images: File[]) => {
    setFormData({
      ...formData,
      images: [...formData.images, ...images],
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();


    try {
      // Build productData object with all non-file fields
      const productData: any = {
        model: formData.model || `MODEL-${Date.now()}`,
        sku: formData.sku || `SKU-${Date.now()}`,
        price: formData.price,
        quantity: formData.quantity,
        status: formData.status,
        categories: formData.categories,
        weight: formData.weight,
        dimensions: formData.dimensions,
        descriptions: [
          {
            language_id: 1, // Assuming default language ID is 1
            name: formData.name,
            description: formData.description,
            meta_title: formData.meta_title,
            meta_description: formData.meta_description,
            meta_keyword: formData.meta_keyword,
          },
        ],
        designSpec: formData.designSpec,
        stitches: formData.stitches,
        colorNeedles: formData.colorNeedles,
        machineFormatPrices: formData.machineFormatPrices
      };

      // Create FormData and append productData as JSON
      const form = new FormData();
      form.append("productData", JSON.stringify(productData));

      // Images
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file, idx) => {
          form.append(`image_${idx}`, file);
        });
      }

      // Machine format files
      if (formData.machineFormatFiles) {
        Object.entries(formData.machineFormatFiles).forEach(([format, file]) => {
          if (file) {
            form.append(`machineFormatFile_${format}`, file);
          }
        });
      }

      // Send FormData to API
      const result = await createProduct(form).unwrap();
      toast.success("Product created successfully!");

      // Close the dialog and reset form
      setOpen(false);
      setFormData({
        name: "",
        model: "",
        sku: "",
        price: 0,
        quantity: 0,
        status: true,
        categories: [],
        description: "",
        images: [],
        machineFormatFiles: {},
      });
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {mode === "create" ? "Add New Product" : isProductLoading ? "Loading..." : "Edit Product"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new product for your store."
              : isProductLoading
              ? "Fetching product details..."
              : "Update the details of this product."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="seo">SEO Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <ProductDetailsForm
                product={product}
                formData={formData}
                onChange={handleFormChange}
                onImagesChange={handleImagesChange}
                onRemoveImage={handleRemoveImage}
              />
            </TabsContent>
            <TabsContent value="seo" className="mt-6">
              <ProductSeoForm
                product={product}
                formData={formData}
                onChange={handleFormChange}
              />
            </TabsContent>
          </Tabs>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300 text-gray-700"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "create" ? "Creating..." : "Saving..."}
                </>
              ) : mode === "create" ? (
                "Create Product"
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
