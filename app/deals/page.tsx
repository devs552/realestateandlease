"use client"

import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Deal } from "@/lib/types"
import { api } from "@/api"
import Link from "next/link"
import {
  MoreVertical,
  Plus,
  TrendingUp,
  DollarSign,
  Home,
  Filter,
  Search,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

// Helper functions for formatting
const formatCurrency = (value: number) => {
  return Math.round(value).toLocaleString()
}

const formatPercent = (value: number) => {
  return (Math.round(value * 100) / 100).toFixed(2)
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PASS" | "FAIL">("ALL")
  const [isLoading, setIsLoading] = useState(true)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    api<Deal[]>("/api/deals")
      .then((data) => {
        setDeals(data)
        applyFilters(data, searchQuery, statusFilter)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const applyFilters = (dealsToFilter: Deal[], search: string, status: string) => {
    let filtered = dealsToFilter

    if (search.trim()) {
      filtered = filtered.filter((d) =>
        d.address?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status !== "ALL") {
      filtered = filtered.filter((d) => d.status === status)
    }

    setFilteredDeals(filtered)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(deals, query, statusFilter)
  }

  const handleStatusFilter = (status: "ALL" | "PASS" | "FAIL") => {
    setStatusFilter(status)
    applyFilters(deals, searchQuery, status)
  }

  const deleteDeal = async (id: string) => {
    if (!confirm("Are you sure you want to delete this deal?")) return
    try {
      await api(`/api/deals/${id}`, { method: "DELETE" })
      setDeals((d) => d.filter((x) => x._id !== id))
      setFilteredDeals((f) => f.filter((x) => x._id !== id))
      setOpenMenu(null)
    } catch (error) {
      console.error("Failed to delete deal:", error)
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PASS":
        return {
          color: "bg-emerald-50 dark:bg-emerald-950",
          textColor: "text-emerald-700 dark:text-emerald-300",
          borderColor: "border-emerald-200 dark:border-emerald-800",
          badgeColor: "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300",
          icon: CheckCircle2,
          label: "Approved",
        }
      case "FAIL":
        return {
          color: "bg-red-50 dark:bg-red-950",
          textColor: "text-red-700 dark:text-red-300",
          borderColor: "border-red-200 dark:border-red-800",
          badgeColor: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
          icon: AlertCircle,
          label: "Failed",
        }
      default:
        return {
          color: "bg-gray-50 dark:bg-gray-800",
          textColor: "text-gray-700 dark:text-gray-300",
          borderColor: "border-gray-200 dark:border-gray-700",
          badgeColor: "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300",
          icon: AlertCircle,
          label: status,
        }
    }
  }

  const totalValue = filteredDeals.reduce((sum, d) => sum + (d.adjustedArv || d.baseArv || 0), 0)
  const passCount = filteredDeals.filter((d) => d.status === "PASS").length
  const failCount = filteredDeals.filter((d) => d.status === "FAIL").length

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                Deals
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Manage and track all your real estate deals
              </p>
            </div>
            <Link href="/deals/new">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all">
                <Plus className="w-5 h-5" />
                New Deal
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Total Deals
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                {filteredDeals.length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Active
              </p>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {passCount}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Failed
              </p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {failCount}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Total ARV
              </p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ${formatCurrency(totalValue / 1000000)}M
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by address..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex gap-2">
              {(["ALL", "PASS", "FAIL"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    statusFilter === status
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {status === "ALL" ? "All Deals" : status === "PASS" ? "Approved" : "Failed"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className="text-center py-16">
            <Home className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
              No deals found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchQuery || statusFilter !== "ALL"
                ? "Try adjusting your filters"
                : "Create your first deal to get started"}
            </p>
            {!searchQuery && statusFilter === "ALL" && (
              <Link href="/deals/new">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Create New Deal
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => {
              const statusConfig = getStatusConfig(deal.status)
              const StatusIcon = statusConfig.icon

              // Calculate profit percentage
          const purchasePrice = deal.calculator?.purchasePrice || 0
const closingCosts = deal.calculator?.closingCosts || 0
const holdingCosts = deal.calculator?.holdingCosts || 0

const rehabCost =
  (deal.calculator?.rehabCostPerSqft || 0) *
  (deal.subject?.squareFeet || 0)

const realtorFees =
  ((deal.calculator?.realtorFeesPercent || 0) / 100) *
  (deal.adjustedArv || deal.baseArv || 0)

const totalCost =
  purchasePrice +
  closingCosts +
  holdingCosts +
  rehabCost +
  realtorFees


  const profitAmount =
  (deal.adjustedArv || deal.baseArv || 0) - totalCost
const profitPercent =
  purchasePrice > 0 ? (profitAmount / purchasePrice) * 100 : 0
              const profitColor =
                profitPercent >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"

              return (
                <div
                  key={deal._id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Card Header */}
                  <div
                    className={`${statusConfig.color} border-b ${statusConfig.borderColor} p-4 flex items-start justify-between`}
                  >
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`w-5 h-5 ${statusConfig.textColor}`} />
                      <span className={`text-sm font-semibold ${statusConfig.textColor}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === deal._id ? null : deal._id)}
                        className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-all"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      {openMenu === deal._id && (
                        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-10 min-w-[150px]">
                          <Link
                            href={`/deals/${deal._id}`}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                          >
                            <Eye className="w-4 h-4" /> View
                          </Link>

                          <button
                            onClick={() => deleteDeal(deal._id)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-950 text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {deal.subject?.address}
                    </h3>

                    {/* Metrics */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-sm">Purchase Price</span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-gray-50">
                          ${formatCurrency(deal.calculator?.purchasePrice || 0)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Home className="w-4 h-4" />
                          <span className="text-sm">ARV</span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-gray-50">
                          ${formatCurrency(deal.adjustedArv || deal.baseArv || 0)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm">Profit</span>
                        </div>
                        <span className={`font-semibold text-lg ${profitColor}`}>
                          {formatPercent(profitPercent)}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${
                            profitPercent >= 0
                              ? "from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500"
                              : "from-red-500 to-red-600 dark:from-red-400 dark:to-red-500"
                          }`}
                          style={{
                            width: `${Math.max(Math.abs(profitPercent), 10)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <Link href={`/deals/${deal._id}`} className="block">
                      <button className="w-full py-2 px-3 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900 transition-all">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}