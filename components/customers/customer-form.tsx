"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface CustomerFormProps {
  customer?: any
}

export function CustomerForm({ customer }: CustomerFormProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="first-name" className="text-gray-700">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="first-name"
              placeholder="Enter first name"
              defaultValue={customer?.name?.split(" ")[0] || ""}
              className="border-gray-300"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name" className="text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="last-name"
              placeholder="Enter last name"
              defaultValue={customer?.name?.split(" ").slice(1).join(" ") || ""}
              className="border-gray-300"
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email" className="text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            defaultValue={customer?.email || ""}
            className="border-gray-300"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="telephone" className="text-gray-700">
            Telephone <span className="text-red-500">*</span>
          </Label>
          <Input
            id="telephone"
            placeholder="Enter telephone number"
            defaultValue={customer?.telephone || ""}
            className="border-gray-300"
            required
          />
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">Address Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="address-line1" className="text-gray-700">
              Address Line 1 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address-line1"
              placeholder="Enter street address"
              defaultValue={customer?.address?.line1 || ""}
              className="border-gray-300"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address-line2" className="text-gray-700">
              Address Line 2
            </Label>
            <Input
              id="address-line2"
              placeholder="Enter apartment, suite, etc."
              defaultValue={customer?.address?.line2 || ""}
              className="border-gray-300"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="city" className="text-gray-700">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              placeholder="Enter city"
              defaultValue={customer?.city || ""}
              className="border-gray-300"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state" className="text-gray-700">
              State <span className="text-red-500">*</span>
            </Label>
            <Select defaultValue={customer?.state || ""}>
              <SelectTrigger id="state" className="border-gray-300">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Gujarat">Gujarat</SelectItem>
                <SelectItem value="Karnataka">Karnataka</SelectItem>
                <SelectItem value="Kerala">Kerala</SelectItem>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                <SelectItem value="Telangana">Telangana</SelectItem>
                <SelectItem value="West Bengal">West Bengal</SelectItem>
                {/* Add more states as needed */}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pincode" className="text-gray-700">
              PIN Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="pincode"
              placeholder="Enter PIN code"
              defaultValue={customer?.pincode || ""}
              className="border-gray-300"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="customer-group" className="text-gray-700">
              Customer Group
            </Label>
            <Select defaultValue={customer?.group || "default"}>
              <SelectTrigger id="customer-group" className="border-gray-300">
                <SelectValue placeholder="Select customer group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="wholesale">Wholesale</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status" className="text-gray-700">
              Status
            </Label>
            <Select defaultValue={customer?.status || "Active"}>
              <SelectTrigger id="status" className="border-gray-300">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch id="newsletter" defaultChecked={customer?.newsletter || false} />
          <Label htmlFor="newsletter" className="text-gray-700">
            Subscribe to newsletter
          </Label>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="notes" className="text-gray-700">
            Additional Notes
          </Label>
          <Textarea
            id="notes"
            placeholder="Enter any additional notes about this customer"
            className="min-h-[100px] resize-y border-gray-300"
            defaultValue={customer?.notes || ""}
          />
        </div>
      </div>

      {!customer && (
        <div className="grid gap-3">
          <h3 className="text-lg font-medium text-gray-900">Password</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                className="border-gray-300"
                required={!customer}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password" className="text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm password"
                className="border-gray-300"
                required={!customer}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
