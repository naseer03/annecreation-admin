"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { UsersHeader } from "@/components/users/users-header"
import { UsersList } from "@/components/users/users-list"

export function UsersShell() {
  return (
    <DashboardShell>
      <UsersHeader />
      <UsersList />
    </DashboardShell>
  )
}
