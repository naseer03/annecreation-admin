'use client'
import type React from "react"
import { ArrowRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGetTopProductsQuery } from "@/lib/redux/api/dashboardApi"


interface TopProductsProps extends React.HTMLAttributes<HTMLDivElement> {}


export function TopProducts({ className, ...props }: TopProductsProps) {
  const router = useRouter();
  const { data, isLoading } = useGetTopProductsQuery({ days: 90, limit: 5 });
  const products = data?.top_products || [];
  const maxSales = Math.max(...products.map((p) => p.quantity_sold), 1);

  return (
    <Card className={`border border-gray-200 bg-white shadow-md ${className}`} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-gray-900">Top Products</CardTitle>
          <CardDescription className="text-gray-500">Your best selling products in the last 90 days</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 border border-gray-300"
          onClick={() => router.push("/dashboard/products")}
        >
          View All
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isLoading ? (
            <div className="h-32 w-full animate-pulse rounded-md bg-muted" />
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500">No data available</div>
          ) : (
            products.map((product) => {
              const percent = Math.round((product.quantity_sold / maxSales) * 100);
              return (
                <div key={product.product_id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
                        <Image
                          src={product.image ? `http://89.116.32.45:5999/${product.image}` : "/placeholder.svg"}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.quantity_sold} sales</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{percent}%</div>
                  </div>
                  <Progress value={percent} className="h-2 bg-gray-100" indicatorClassName="bg-[#ffb729]" />
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
