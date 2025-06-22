"use client"

import { PlusCircle } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { UserDialog } from "@/components/users/user-dialog"

export function UsersHeader() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Staff Users</h1>
        <p className="text-muted-foreground">Manage staff users and their permissions</p>
      </div>
      <Button onClick={() => setOpen(true)} className="bg-[#ffb729] text-[#311807] hover:bg-[#ffb729]/90">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add User
      </Button>
      <UserDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
