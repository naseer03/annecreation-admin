"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const dailyData = [
  { name: "Mon", sales: 4000, revenue: 24000 },
  { name: "Tue", sales: 3000, revenue: 18000 },
  { name: "Wed", sales: 2000, revenue: 12000 },
  { name: "Thu", sales: 2780, revenue: 16680 },
  { name: "Fri", sales: 1890, revenue: 11340 },
  { name: "Sat", sales: 2390, revenue: 14340 },
  { name: "Sun", sales: 3490, revenue: 20940 },
]

const weeklyData = [
  { name: "Week 1", sales: 24000, revenue: 144000 },
  { name: "Week 2", sales: 18000, revenue: 108000 },
  { name: "Week 3", sales: 22000, revenue: 132000 },
  { name: "Week 4", sales: 25000, revenue: 150000 },
]

const monthlyData = [
  { name: "Jan", sales: 65000, revenue: 390000 },
  { name: "Feb", sales: 59000, revenue: 354000 },
  { name: "Mar", sales: 80000, revenue: 480000 },
  { name: "Apr", sales: 81000, revenue: 486000 },
  { name: "May", sales: 56000, revenue: 336000 },
  { name: "Jun", sales: 55000, revenue: 330000 },
  { name: "Jul", sales: 40000, revenue: 240000 },
  { name: "Aug", sales: 60000, revenue: 360000 },
  { name: "Sep", sales: 63000, revenue: 378000 },
  { name: "Oct", sales: 58000, revenue: 348000 },
  { name: "Nov", sales: 48000, revenue: 288000 },
  { name: "Dec", sales: 68000, revenue: 408000 },
]

export function StatisticsSales({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState("daily")

  const getActiveData = () => {
    switch (activeTab) {
      case "daily":
        return dailyData
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      default:
        return dailyData
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>View sales performance across different time periods</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="daily" onValueChange={setActiveTab} className="h-[400px]">
          <div className="px-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="daily" className="h-[350px]">
            <ChartContainer
              config={{
                sales: {
                  label: "Sales",
                  color: "hsl(var(--chart-1))",
                },
                revenue: {
                  label: "Revenue (₹)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="var(--color-sales)" />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="weekly" className="h-[350px]">
            <ChartContainer
              config={{
                sales: {
                  label: "Sales",
                  color: "hsl(var(--chart-1))",
                },
                revenue: {
                  label: "Revenue (₹)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="var(--color-sales)" />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="monthly" className="h-[350px]">
            <ChartContainer
              config={{
                sales: {
                  label: "Sales",
                  color: "hsl(var(--chart-1))",
                },
                revenue: {
                  label: "Revenue (₹)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="var(--color-sales)" />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
