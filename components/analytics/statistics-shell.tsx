import { StatisticsHeader } from "./statistics-header"
import { StatisticsOverview } from "./statistics-overview"
import { StatisticsSales } from "./statistics-sales"
import { StatisticsProducts } from "./statistics-products"
import { StatisticsCustomers } from "./statistics-customers"

export function StatisticsShell() {
  return (
    <div className="flex flex-col gap-6">
      <StatisticsHeader />
      <div className="grid gap-6">
        <StatisticsOverview />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <StatisticsSales className="lg:col-span-4" />
          <StatisticsProducts className="lg:col-span-3" />
        </div>
        <StatisticsCustomers />
      </div>
    </div>
  )
}
