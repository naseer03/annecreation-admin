"use client";

import type React from "react";

import { useState } from "react";
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
  status: boolean;
  categories: number[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  description: string;
  meta_title?: string;
  meta_description?: string;
  meta_keyword?: string;
  images: File[];
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  robotsMeta?: string;
  customH1?: string;
  structuredData?: string;
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
      // Format the product data for the API
      const productData = {
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
      };

      // Step 1: Create the product
      const result = await createProduct(productData).unwrap();
      toast.success("Product created successfully!");

      // Step 2: Upload images if any
      if (formData.images.length > 0 && result.product_id) {
        try {
          console.log(
            `Starting image uploads for product ID ${result.product_id}`,
            {
              totalImages: formData.images.length,
              productId: result.product_id,
            }
          );

          // Upload each image individually with a sort order
          for (let i = 0; i < formData.images.length; i++) {
            const uploadFormData = new FormData();

            // Log the image being uploaded
            console.log(`Preparing image ${i + 1}:`, {
              name: formData.images[i].name,
              type: formData.images[i].type,
              size: `${(formData.images[i].size / 1024).toFixed(2)} KB`,
            });

            // CRITICAL: The field name must be exactly 'image' as expected by the API
            uploadFormData.append("image", formData.images[i]);
            uploadFormData.append("sort_order", i.toString());

            // Debug what's in the FormData (this is only for debugging)
            for (const pair of uploadFormData.entries()) {
              console.log(
                `FormData contains: ${pair[0]}: ${
                  pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]
                }`
              );
            }

            console.log(
              `Sending upload request ${i + 1}/${formData.images.length}`
            );

            try {
              const uploadResult = await uploadImages({
                id: result.product_id.toString(),
                formData: uploadFormData,
              }).unwrap();

              console.log(`Image upload ${i + 1} success:`, uploadResult);
            } catch (singleImageError: any) {
              console.error(`Error uploading image ${i + 1}:`, {
                error: singleImageError,
                message: singleImageError?.data?.message || "Unknown error",
                status: singleImageError?.status,
              });
            }
          }

          toast.success("Product images uploaded successfully!");
        } catch (imageError: any) {
          console.error("Failed to upload images:", {
            error: imageError,
            message: imageError?.data?.message || "Unknown error",
            status: imageError?.status,
          });
          toast.error(
            "Product created but image upload failed. You can add images later."
          );
        }
      }

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
            {mode === "create" ? "Add New Product" : "Edit Product"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new product for your store."
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
