import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { TopProducts } from "@/components/dashboard/top-products"
import { SidebarProvider } from "@/contexts/sidebar-context"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <DashboardShell>
              <div className="grid gap-6">
                <OverviewCards />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                  <RevenueChart className="lg:col-span-4" />
                  <TopProducts className="lg:col-span-3" />
                </div>
                <RecentOrders />
              </div>
            </DashboardShell>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
