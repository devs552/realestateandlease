"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { api } from "@/api"
import {
  Home,
  DollarSign,
  Zap,
  AlertCircle,
  CheckCircle2,
  Loader,
  ArrowLeft,
  Info,
  Building2,
} from "lucide-react"

export default function NewDealPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    address: "",
    purchasePrice: 0,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const isFormValid = form.address.trim() && form.purchasePrice > 0

  const handleInputChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const validateForm = () => {
    if (!form.address.trim()) {
      setError("Property address is required")
      return false
    }
    if (form.purchasePrice <= 0) {
      setError("Purchase price must be greater than $0")
      return false
    }
    setError(null)
    return true
  }

  const submit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    setError(null)

    console.log("📤 === SUBMIT DEBUG ===")
    console.log("Address:", form.address)
    console.log("Purchase Price:", form.purchasePrice)

    const payload = {
      address: form.address,
      purchasePrice: form.purchasePrice,
    }

    console.log("📦 Payload being sent:")
    console.log(JSON.stringify(payload, null, 2))
 

  try {
  const response = await api("/api/deals", {
    method: "POST",
    body: JSON.stringify(payload),
  }) as any

  console.log("📥 Response:", response)

  if (response?.status === "DEUPLICATE") {
    setError(response?.message || "This property has already been added")
    setIsSubmitting(false)
    return
  }

  if (response) {
    router.push("/deals")
  }
  
} catch (err: any) {
  const errorMsg = err.status ||  "Failed to create deal. Please try again."
  setError(errorMsg)
  console.error(err)
  setIsSubmitting(false)
}
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Deals
          </button>
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900">
              <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                Create a New Deal
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your property details for analysis
              </p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="space-y-6">
            {/* Address Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  Property Address
                  <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                onFocus={() => setFocusedField("address")}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g., 123 Market Street, Denver, CO 80204"
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  focusedField === "address"
                    ? "border-blue-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Include the street address, city, state, and ZIP code
              </p>
            </div>

            {/* Price Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  Purchase Price
                  <span className="text-red-500">*</span>
                </div>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">
                  $
                </span>
                <input
                  type="number"
                  value={form.purchasePrice || ""}
                  onChange={(e) =>
                    handleInputChange("purchasePrice", Number(e.target.value) || 0)
                  }
                  onFocus={() => setFocusedField("purchasePrice")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="250000"
                  className={`w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    focusedField === "purchasePrice"
                      ? "border-blue-500"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                The total amount you paid or plan to pay for this property
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Form Summary */}
            {isFormValid && (
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-green-900 dark:text-green-200 mb-2">
                      Ready to analyze this deal?
                    </p>
                    <ul className="text-green-700 dark:text-green-300 space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                        Address: {form.address}
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                        Price: ${form.purchasePrice.toLocaleString()}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={submit}
            disabled={!isFormValid || isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Creating & Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Create & Evaluate
              </>
            )}
          </button>
          <button
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
          >
            Cancel
          </button>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              What Happens Next
            </h3>
            <ul className="text-sm text-emerald-700 dark:text-emerald-300 space-y-2">
              <li>✓ Deal is created in your portfolio</li>
              <li>✓ Property data is analyzed</li>
              <li>✓ ROI calculations are performed</li>
              <li>✓ Evaluation results are saved</li>
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Quick Tips
            </h3>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
              <li>• Be as accurate as possible</li>
              <li>• Include full address details</li>
              <li>• Use your actual purchase price</li>
              <li>• You can view results on deals page</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}