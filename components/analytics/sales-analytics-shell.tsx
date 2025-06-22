import { SalesAnalyticsHeader } from "./sales-analytics-header"
import { SalesPerformance } from "./sales-performance"
import { SalesTrends } from "./sales-trends"
import { SalesChannels } from "./sales-channels"
import { SalesRegions } from "./sales-regions"

export function SalesAnalyticsShell() {
  return (
    <div className="flex flex-col gap-6">
      <SalesAnalyticsHeader />
      <div className="grid gap-6">
        <SalesPerformance />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <SalesTrends className="lg:col-span-4" />
          <SalesChannels className="lg:col-span-3" />
        </div>
        <SalesRegions />
      </div>
    </div>
  )
}
