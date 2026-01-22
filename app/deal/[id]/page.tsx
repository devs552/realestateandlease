"use client"

import { mockDeals } from "@/lib/mock-data"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface DealDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function DealDetailPage({ params }: DealDetailPageProps) {
  const { id } = await params
  const deal = mockDeals.find((d) => d.id === id)

  if (!deal) {
    return (
      <>
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-muted-foreground">Deal not found</p>
          <Link href="/">
            <Button className="mt-4">Back to Deals</Button>
          </Link>
        </main>
      </>
    )
  }

  const avgCompPrice = deal.comps.reduce((sum, comp) => sum + comp.price, 0) / deal.comps.length
  const arvVariance = deal.arv - avgCompPrice

  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/">
          <Button variant="outline" className="mb-6 bg-transparent">
            ← Back to Deals
          </Button>
        </Link>

        <div className="grid gap-6">
          {/* Property Overview */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Property Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Address</p>
                <p className="text-lg font-semibold text-foreground">{deal.address}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Purchase Price</p>
                <p className="text-lg font-semibold text-foreground">${deal.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">ARV</p>
                <p className="text-lg font-semibold text-foreground">${deal.arv.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Gross Profit</p>
                <p className="text-lg font-semibold text-green-600">${(deal.arv - deal.price).toLocaleString()}</p>
              </div>
            </div>
          </Card>

          {/* COMPs Analysis */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Comparable Sales (COMPs)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-foreground">Address</th>
                    <th className="px-4 py-2 text-left font-semibold text-foreground">Price</th>
                    <th className="px-4 py-2 text-left font-semibold text-foreground">DOM</th>
                    <th className="px-4 py-2 text-left font-semibold text-foreground">Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {deal.comps.map((comp, idx) => (
                    <tr key={idx} className="border-t border-border hover:bg-muted/50">
                      <td className="px-4 py-2 text-foreground">{comp.address}</td>
                      <td className="px-4 py-2 text-foreground">${comp.price.toLocaleString()}</td>
                      <td className="px-4 py-2 text-foreground">{comp.dom} days</td>
                      <td className="px-4 py-2 text-foreground">{comp.distance} mi</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Average COMP Price:{" "}
                <span className="font-semibold text-foreground">${avgCompPrice.toLocaleString()}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                ARV Variance:{" "}
                <span className={`font-semibold ${arvVariance >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {arvVariance >= 0 ? "+" : ""}${arvVariance.toLocaleString()}
                </span>
              </p>
            </div>
          </Card>

          {/* ARV Adjustments */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">ARV Adjustments</h2>
            <div className="space-y-3">
              {deal.arvAdjustments.map((adj, idx) => (
                <div key={idx} className="flex items-start justify-between p-3 bg-muted rounded">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{adj.category}</p>
                    <p className="text-xs text-muted-foreground mt-1">{adj.reason}</p>
                  </div>
                  <p
                    className={`font-semibold whitespace-nowrap ml-4 ${
                      adj.amount >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {adj.amount >= 0 ? "+" : ""}${adj.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* DOM Gating */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">DOM Gating Analysis</h2>
            <div className="bg-muted p-4 rounded">
              <p className="text-sm text-muted-foreground mb-3">
                <span className="font-semibold text-foreground">DOM Threshold:</span> {deal.domGatingThreshold} days
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Max COMP DOM:</span>{" "}
                {Math.max(...deal.comps.map((c) => c.dom))} days
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                The DOM gating mechanism ensures we only consider comparable sales that have been on market within{" "}
                {deal.domGatingThreshold} days, maintaining relevance and market currency of the valuation.
              </p>
            </div>
          </Card>

          {/* Final Decision */}
          <Card
            className={`p-6 border-2 ${
              deal.status === "PASS"
                ? "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900"
                : "border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Decision</h2>
              <span
                className={`inline-block px-4 py-2 rounded text-lg font-bold ${
                  deal.status === "PASS"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                }`}
              >
                {deal.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Profit Margin:</span>
                <span
                  className={`font-semibold text-lg ${deal.profitPercent >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {deal.profitPercent > 0 ? "+" : ""}
                  {deal.profitPercent.toFixed(1)}%
                </span>
              </div>

              {deal.status === "FAIL" && deal.failureReasons && (
                <div className="mt-4 pt-4 border-t border-current/20">
                  <p className="font-semibold text-foreground mb-2">Failure Reasons:</p>
                  <ul className="space-y-1">
                    {deal.failureReasons.map((reason, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <span className="mr-2">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
