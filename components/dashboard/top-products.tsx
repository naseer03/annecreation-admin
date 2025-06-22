import type React from "react"
import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const products = [
  {
    name: "Handcrafted Wooden Bowl",
    sales: 89,
    percentage: 89,
  },
  {
    name: "Artisan Coffee Mug",
    sales: 75,
    percentage: 75,
  },
  {
    name: "Woven Basket Set",
    sales: 62,
    percentage: 62,
  },
  {
    name: "Ceramic Vase",
    sales: 51,
    percentage: 51,
  },
  {
    name: "Macrame Wall Hanging",
    sales: 45,
    percentage: 45,
  },
]

interface TopProductsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TopProducts({ className, ...props }: TopProductsProps) {
  return (
    <Card className={`border border-gray-200 bg-white shadow-md ${className}`} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-gray-900">Top Products</CardTitle>
          <CardDescription className="text-gray-500">Your best selling products this month</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1 border border-gray-300">
          View All
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
                    <Image
                      src={`/abstract-geometric-shapes.png?height=48&width=48&query=${encodeURIComponent(product.name)}`}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.sales} sales</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">{product.percentage}%</div>
              </div>
              <Progress value={product.percentage} className="h-2 bg-gray-100" indicatorClassName="bg-[#ffb729]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
