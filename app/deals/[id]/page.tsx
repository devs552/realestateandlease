"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Deal } from "@/lib/types"
import { api } from "@/api"
import {
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign,
  Home,
  BarChart3,
  ArrowLeft,
  Edit2,
  Share2,
  Printer,
  Download,
  Plus,
  Minus,
  Wrench,
  Clock,
  FileText,
} from "lucide-react"
import Link from "next/link"

// Helper functions for formatting
const formatCurrency = (value: number) => {
  return Math.round(value).toLocaleString()
}

const formatPercent = (value: number) => {
  return (Math.round(value * 100) / 100).toFixed(2)
}

export default function DealDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [deal, setDeal] = useState<Deal | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "subject" | "comps" | "adjustments" | "analysis">(
    "overview"
  )

  useEffect(() => {
    setIsLoading(true)
    api<Deal>(`/api/deals/${id}`)
      .then(setDeal)
      .finally(() => setIsLoading(false))
  }, [id])

  const calculator = deal?.calculator || {}

  const purchasePrice = calculator.purchasePrice || 0
  const closingCosts = calculator.closingCosts || 0
  const holdingCosts = calculator.holdingCosts || 0
  const rehabCost =
    (calculator.rehabCostPerSqft || 0) * (deal?.subject?.squareFeet || 0)

  const realtorFees =
    ((calculator.realtorFeesPercent || 0) / 100) *
    (deal?.adjustedArv || deal?.baseArv || 0)

  const totalCosts =
    purchasePrice +
    closingCosts +
    holdingCosts +
    rehabCost +
    realtorFees

  const netProfit =
    (deal?.adjustedArv || deal?.baseArv || 0) - totalCosts

  const netProfitPercent =
    purchasePrice > 0 ? (netProfit / purchasePrice) * 100 : 0

  const profitPercent = netProfitPercent

  const profitColor =
    profitPercent >= 0
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-red-600 dark:text-red-400"

  const profitTrend =
    profitPercent >= 20
      ? "Excellent"
      : profitPercent >= 10
        ? "Good"
        : "Moderate"

  const totalAdjustment = deal?.arvAdjustments?.reduce(
    (sum: any, adj: { impactPercent: any }) => sum + (adj.impactPercent || 0),
    0
  ) || 0

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-8 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse space-y-4 w-full max-w-6xl">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!deal) {
    return (
      <AdminLayout>
        <div className="p-8 max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-8">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                  Deal Not Found
                </h3>
                <p className="text-red-700 dark:text-red-300">
                  The deal you're looking for could not be found.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  const getStatusConfig = (status: string) => {
    switch (status?.toUpperCase()) {
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

  const statusConfig = getStatusConfig(deal.status)
  const StatusIcon = statusConfig.icon

  return (
    <AdminLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Deals
        </button>

        {/* Header with Actions */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">
                  {deal.subject?.address || "N/A"}
                </h1>
              </div>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Deal ID: {id}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                title="Print"
              >
                <Printer className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                title="Share"
              >
                <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200" />
              </button>
              <Link href={`/deals/${id}/edit`}>
                <button
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                  title="Edit"
                >
                  <Edit2 className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200" />
                </button>
              </Link>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm border ${statusConfig.badgeColor}`}
            >
              <StatusIcon className="w-4 h-4" />
              {statusConfig.label}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                profitPercent >= 0
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                  : "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              {profitTrend} ROI ({formatPercent(profitPercent)}%)
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {(
              [
                "overview",
                "subject",
                "comps",
                "adjustments",
                "analysis",
              ] as const
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 font-medium transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Step Process */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                  <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4">
                    Deal Analysis Process
                  </h3>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        1
                      </div>
                      <span className="text-xs font-semibold text-center">Subject Property</span>
                    </div>
                    <div className="flex-1 h-1 bg-blue-300"></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        2
                      </div>
                      <span className="text-xs font-semibold text-center">Selected Comps</span>
                    </div>
                    <div className="flex-1 h-1 bg-blue-300"></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        3
                      </div>
                      <span className="text-xs font-semibold text-center">Base ARV</span>
                    </div>
                    <div className="flex-1 h-1 bg-blue-300"></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        4
                      </div>
                      <span className="text-xs font-semibold text-center">Adjustments</span>
                    </div>
                    <div className="flex-1 h-1 bg-blue-300"></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        5
                      </div>
                      <span className="text-xs font-semibold text-center">Final Result</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Purchase Price */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl border border-blue-200 dark:border-blue-700 p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-200 dark:bg-blue-700 rounded-lg">
                        <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-wide">
                        Purchase Price
                      </p>
                    </div>
                    <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                      ${formatCurrency(purchasePrice)}
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                      Your investment
                    </p>
                  </div>

                  {/* Base ARV */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl border border-purple-200 dark:border-purple-700 p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-200 dark:bg-purple-700 rounded-lg">
                        <Home className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <p className="text-xs font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-wide">
                        Base ARV
                      </p>
                    </div>
                    <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                      ${formatCurrency(deal.baseArv || 0)}
                    </p>
                    <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">
                      From comparable sales
                    </p>
                  </div>

                  {/* Adjustments Impact */}
                  <div
                    className={`bg-gradient-to-br ${
                      totalAdjustment >= 0
                        ? "from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800"
                        : "from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800"
                    } rounded-xl border ${
                      totalAdjustment >= 0
                        ? "border-amber-200 dark:border-amber-700"
                        : "border-orange-200 dark:border-orange-700"
                    } p-6 hover:shadow-lg transition-all`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-2 ${
                          totalAdjustment >= 0
                            ? "bg-amber-200 dark:bg-amber-700"
                            : "bg-orange-200 dark:bg-orange-700"
                        } rounded-lg`}
                      >
                        {totalAdjustment >= 0 ? (
                          <Plus
                            className={`w-5 h-5 ${
                              totalAdjustment >= 0
                                ? "text-amber-600 dark:text-amber-300"
                                : "text-orange-600 dark:text-orange-300"
                            }`}
                          />
                        ) : (
                          <Minus
                            className={`w-5 h-5 ${
                              totalAdjustment >= 0
                                ? "text-amber-600 dark:text-amber-300"
                                : "text-orange-600 dark:text-orange-300"
                            }`}
                          />
                        )}
                      </div>
                      <p
                        className={`text-xs font-semibold ${
                          totalAdjustment >= 0
                            ? "text-amber-600 dark:text-amber-300"
                            : "text-orange-600 dark:text-orange-300"
                        } uppercase tracking-wide`}
                      >
                        Adjustments
                      </p>
                    </div>
                    <p
                      className={`text-3xl font-bold ${
                        totalAdjustment >= 0
                          ? "text-amber-900 dark:text-amber-100"
                          : "text-orange-900 dark:text-orange-100"
                      }`}
                    >
                      {totalAdjustment >= 0 ? "+" : ""}{formatPercent(totalAdjustment)}%
                    </p>
                    <p
                      className={`text-xs ${
                        totalAdjustment >= 0
                          ? "text-amber-700 dark:text-amber-300"
                          : "text-orange-700 dark:text-orange-300"
                      } mt-2`}
                    >
                      Total impact on ARV
                    </p>
                  </div>

                  {/* Adjusted ARV */}
                  <div
                    className={`bg-gradient-to-br ${
                      profitPercent >= 0
                        ? "from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800"
                        : "from-red-50 to-red-100 dark:from-red-900 dark:to-red-800"
                    } rounded-xl border ${
                      profitPercent >= 0
                        ? "border-emerald-200 dark:border-emerald-700"
                        : "border-red-200 dark:border-red-700"
                    } p-6 hover:shadow-lg transition-all`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-2 ${
                          profitPercent >= 0
                            ? "bg-emerald-200 dark:bg-emerald-700"
                            : "bg-red-200 dark:bg-red-700"
                        } rounded-lg`}
                      >
                        <TrendingUp
                          className={`w-5 h-5 ${
                            profitPercent >= 0
                              ? "text-emerald-600 dark:text-emerald-300"
                              : "text-red-600 dark:text-red-300"
                          }`}
                        />
                      </div>
                      <p
                        className={`text-xs font-semibold ${
                          profitPercent >= 0
                            ? "text-emerald-600 dark:text-emerald-300"
                            : "text-red-600 dark:text-red-300"
                        } uppercase tracking-wide`}
                      >
                        Final ARV
                      </p>
                    </div>
                    <p
                      className={`text-3xl font-bold ${
                        profitPercent >= 0
                          ? "text-emerald-900 dark:text-emerald-100"
                          : "text-red-900 dark:text-red-100"
                      }`}
                    >
                      ${formatCurrency(deal.adjustedArv || deal.baseArv || 0)}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        profitPercent >= 0
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-red-700 dark:text-red-300"
                      }`}
                    >
                      {profitTrend} ROI
                    </p>
                  </div>
                </div>

                {/* Quick Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
                    Deal Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                        Profit
                      </p>
                      <p
                        className={`text-xl font-bold ${
                          profitPercent >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {formatPercent(profitPercent)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                        Profit $
                      </p>
                      <p
                        className={`text-xl font-bold ${
                          profitPercent >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        ${formatCurrency(netProfit)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                        Comps Used
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-gray-50">
                        {deal.selectedComps?.length || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                        Status
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-gray-50">
                        {deal.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUBJECT PROPERTY TAB */}
            {activeTab === "subject" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                  Subject Property Details
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Property Info */}
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
                        Property Information
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase mb-1">
                            Address
                          </p>
                          <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                            {deal.subject?.address}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase mb-1">
                            Property Type
                          </p>
                          <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                            {deal.subject?.propertyType || "Single Family"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase mb-1">
                            Year Built
                          </p>
                          <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                            {deal.subject?.yearBuilt}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Physical Specs */}
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
                        Physical Specifications
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase mb-1">
                            Square Feet
                          </p>
                          <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                            {deal.subject?.squareFeet?.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase mb-1">
                            Beds
                          </p>
                          <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                            {deal.subject?.beds}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase mb-1">
                            Baths
                          </p>
                          <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                            {deal.subject?.baths}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase mb-1">
                            Garage
                          </p>
                          <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                            {deal.subject?.hasGarage ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-700">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
                      Features & Conditions
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            deal.subject?.hasGarage ? "bg-emerald-500" : "bg-gray-300"
                          }`}
                        ></div>
                        <span className="text-sm text-blue-900 dark:text-blue-100">
                          {deal.subject?.hasGarage ? "Has Garage" : "No Garage"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            deal.subject?.isBusyStreet ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                        ></div>
                        <span className="text-sm text-blue-900 dark:text-blue-100">
                          {deal.subject?.isBusyStreet ? "Busy Street" : "Quiet Street"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SELECTED COMPS TAB */}
            {activeTab === "comps" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                    Selected Comparable Properties
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {deal.selectedComps?.length || 0} properties selected from{" "}
                    {deal.compsEvaluated?.length || 0} evaluated comps
                  </p>
                </div>

                {deal.selectedComps && deal.selectedComps.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {deal.selectedComps.map((comp: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border border-green-200 dark:border-green-700 rounded-xl p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-bold text-green-900 dark:text-green-100 mb-1">
                              Comp #{idx + 1}
                            </h4>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              {comp.address}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase">
                              Sold Price
                            </p>
                            <p className="text-xl font-bold text-green-900 dark:text-green-100">
                              ${formatCurrency(comp.soldPrice || 0)}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-green-200 dark:border-green-700">
                          <div>
                            <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase mb-1">
                              Sold
                            </p>
                            <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                              {new Date(comp.soldDate).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-green-700 dark:text-green-300">
                              {Math.floor(
                                (new Date().getTime() - new Date(comp.soldDate).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              days ago
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase mb-1">
                              Distance
                            </p>
                            <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                              {comp.distanceMiles?.toFixed(2)} mi
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase mb-1">
                              Sqft
                            </p>
                            <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                              {comp.squareFeet?.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase mb-1">
                              $/Sqft
                            </p>
                            <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                              ${formatCurrency(comp.soldPrice / (comp.squareFeet || 1))}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">
                              Beds
                            </p>
                            <p className="text-lg font-bold text-green-900 dark:text-green-100">
                              {comp.beds}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">
                              Baths
                            </p>
                            <p className="text-lg font-bold text-green-900 dark:text-green-100">
                              {comp.baths}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">
                              Year
                            </p>
                            <p className="text-lg font-bold text-green-900 dark:text-green-100">
                              {comp.yearBuilt}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                    <p className="text-yellow-800 dark:text-yellow-200">
                      No comparable properties selected
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ADJUSTMENTS TAB */}
            {activeTab === "adjustments" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                    ARV Adjustments
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Base ARV: <span className="font-semibold">${formatCurrency(deal.baseArv || 0)}</span>
                  </p>
                </div>

                {deal.arvAdjustments && deal.arvAdjustments.length > 0 ? (
                  <div className="space-y-4">
                    {deal.arvAdjustments.map((adj: any, idx: number) => (
                      <div
                        key={idx}
                        className={`border-l-4 ${
                          adj.impactPercent >= 0
                            ? "border-green-500 bg-green-50 dark:bg-green-900"
                            : "border-red-500 bg-red-50 dark:bg-red-900"
                        } rounded-lg p-4`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4
                              className={`font-semibold ${
                                adj.impactPercent >= 0
                                  ? "text-green-900 dark:text-green-100"
                                  : "text-red-900 dark:text-red-100"
                              }`}
                            >
                              {adj.rule}
                            </h4>
                            <p
                              className={`text-sm mt-1 ${
                                adj.impactPercent >= 0
                                  ? "text-green-700 dark:text-green-300"
                                  : "text-red-700 dark:text-red-300"
                              }`}
                            >
                              {adj.reason}
                            </p>
                          </div>
                          <div
                            className={`text-right font-bold text-xl ${
                              adj.impactPercent >= 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {adj.impactPercent >= 0 ? "+" : ""}{formatPercent(adj.impactPercent || 0)}%
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Adjustment Summary */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <span className="font-semibold text-gray-900 dark:text-gray-50">
                          Total Adjustment Impact
                        </span>
                        <span
                          className={`text-2xl font-bold ${
                            totalAdjustment >= 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {totalAdjustment >= 0 ? "+" : ""}{formatPercent(totalAdjustment)}%
                        </span>
                      </div>

                      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
                        <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase mb-2">
                          Calculation
                        </p>
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          Base ARV: ${formatCurrency(deal.baseArv || 0)}
                        </p>
                        <p className="text-sm text-blue-900 dark:text-blue-100 mt-1">
                          Adjustment: {totalAdjustment >= 0 ? "+" : ""}{formatPercent(totalAdjustment)}% (
                          ${formatCurrency((deal.baseArv || 0) * (totalAdjustment / 100))})
                        </p>
                        <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                          Final ARV: ${formatCurrency(deal.adjustedArv || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                    <p className="text-yellow-800 dark:text-yellow-200">
                      No adjustments applied. Final ARV equals Base ARV.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ANALYSIS TAB */}
            {activeTab === "analysis" && (
              <div className="space-y-6">
                {/* Cost Breakdown */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                      Cost Breakdown
                    </h3>
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                        5 Items
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Purchase Price */}
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          Purchase Price
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
                        ${formatCurrency(purchasePrice)}
                      </span>
                    </div>

                    {/* Closing Costs */}
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          Closing Costs
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
                        ${formatCurrency(closingCosts)}
                      </span>
                    </div>

                    {/* Holding Costs */}
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          Holding Costs
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
                        ${formatCurrency(holdingCosts)}
                      </span>
                    </div>

                    {/* Rehab Costs */}
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                          <Wrench className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          Rehab Cost
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
                        ${formatCurrency(rehabCost)}
                      </span>
                    </div>

                    {/* Realtor Fees */}
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <Home className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          Realtor Fees
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
                        ${formatCurrency(realtorFees)}
                      </span>
                    </div>

                    {/* Total Costs */}
                    <div className="mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg">
                        <span className="font-bold text-white text-lg">Total Investment</span>
                        <span className="text-3xl font-black text-white">
                          ${formatCurrency(totalCosts)}
                        </span>
                      </div>
                    </div>

                    {/* Cost Percentage */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
                      <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">
                          Purchase
                        </p>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-50">
                          {formatPercent((purchasePrice / totalCosts) * 100)}%
                        </p>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">
                          Closing
                        </p>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-50">
                          {formatPercent((closingCosts / totalCosts) * 100)}%
                        </p>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">
                          Holding
                        </p>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-50">
                          {formatPercent((holdingCosts / totalCosts) * 100)}%
                        </p>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">
                          Rehab
                        </p>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-50">
                          {formatPercent((rehabCost / totalCosts) * 100)}%
                        </p>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">
                          Realtor
                        </p>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-50">
                          {formatPercent((realtorFees / totalCosts) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Failure or Approval */}
                {Array.isArray(deal.failureReasons) && deal.failureReasons.length > 0 ? (
                  <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <h3 className="text-lg font-semibold text-red-900 dark:text-red-200">
                        Why This Deal Failed
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {deal.failureReasons.map((reason: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-red-700 dark:text-red-300"
                        >
                          <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-red-600 dark:bg-red-400" />
                          <span className="text-sm">{reason}</span>
                        </li>
                      ))}
                    </ul>

                    {deal.explainability?.rejectionExplanation && (
                      <div className="mt-6 pt-6 border-t border-red-200 dark:border-red-800">
                        <h4 className="font-semibold text-red-900 dark:text-red-200 mb-3">
                          Explanation
                        </h4>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          {deal.explainability.rejectionExplanation}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-200">
                        Deal Approved ✓
                      </h3>
                    </div>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-6">
                      This deal meets all analysis criteria and is ready to proceed.
                    </p>

                    {deal.explainability?.arvExplanation && (
                      <div className="bg-white dark:bg-emerald-900 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                          ARV Explanation
                        </h4>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300">
                          {deal.explainability.arvExplanation}
                        </p>
                      </div>
                    )}

                    {deal.explainability?.compSelectionExplanation && (
                      <div className="bg-white dark:bg-emerald-900 rounded-lg p-4">
                        <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                          Comparable Selection
                        </h4>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300">
                          {deal.explainability.compSelectionExplanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 mt-6">
          <Link href={`/deals/${id}/edit`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all">
              <Edit2 className="w-4 h-4" />
              Edit Deal
            </button>
          </Link>
          <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}