import { ProductsAnalyticsHeader } from "./products-analytics-header"
import { TopProducts } from "./top-products"
import { ProductPerformance } from "./product-performance"
import { CategoryPerformance } from "./category-performance"
import { ProductTrends } from "./product-trends"

export function ProductsAnalyticsShell() {
  return (
    <div className="flex flex-col gap-6">
      <ProductsAnalyticsHeader />
      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <TopProducts className="lg:col-span-3" />
          <ProductPerformance className="lg:col-span-4" />
        </div>
        <CategoryPerformance />
        <ProductTrends />
      </div>
    </div>
  )
}
