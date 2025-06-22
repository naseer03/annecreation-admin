import { CustomersHeader } from "@/components/customers/customers-header"
import { CustomersList } from "@/components/customers/customers-list"
import { CustomersShell } from "@/components/customers/customers-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SidebarProvider } from "@/contexts/sidebar-context"

export default function CustomersPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <DashboardShell>
              <CustomersShell>
                <CustomersHeader />
                <CustomersList />
              </CustomersShell>
            </DashboardShell>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
