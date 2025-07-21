"use client"
//need to check what is stores,need to check parent_category is fine or parent_id is fine

import type React from "react"
import type { Category } from "@/lib/redux/api/categoryApi"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CategoryDetailsForm } from "./category-details-form"
import { CategorySeoForm } from "./category-seo-form"
import { useCreateCategoryMutation, useUpdateCategoryMutation, useGetCategoryByIdQuery } from "@/lib/redux/api/categoryApi"
import { toast } from "sonner"
import { skipToken } from "@reduxjs/toolkit/query/react"

interface CategoryDialogProps {
  children: React.ReactNode
  mode?: "create" | "edit"
  category?: any
}

export interface CategoryFormData {
  name: string
  slug: string
  parent: string
  shortDescription: string
  fullDescription: string
  status: string
  sortOrder: string
  featured: boolean
  displayType: string
  categoryImages: File[]
  categoryPreviews: string[]
  categoryImageNames: string[]
  bannerImages: File[]
  bannerPreviews: string[]
  bannerImageNames: string[]
  thumbnailImages: File[]
  thumbnailPreviews: string[]
  thumbnailImageNames: string[]
}

// Define a type for the API response from getCategoryById
interface CategoryByIdApiResponse {
  category: {
    category_id: number;
    name: string;
    description?: string;
    meta_title?: string;
    meta_description?: string;
    image?: string;
    parent_id?: number;
    sort_order?: number;
    path?: number[];
    // Add any other fields you expect from the API
  };
  parent_category?: any;
  children?: any[];
  breadcrumbs?: any[];
  products?: any[];
  pagination?: any;
  filters?: any;
}

