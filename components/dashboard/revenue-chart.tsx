"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 3200 },
  { name: "Apr", total: 4500 },
  { name: "May", total: 3200 },
  { name: "Jun", total: 5400 },
  { name: "Jul", total: 6800 },
  { name: "Aug", total: 7300 },
  { name: "Sep", total: 6100 },
  { name: "Oct", total: 5400 },
  { name: "Nov", total: 4500 },
  { name: "Dec", total: 8200 },
]

interface RevenueChartProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RevenueChart({ className, ...props }: RevenueChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className={`border border-gray-200 bg-white shadow-md ${className}`} {...props}>
        <CardHeader className="flex flex-row items-center justify-between pb-8">
          <div>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </div>
          <div className="w-[120px]">
            <Select defaultValue="2023">
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="h-[300px]">
          <div className="h-full w-full animate-pulse rounded-md bg-muted"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`border border-gray-200 bg-white shadow-md ${className}`} {...props}>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div>
          <CardTitle className="text-xl font-bold text-gray-900">Revenue Overview</CardTitle>
          <CardDescription className="text-gray-500">Monthly revenue for the current year</CardDescription>
        </div>
        <div className="w-[120px]">
          <Select defaultValue="2023">
            <SelectTrigger className="border border-gray-300">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} tick={{ fill: "#6b7280" }} />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tickFormatter={(value) => `₹${value}`}
              tick={{ fill: "#6b7280" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(243, 244, 246, 0.8)" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-gray-500">Month</span>
                          <span className="font-bold text-gray-900">{payload[0].payload.name}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-gray-500">Revenue</span>
                          <span className="font-bold text-gray-900">₹{payload[0].value}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="total" radius={[4, 4, 0, 0]} fill="#ffb729" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
