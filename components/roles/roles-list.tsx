"use client"

import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RoleDialog } from "@/components/roles/role-dialog"

// Sample data - in a real app, this would come from your backend
const roles = [
  {
    id: "1",
    name: "Administrator",
    description: "Full access to all resources",
    usersCount: 2,
  },
  {
    id: "2",
    name: "Manager",
    description: "Manage products, orders, and customers",
    usersCount: 5,
  },
  {
    id: "3",
    name: "Support",
    description: "View products, process orders, and manage customers",
    usersCount: 8,
  },
  {
    id: "4",
    name: "Editor",
    description: "Create and edit products and categories",
    usersCount: 3,
  },
]

export function RolesList() {
  const [editRole, setEditRole] = useState<(typeof roles)[0] | null>(null)
  const [open, setOpen] = useState(false)

  const handleEdit = (role: (typeof roles)[0]) => {
    setEditRole(role)
    setOpen(true)
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>User Roles</CardTitle>
        <CardDescription>View and manage user roles and their permissions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Users</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>{role.usersCount}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEdit(role)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" disabled={role.name === "Administrator"}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <RoleDialog open={open} onOpenChange={setOpen} role={editRole} mode={editRole ? "edit" : "create"} />
    </Card>
  )
}