export function CategoryDialog({ children, mode = "create", category }: CategoryDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<CategoryFormData>({
    name: category?.name || "",
    slug: category?.slug || "",
    parent: category?.parent || "",
    shortDescription: category?.shortDescription || "",
    fullDescription: category?.fullDescription || "",
    status: category?.status || "Visible",
    sortOrder: category?.sortOrder?.toString() || "0",
    featured: category?.featured || false,
    displayType: category?.displayType || "both",
    categoryImages: [],
    categoryPreviews: [],
    categoryImageNames: [],
    bannerImages: [],
    bannerPreviews: [],
    bannerImageNames: [],
    thumbnailImages: [],
    thumbnailPreviews: [],
    thumbnailImageNames: [],
  })

  const [createCategory, { isLoading }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()

  // Store selected categoryId for edit mode
  const categoryId = mode === "edit" ? category?.id : null;
  // Fetch category data by ID when editing and dialog is open
  const queryResult = useGetCategoryByIdQuery(
    open && mode === "edit" && categoryId ? { id: categoryId } : skipToken
  );
  const categoryApiResponse = queryResult.data as CategoryByIdApiResponse | undefined;
  const categoryData = categoryApiResponse?.category;

  // Initialize formData from API when editing
  useEffect(() => {
    if (mode === "edit" && categoryData) {
      setFormData({
        name: categoryData.name || "",
        slug: "",
        parent: categoryData.parent_id?.toString() || "",
        shortDescription: categoryData.meta_description || "",
        fullDescription: categoryData.description || "",
        status: "Visible", // Assuming status is always visible, update if needed
        sortOrder: categoryData.sort_order?.toString() || "0",
        featured: false, // Not present in response, set default or map if available
        displayType: "both", // Not present in response, set default or map if available
        categoryImages: [],
        categoryPreviews: [],
        categoryImageNames: categoryData.image ? [categoryData.image] : [],
        bannerImages: [],
        bannerPreviews: [],
        bannerImageNames: [],
        thumbnailImages: [],
        thumbnailPreviews: [],
        thumbnailImageNames: [],
      })
    }
  }, [open, mode, categoryData])

  const handleFormChange = (id: keyof CategoryFormData, value: any) => {
    console.log(`Updating formData: ${id} = ${value}`);
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Image handlers to pass to CategoryDetailsForm
  const handleCategoryImageSelect = (files: File[]) => {
    setFormData((prev: CategoryFormData) => ({
      ...prev,
      categoryImages: [...prev.categoryImages, ...files],
      categoryPreviews: [
        ...prev.categoryPreviews,
        ...files.map((file) => URL.createObjectURL(file)),
      ],
      categoryImageNames: [...prev.categoryImageNames, ...files.map((file) => file.name)],
    }));
  };
  const handleRemoveCategoryImage = (index: number) => {
    setFormData((prev: CategoryFormData) => ({
      ...prev,
      categoryImages: prev.categoryImages.filter((_, i) => i !== index),
      categoryPreviews: prev.categoryPreviews.filter((_, i) => i !== index),
      categoryImageNames: prev.categoryImageNames.filter((_, i) => i !== index),
    }));
  };

  // Banner image handlers
  const handleBannerImageSelect = (files: File[]) => {
    setFormData((prev: CategoryFormData) => ({
      ...prev,
      bannerImages: [...prev.bannerImages, ...files],
      bannerPreviews: [
        ...prev.bannerPreviews,
        ...files.map((file) => URL.createObjectURL(file)),
      ],
      bannerImageNames: [...prev.bannerImageNames, ...files.map((file) => file.name)],
    }));
  };
  const handleRemoveBannerImage = (index: number) => {
    setFormData((prev: CategoryFormData) => ({
      ...prev,
      bannerImages: prev.bannerImages.filter((_, i) => i !== index),
      bannerPreviews: prev.bannerPreviews.filter((_, i) => i !== index),
      bannerImageNames: prev.bannerImageNames.filter((_, i) => i !== index),
    }));
  };

  // Thumbnail image handlers
  const handleThumbnailImageSelect = (files: File[]) => {
    setFormData((prev: CategoryFormData) => ({
      ...prev,
      thumbnailImages: [...prev.thumbnailImages, ...files],
      thumbnailPreviews: [
        ...prev.thumbnailPreviews,
        ...files.map((file) => URL.createObjectURL(file)),
      ],
      thumbnailImageNames: [...prev.thumbnailImageNames, ...files.map((file) => file.name)],
    }));
  };
  const handleRemoveThumbnailImage = (index: number) => {
    setFormData((prev: CategoryFormData) => ({
      ...prev,
      thumbnailImages: prev.thumbnailImages.filter((_, i) => i !== index),
      thumbnailPreviews: prev.thumbnailPreviews.filter((_, i) => i !== index),
      thumbnailImageNames: prev.thumbnailImageNames.filter((_, i) => i !== index),
    }));
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      slug: "",
      parent: "",
      shortDescription: "",
      fullDescription: "",
      status: "Visible",
      sortOrder: "0",
      featured: false,
      displayType: "both",
      categoryImages: [],
      categoryPreviews: [],
      categoryImageNames: [],
      bannerImages: [],
      bannerPreviews: [],
      bannerImageNames: [],
      thumbnailImages: [],
      thumbnailPreviews: [],
      thumbnailImageNames: [],
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    // Prepare JSON data for update (no FormData, just JSON)
    const updatePayload = {
      sort_order: Number(formData.sortOrder) || 0,
      status: formData.status === "Visible" ? true : false,
      descriptions: [
        {
          language_id: 1, // Set as needed
          name: formData.name,
          description: formData.fullDescription,
        },
      ],
      // Add other fields if needed (e.g., parent_id, image)
    };
    try {
      if (mode === "edit" && categoryId) {
        await updateCategory({ id: categoryId, body: updatePayload }).unwrap();
        toast.success("Category updated successfully");
      } else {
        const form = new FormData();
        formData.categoryImages.forEach((file) => {
          form.append(`categoryImages`, file, file.name);
        });
        formData.bannerImages.forEach((file) => {
          form.append(`bannerImages`, file, file.name);
        });
        formData.thumbnailImages.forEach((file) => {
          form.append(`thumbnailImages`, file, file.name);
        });
        const categoryData = {
          parent_id: formData.parent,
          parent_category: formData.parent,
          image: formData.categoryImageNames[0] || "",
          banner: formData.bannerImageNames[0] || "",
          thumbnail: formData.thumbnailImageNames[0] || "",
          top: false,
          column: 1,
          sort_order: Number(formData.sortOrder) || 0,
          status: formData.status === "Visible",
          featured: formData?.featured || false,
          displayType: formData?.displayType || "both",
          descriptions: [
            {
              language_id: 1,
              name: formData.name,
              description: formData.fullDescription,
              meta_title: formData.name,
              meta_description: formData.shortDescription,
              meta_keyword: formData.slug,
            },
          ],
          stores: [0],
          categoryImageNames: formData.categoryImageNames,
          bannerImageNames: formData.bannerImageNames,
          thumbnailImageNames: formData.thumbnailImageNames,
        }
        form.append("data", JSON.stringify(categoryData));
        await createCategory(form).unwrap();
        toast.success("Category created successfully");
      }
      resetFormData();
      setOpen(false)
    } catch (error) {
      toast.error(mode === "edit" ? "Failed to update category" : "Failed to create category")
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{mode === "create" ? "Add New Category" : "Edit Category"}</DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Create a new category for your products." : "Update the details of this category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Category Details</TabsTrigger>
              <TabsTrigger value="seo">SEO Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <CategoryDetailsForm
                formData={formData}
                onFormChange={handleFormChange}
                categoryImages={formData.categoryImages}
                categoryPreviews={formData.categoryPreviews}
                onCategoryImageSelect={handleCategoryImageSelect}
                onRemoveCategoryImage={handleRemoveCategoryImage}
                bannerImages={formData.bannerImages}
                bannerPreviews={formData.bannerPreviews}
                onBannerImageSelect={handleBannerImageSelect}
                onRemoveBannerImage={handleRemoveBannerImage}
                thumbnailImages={formData.thumbnailImages}
                thumbnailPreviews={formData.thumbnailPreviews}
                onThumbnailImageSelect={handleThumbnailImageSelect}
                onRemoveThumbnailImage={handleRemoveThumbnailImage}
              />
            </TabsContent>
            <TabsContent value="seo" className="mt-6">
              <CategorySeoForm category={category} />
            </TabsContent>
          </Tabs>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/90">
              {mode === "create" ? "Create Category" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
