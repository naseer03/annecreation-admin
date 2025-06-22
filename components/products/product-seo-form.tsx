"use client";

import { ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFormData } from "./product-dialog";

interface ProductSeoFormProps {
  product?: any;
  formData: ProductFormData;
  onChange: (field: keyof ProductFormData, value: any) => void;
}

export function ProductSeoForm({
  product,
  formData,
  onChange,
}: ProductSeoFormProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">
          Basic SEO Settings
        </h3>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="meta-title" className="text-gray-700">
              Meta Title
            </Label>
            <Input
              id="meta-title"
              placeholder="Enter meta title"
              defaultValue={product?.metaTitle || ""}
              className="border-gray-300"
              onChange={(e) => onChange("metaTitle", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Recommended length: 50-60 characters. Appears in search engine
              results.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="meta-description" className="text-gray-700">
              Meta Description
            </Label>
            <Textarea
              id="meta-description"
              placeholder="Enter meta description"
              className="min-h-[80px] resize-y border-gray-300"
              defaultValue={product?.metaDescription || ""}
              onChange={(e) => onChange("metaDescription", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Recommended length: 150-160 characters. Appears in search engine
              results.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="meta-keywords" className="text-gray-700">
              Meta Keywords (Optional)
            </Label>
            <Input
              id="meta-keywords"
              placeholder="keyword1, keyword2, keyword3"
              defaultValue={product?.metaKeywords || ""}
              className="border-gray-300"
              onChange={(e) => onChange("metaKeywords", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Comma-separated keywords. Less important for modern SEO.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="canonical-url" className="text-gray-700">
              Canonical URL (Optional)
            </Label>
            <Input
              id="canonical-url"
              placeholder="https://example.com/product-name"
              defaultValue={product?.canonicalUrl || ""}
              className="border-gray-300"
              onChange={(e) => onChange("canonicalUrl", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Use this to avoid duplicate content issues.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">
          Social Media Settings
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-medium text-gray-700">
              Open Graph (Facebook)
            </h4>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="og-title" className="text-gray-700">
                  OG Title
                </Label>
                <Input
                  id="og-title"
                  placeholder="Enter Open Graph title"
                  defaultValue={product?.ogTitle || ""}
                  className="border-gray-300"
                  onChange={(e) => onChange("ogTitle", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="og-description" className="text-gray-700">
                  OG Description
                </Label>
                <Textarea
                  id="og-description"
                  placeholder="Enter Open Graph description"
                  className="min-h-[80px] resize-y border-gray-300"
                  defaultValue={product?.ogDescription || ""}
                  onChange={(e) => onChange("ogDescription", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-700">OG Image</Label>
                <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center gap-1 text-gray-500">
                    <ImagePlus className="h-8 w-8" />
                    <span className="text-sm">Click to upload</span>
                    <span className="text-xs">
                      Recommended size: 1200x630px
                    </span>
                  </div>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-medium text-gray-700">Twitter Card</h4>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="twitter-title" className="text-gray-700">
                  Twitter Title
                </Label>
                <Input
                  id="twitter-title"
                  placeholder="Enter Twitter title"
                  defaultValue={product?.twitterTitle || ""}
                  className="border-gray-300"
                  onChange={(e) => onChange("twitterTitle", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="twitter-description" className="text-gray-700">
                  Twitter Description
                </Label>
                <Textarea
                  id="twitter-description"
                  placeholder="Enter Twitter description"
                  className="min-h-[80px] resize-y border-gray-300"
                  defaultValue={product?.twitterDescription || ""}
                  onChange={(e) =>
                    onChange("twitterDescription", e.target.value)
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-700">Twitter Image</Label>
                <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center gap-1 text-gray-500">
                    <ImagePlus className="h-8 w-8" />
                    <span className="text-sm">Click to upload</span>
                    <span className="text-xs">Recommended size: 800x418px</span>
                  </div>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">
          Advanced SEO Settings
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="robots-meta" className="text-gray-700">
              Robots Meta Tag
            </Label>
            <Select
              defaultValue={product?.robotsMeta || "index,follow"}
              onValueChange={(value) => onChange("robotsMeta", value)}
            >
              <SelectTrigger id="robots-meta" className="border-gray-300">
                <SelectValue placeholder="Select robots meta tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="index,follow">Index, Follow</SelectItem>
                <SelectItem value="noindex,follow">No Index, Follow</SelectItem>
                <SelectItem value="index,nofollow">Index, No Follow</SelectItem>
                <SelectItem value="noindex,nofollow">
                  No Index, No Follow
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Controls how search engines crawl and index this product.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="custom-h1" className="text-gray-700">
              Custom H1 (Optional)
            </Label>
            <Input
              id="custom-h1"
              placeholder="Enter custom H1 heading"
              defaultValue={product?.customH1 || ""}
              className="border-gray-300"
              onChange={(e) => onChange("customH1", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              If different from product name. Used as main heading on product
              page.
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="structured-data" className="text-gray-700">
            Additional Structured Data (Optional)
          </Label>
          <Textarea
            id="structured-data"
            placeholder="Enter additional JSON-LD structured data"
            className="min-h-[120px] resize-y border-gray-300 font-mono text-sm"
            defaultValue={product?.structuredData || ""}
            onChange={(e) => onChange("structuredData", e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Advanced: Add custom JSON-LD structured data for this product.
          </p>
        </div>
      </div>
    </div>
  );
}
