"use client"

import { ImagePlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface CategoryDetailsFormProps {
  category?: any
}

export function CategoryDetailsForm({ category }: CategoryDetailsFormProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-gray-700">
              Category Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter category name"
              defaultValue={category?.name || ""}
              className="border-gray-300"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug" className="text-gray-700">
              Slug
            </Label>
            <Input
              id="slug"
              placeholder="url-friendly-name"
              defaultValue={category?.slug || ""}
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">Auto-generated from name if left blank. Used in URLs.</p>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="parent" className="text-gray-700">
            Parent Category
          </Label>
          <Select defaultValue={category?.parent || ""}>
            <SelectTrigger id="parent" className="border-gray-300">
              <SelectValue placeholder="Select parent category (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (Top Level)</SelectItem>
              <SelectItem value="Women's Fashion">Women's Fashion</SelectItem>
              <SelectItem value="Men's Fashion">Men's Fashion</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-3">
          <Label className="text-gray-700">Category Image</Label>
          <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center gap-1 text-gray-500">
              <ImagePlus className="h-8 w-8" />
              <span className="text-sm">Click to upload</span>
              <span className="text-xs">SVG, PNG, JPG or GIF (max. 2MB)</span>
            </div>
            <input type="file" className="hidden" />
          </div>
        </div>

        <div className="grid gap-3">
          <Label className="text-gray-700">Thumbnail Image (Optional)</Label>
          <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center gap-1 text-gray-500">
              <ImagePlus className="h-8 w-8" />
              <span className="text-sm">Click to upload</span>
              <span className="text-xs">Used in category previews</span>
            </div>
            <input type="file" className="hidden" />
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">Descriptions</h3>
        <div className="grid gap-2">
          <Label htmlFor="short-description" className="text-gray-700">
            Short Description
          </Label>
          <Textarea
            id="short-description"
            placeholder="Enter a brief summary of the category"
            className="min-h-[80px] resize-y border-gray-300"
            defaultValue={category?.shortDescription || ""}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="full-description" className="text-gray-700">
            Full Description
          </Label>
          <Textarea
            id="full-description"
            placeholder="Enter detailed description of the category"
            className="min-h-[120px] resize-y border-gray-300"
            defaultValue={category?.fullDescription || ""}
          />
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">Status & Sorting</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="visibility" className="text-gray-700">
              Visibility
            </Label>
            <Select defaultValue={category?.status || "Visible"}>
              <SelectTrigger id="visibility" className="border-gray-300">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Visible">Visible</SelectItem>
                <SelectItem value="Hidden">Hidden</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sort-order" className="text-gray-700">
              Sort Order
            </Label>
            <Input
              id="sort-order"
              type="number"
              min="0"
              placeholder="0"
              defaultValue={category?.sortOrder || "0"}
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">Lower numbers appear first</p>
          </div>

          <div className="flex items-center gap-2 pt-8">
            <Switch id="featured" defaultChecked={category?.featured || false} />
            <Label htmlFor="featured" className="text-gray-700">
              Featured Category
            </Label>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">Additional Settings</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="display-type" className="text-gray-700">
              Display Type
            </Label>
            <Select defaultValue={category?.displayType || "both"}>
              <SelectTrigger id="display-type" className="border-gray-300">
                <SelectValue placeholder="Select display type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="products">Products Only</SelectItem>
                <SelectItem value="subcategories">Subcategories Only</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label className="text-gray-700">Banner Image (Optional)</Label>
            <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center gap-1 text-gray-500">
                <ImagePlus className="h-8 w-8" />
                <span className="text-sm">Click to upload</span>
                <span className="text-xs">For category landing pages</span>
              </div>
              <input type="file" className="hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
