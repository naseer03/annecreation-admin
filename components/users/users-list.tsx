"use client"

import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
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
import { UserDialog } from "@/components/users/user-dialog"

// Sample data - in a real app, this would come from your backend
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Administrator",
    status: "Active",
    lastLogin: "2023-05-08 10:30:45",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2023-05-07 14:22:10",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "Support",
    status: "Inactive",
    lastLogin: "2023-04-28 09:15:33",
  },
]

export function UsersList() {
  const [editUser, setEditUser] = useState<(typeof users)[0] | null>(null)
  const [open, setOpen] = useState(false)

  const handleEdit = (user: (typeof users)[0]) => {
    setEditUser(user)
    setOpen(true)
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Staff Users</CardTitle>
        <CardDescription>View and manage staff users and their access permissions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "Active" ? "default" : "secondary"}
                    className={
                      user.status === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(user)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
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
      <UserDialog open={open} onOpenChange={setOpen} user={editUser} mode={editUser ? "edit" : "create"} />
    </Card>
  )
}
