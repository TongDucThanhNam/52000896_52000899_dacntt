"use client"

import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"

import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {Transaction} from "@/types"

const chartConfig = {
    revenue: {
        label: "Doanh thu",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

interface OverviewProps {
    data: Transaction[]
}


export function Overview(
    {data}: OverviewProps
) {
    const chartData = data.map(transaction => {
        return {
            month: new Date(transaction.updatedAt).toLocaleDateString('vi-GB'),
            revenue: transaction.totalValue,
        }
    })

    // Group by date
    const groupedData = chartData.reduce((acc, curr) => {
        const month = curr.month
        if (!acc[month]) {
            acc[month] = { month, revenue: 0 }
        }
        acc[month].revenue += curr.revenue
        return acc
    }, {} as Record<string, { month: string; revenue: number }>)


    return (
        <ChartContainer config={chartConfig} className="w-full aspect-[4/3]">
            <BarChart accessibilityLayer data={Object.values(groupedData)}>
                <CartesianGrid vertical={false}/>
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false}/>
                <ChartTooltip content={<ChartTooltipContent/>}/>
                <ChartLegend content={<ChartLegendContent/>}/>
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]}/>
            </BarChart>
        </ChartContainer>
    )
}