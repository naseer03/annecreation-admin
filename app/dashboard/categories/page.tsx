import { CategoriesHeader } from "@/components/categories/categories-header"
import { CategoriesList } from "@/components/categories/categories-list"
import { CategoriesShell } from "@/components/categories/categories-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SidebarProvider } from "@/contexts/sidebar-context"

export default function CategoriesPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <DashboardShell>
              <CategoriesShell>
                <CategoriesHeader />
                <CategoriesList />
              </CategoriesShell>
            </DashboardShell>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
