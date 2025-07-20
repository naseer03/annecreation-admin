'use client';
import { ArrowDownIcon, ArrowUpIcon, IndianRupee, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useGetSalesQuery, useGetNewOrdersQuery, useGetNewCustomersQuery, useGetOnlineCustomersQuery } from "@/lib/redux/api/dashboardApi"

const baseStats = [
  {
    title: "Total Revenue",
    value: "₹0.00",
    description: "Monthly revenue",
    change: "+0.0%",
    changeType: "positive",
    icon: IndianRupee,
    color: "#ffb729",
  },
  {
    title: "New Orders",
    value: "356",
    description: "Last 7 days",
    change: "+0.0%",
    changeType: "positive",
    icon: ShoppingCart,
    color: "#ffb729",
  },
  {
    title: "New Customers",
    value: "213",
    description: "Last 7 days",
    change: "-0.0%",
    changeType: "negative",
    icon: Users,
    color: "#ffb729",
  },
  {
    title: "Online Customers",
    value: "8",
    description: "Currently active",
    change: "+12.5%",
    changeType: "positive",
    icon: Users,
    color: "#ffb729",
    realtime: true,
  },
]

export function OverviewCards() {
  // Fetch sales, new orders, new customers, and online customers data
  const { data: salesData, isLoading: isSalesLoading } = useGetSalesQuery({ days: 90 });
  const { data: ordersData, isLoading: isOrdersLoading } = useGetNewOrdersQuery({ days: 90 });
  const { data: customersData, isLoading: isCustomersLoading } = useGetNewCustomersQuery();
  const { data: onlineCustomersData, isLoading: isOnlineCustomersLoading } = useGetOnlineCustomersQuery();

  // Update stats with API data
  const stats = baseStats.map((stat, idx) => {
    if (idx === 0 && salesData) {
      return {
        ...stat,
        value: `₹${Number((salesData as any).total_revenue || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
        description: `Revenue in last ${(salesData as any).period || '90 days'}`,
      };
    }
    if (idx === 1 && ordersData) {
      return {
        ...stat,
        value: `${(ordersData as any).total_orders ?? 0}`,
        description: `New orders in last ${(ordersData as any).period || '90 days'}`,
      };
    }
    if (idx === 2 && customersData) {
      return {
        ...stat,
        value: `${(customersData as any).total_new_customers ?? 0}`,
        description: `New customers in last ${(customersData as any).period || '30 days'}`,
      };
    }
    if (idx === 3 && onlineCustomersData) {
      return {
        ...stat,
        value: `${(onlineCustomersData as any).total_online_customers ?? 0}`,
        description: `Currently online customers`,
      };
    }
    return stat;
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border border-gray-200 bg-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              {stat.title}
              {stat.realtime && <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />}
            </CardTitle>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: stat.color }}
            >
              <stat.icon className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {(isSalesLoading && index === 0) || (isOrdersLoading && index === 1) || (isCustomersLoading && index === 2) || (isOnlineCustomersLoading && index === 3)
                ? '...'
                : stat.value}
            </div>
            <p className="mt-1 text-sm text-gray-500">{stat.description}</p>
          </CardContent>
          <CardFooter className="p-2">
            <div
              className={cn(
                "flex items-center rounded-full px-2 py-1 text-xs font-medium",
                stat.changeType === "positive" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
              )}
            >
              {stat.changeType === "positive" ? (
                <ArrowUpIcon className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3" />
              )}
              {stat.change}
              <span className="ml-1">from last month</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
