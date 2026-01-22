"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockDeals } from "@/lib/mock-data"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const passedDeals = mockDeals.filter((d) => d.status === "PASS")
  const failedDeals = mockDeals.filter((d) => d.status === "FAIL")
  const totalDealsScanned = mockDeals.length
  const avgProfit = (passedDeals.reduce((sum, d) => sum + d.profitPercent, 0) / passedDeals.length).toFixed(1)

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of deal sourcing and underwriting</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Deals Scanned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalDealsScanned}</div>
              <p className="text-xs text-muted-foreground mt-1">Total properties analyzed</p>
            </CardContent>
          </Card>

          <Card className="border-success/50 bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Deals Passed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{passedDeals.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Met all criteria</p>
            </CardContent>
          </Card>

          <Card className="border-destructive/50 bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Deals Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{failedDeals.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Did not meet criteria</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Profit %</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{avgProfit}%</div>
              <p className="text-xs text-muted-foreground mt-1">Passed deals only</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Today's Activity</CardTitle>
            <CardDescription>Recent deals processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDeals.slice(0, 5).map((deal) => (
                <div
                  key={deal.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{deal.address}</p>
                    <p className="text-sm text-muted-foreground">${deal.price.toLocaleString()}</p>
                  </div>
                  <Link href={`/deals/${deal.id}`}>
                    <button className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm">
                      <span>View Details</span>
                      <TrendingUp className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/deals" className="block p-2 rounded hover:bg-muted text-primary font-medium">
                → View All Deals
              </Link>
              <Link href="/daily-summary" className="block p-2 rounded hover:bg-muted text-primary font-medium">
                → Daily Summary
              </Link>
              <Link href="/rules" className="block p-2 rounded hover:bg-muted text-primary font-medium">
                → Underwriting Rules
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pass Rate</span>
                <span className="font-medium">{((passedDeals.length / totalDealsScanned) * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg Days on Market</span>
                <span className="font-medium">52 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Profit Potential</span>
                <span className="font-medium text-success">
                  ${(passedDeals.reduce((sum, d) => sum + (d.arv - d.price) * 0.85, 0) / 1000).toFixed(0)}K
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
