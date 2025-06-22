"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { UserPermissions } from "@/components/users/user-permissions"
import { RoleForm } from "@/components/roles/role-form"

interface RoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  role?: any
  mode?: "create" | "edit"
}

export function RoleDialog({ open, onOpenChange, role = null, mode = "create" }: RoleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create New Role" : "Edit Role"}</DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Create a new role with custom permissions." : "Edit role details and permissions."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <RoleForm role={role} />
          <div>
            <h3 className="mb-4 text-lg font-medium">Role Permissions</h3>
            <UserPermissions user={role ? { role: role.name } : null} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
            Cancel
          </Button>
          <Button type="submit" form="role-form" className="bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/90">
            {mode === "create" ? "Create Role" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
