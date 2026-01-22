"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { api } from "@/api"
import { Deal } from "@/lib/types"
import {
  ArrowLeft,
  Home,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Loader,
} from "lucide-react"
import Link from "next/link"

export default function EditDealPage() {
  const { id } = useParams()
  const router = useRouter()

  const [deal, setDeal] = useState<Deal | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [changes, setChanges] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    address: "",
    purchasePrice: 0,
  })

  useEffect(() => {
    api<Deal>(`/api/deals/${id}`)
      .then((data) => {
        setDeal(data)
        setFormData({
          address: data.address,
          purchasePrice: data.purchasePrice,
        })
      })
      .catch(() => setError("Failed to load deal"))
      .finally(() => setIsLoading(false))
  }, [id])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setChanges(true)
    setSuccess(false)
  }

  const validateForm = () => {
    if (!formData.address.trim()) {
      setError("Address is required")
      return false
    }
    if (formData.purchasePrice <= 0) {
      setError("purchasePrice must be greater than 0")
      return false
    }
    setError(null)
    return true
  }

  const updateDeal = async () => {
    if (!validateForm()) return

    setIsSaving(true)
    setError(null)

    try {
      await api(`/api/deals/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          address: formData.address,
          purchasePrice: formData.purchasePrice,
        }),
      })

      setSuccess(true)
      setChanges(false)

      // Redirect after success
      setTimeout(() => {
        router.push("/deals")
      }, 1500)
    } catch (err) {
      setError("Failed to update deal. Please try again.")
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-8 max-w-2xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!deal) {
    return (
      <AdminLayout>
        <div className="p-8 max-w-2xl mx-auto">
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                Deal Not Found
              </h3>
              <p className="text-red-700 dark:text-red-300 mb-4">
                The deal you're trying to edit could not be found. It may have been deleted.
              </p>
              <Link href="/deals">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Back to Deals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-2xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Edit Deal
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Update the details for this property investment
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="space-y-6">
            {/* Address Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-4 h-4 text-gray-500" />
                  Property Address
                </div>
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="e.g., 123 Main Street, Springfield, IL 62701"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Enter the complete property address
              </p>
            </div>

            {/* purchasePrice Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  Purchase purchasePrice
                </div>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">
                  $
                </span>
                <input
                  type="number"
                  value={formData?.purchasePrice}
                  onChange={(e) =>
                    handleInputChange("purchasePrice", Number(e.target.value))
                  }
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                The amount you paid or plan to pay for this property
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                  Deal updated successfully! Redirecting...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={updateDeal}
            disabled={!changes || isSaving}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
          <button
            onClick={() => router.back()}
            disabled={isSaving}
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
          >
            Cancel
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            Need Help?
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Make sure to enter accurate information. All changes will be saved to your deal
            record and reflected in your analysis.
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}