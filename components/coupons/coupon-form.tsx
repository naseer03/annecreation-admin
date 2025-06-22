"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface CouponFormProps {
  coupon?: any
}

export function CouponForm({ coupon }: CouponFormProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">Coupon Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-gray-700">
              Coupon Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter coupon name"
              defaultValue={coupon?.name || ""}
              className="border-gray-300"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="code" className="text-gray-700">
              Coupon Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="code"
              placeholder="Enter coupon code"
              defaultValue={coupon?.code || ""}
              className="border-gray-300 uppercase"
              required
            />
            <p className="text-xs text-gray-500">
              The coupon code that customers will enter at checkout. Use only letters and numbers.
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <Label className="text-gray-700">
            Discount Type <span className="text-red-500">*</span>
          </Label>
          <RadioGroup defaultValue={coupon?.discountType || "Percentage"} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Percentage" id="percentage" />
              <Label htmlFor="percentage" className="cursor-pointer">
                Percentage Discount (%)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Fixed Amount" id="fixed" />
              <Label htmlFor="fixed" className="cursor-pointer">
                Fixed Amount Discount (₹)
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="discount" className="text-gray-700">
            Discount Amount <span className="text-red-500">*</span>
          </Label>
          <Input
            id="discount"
            type="number"
            min="0"
            placeholder="Enter discount amount"
            defaultValue={coupon?.discount || ""}
            className="border-gray-300"
            required
          />
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">Validity Period</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="date-start" className="text-gray-700">
              Start Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="date-start"
              type="date"
              defaultValue={coupon?.dateStart || ""}
              className="border-gray-300"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date-end" className="text-gray-700">
              End Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="date-end"
              type="date"
              defaultValue={coupon?.dateEnd || ""}
              className="border-gray-300"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">Usage Restrictions</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="usage-limit" className="text-gray-700">
              Usage Limit Per Coupon
            </Label>
            <Input
              id="usage-limit"
              type="number"
              min="0"
              placeholder="Enter usage limit (0 for unlimited)"
              defaultValue={coupon?.usageLimit || "0"}
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">
              The maximum number of times this coupon can be used. Enter 0 for unlimited usage.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="usage-limit-per-user" className="text-gray-700">
              Usage Limit Per Customer
            </Label>
            <Input
              id="usage-limit-per-user"
              type="number"
              min="0"
              placeholder="Enter usage limit per customer (0 for unlimited)"
              defaultValue={coupon?.usageLimitPerUser || "0"}
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">
              The maximum number of times this coupon can be used by a single customer. Enter 0 for unlimited usage.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="minimum-spend" className="text-gray-700">
              Minimum Spend (₹)
            </Label>
            <Input
              id="minimum-spend"
              type="number"
              min="0"
              placeholder="Enter minimum spend (0 for no minimum)"
              defaultValue={coupon?.minimumSpend || "0"}
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">
              The minimum order amount required to use this coupon. Enter 0 for no minimum.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="maximum-spend" className="text-gray-700">
              Maximum Spend (₹)
            </Label>
            <Input
              id="maximum-spend"
              type="number"
              min="0"
              placeholder="Enter maximum spend (0 for no maximum)"
              defaultValue={coupon?.maximumSpend || "0"}
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">
              The maximum order amount this coupon can be applied to. Enter 0 for no maximum.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">Additional Settings</h3>
        <div className="flex items-center gap-2">
          <Switch id="individual-use" defaultChecked={coupon?.individualUse || false} />
          <Label htmlFor="individual-use" className="text-gray-700">
            Individual use only
          </Label>
        </div>
        <p className="text-xs text-gray-500 -mt-1">
          If checked, this coupon cannot be used in conjunction with other coupons.
        </p>

        <div className="flex items-center gap-2">
          <Switch id="exclude-sale-items" defaultChecked={coupon?.excludeSaleItems || false} />
          <Label htmlFor="exclude-sale-items" className="text-gray-700">
            Exclude sale items
          </Label>
        </div>
        <p className="text-xs text-gray-500 -mt-1">If checked, this coupon will not apply to items that are on sale.</p>

        <div className="grid gap-2">
          <Label htmlFor="status" className="text-gray-700">
            Status
          </Label>
          <Select defaultValue={coupon?.status || "Active"}>
            <SelectTrigger id="status" className="border-gray-300">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description" className="text-gray-700">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter coupon description"
            className="min-h-[100px] resize-y border-gray-300"
            defaultValue={coupon?.description || ""}
          />
        </div>
      </div>
    </div>
  )
}
