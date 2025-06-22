"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { RolesHeader } from "@/components/roles/roles-header"
import { RolesList } from "@/components/roles/roles-list"

export function RolesShell() {
  return (
    <DashboardShell>
      <RolesHeader />
      <RolesList />
    </DashboardShell>
  )
}
