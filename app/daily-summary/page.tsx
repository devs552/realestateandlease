"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockDeals } from "@/lib/mock-data"
import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DailySummaryPage() {
  const today = new Date().toISOString().split("T")[0]
  const [selectedDate, setSelectedDate] = useState(today)

  const summaryByDate = useMemo(() => {
    const passDeals = mockDeals.filter((deal) => deal.status === "PASS")

    const grouped = passDeals.reduce(
      (acc, deal) => {
        if (!acc[deal.createdDate]) {
          acc[deal.createdDate] = []
        }
        acc[deal.createdDate].push(deal)
        return acc
      },
      {} as Record<string, typeof mockDeals>,
    )

    return Object.entries(grouped)
      .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
      .map(([date, deals]) => ({
        date,
        deals,
        totalPrice: deals.reduce((sum, d) => sum + d.price, 0),
        totalARV: deals.reduce((sum, d) => sum + d.arv, 0),
        avgProfit: deals.reduce((sum, d) => sum + d.profitPercent, 0) / deals.length,
      }))
  }, [])

  const selectedDaySummary = summaryByDate.find((s) => s.date === selectedDate)
  const allDates = summaryByDate.map((s) => s.date)
  const currentIndex = allDates.indexOf(selectedDate)

  const handlePreviousDay = () => {
    if (currentIndex < allDates.length - 1) {
      setSelectedDate(allDates[currentIndex + 1])
    }
  }

  const handleNextDay = () => {
    if (currentIndex > 0) {
      setSelectedDate(allDates[currentIndex - 1])
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00")
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <AdminLayout>
      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Daily Summary</h1>
          <p className="text-muted-foreground">Approved deals summary by date</p>
        </div>

        {selectedDaySummary ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousDay}
                  disabled={currentIndex >= allDates.length - 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-2xl font-bold text-foreground min-w-96">{formatDate(selectedDate)}</h2>
                <Button variant="outline" size="sm" onClick={handleNextDay} disabled={currentIndex <= 0}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Deals Approved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{selectedDaySummary.deals.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${(selectedDaySummary.totalPrice / 1000).toFixed(0)}K</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total ARV</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${(selectedDaySummary.totalARV / 1000).toFixed(0)}K</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Profit %</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">+{selectedDaySummary.avgProfit.toFixed(1)}%</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Properties Approved</CardTitle>
                <CardDescription>All deals meeting underwriting criteria for this date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Address</th>
                        <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Price</th>
                        <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">ARV</th>
                        <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Profit %</th>
                        <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">COMPs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDaySummary.deals.map((deal) => (
                        <tr key={deal.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 text-sm">{deal.address}</td>
                          <td className="text-right py-3 px-4 text-sm">${deal.price.toLocaleString()}</td>
                          <td className="text-right py-3 px-4 text-sm">${deal.arv.toLocaleString()}</td>
                          <td className="text-right py-3 px-4 text-sm font-medium text-success">
                            +{deal.profitPercent}%
                          </td>
                          <td className="text-center py-3 px-4 text-sm">{deal.comps.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="p-8">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">No approved deals for this date</p>
              <Button variant="outline" onClick={() => setSelectedDate(allDates[0])} disabled={allDates.length === 0}>
                View Latest Date
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
