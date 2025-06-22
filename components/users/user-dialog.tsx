"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserForm } from "@/components/users/user-form"
import { UserPermissions } from "@/components/users/user-permissions"

interface UserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: any
  mode?: "create" | "edit"
}

export function UserDialog({ open, onOpenChange, user = null, mode = "create" }: UserDialogProps) {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add New User" : "Edit User"}</DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Add a new staff user to the system." : "Edit user details and permissions."}
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">User Details</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <UserForm user={user} />
          </TabsContent>
          <TabsContent value="permissions" className="mt-4">
            <UserPermissions user={user} />
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
            Cancel
          </Button>
          <Button type="submit" form="user-form" className="bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/90">
            {mode === "create" ? "Create User" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
