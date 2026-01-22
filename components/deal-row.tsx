"use client"

import Link from "next/link"
import type { Deal } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

interface DealRowProps {
  deal: Deal
}

export function DealRow({ deal }: DealRowProps) {
  return (
    <tr className="border-t border-border hover:bg-muted/50 transition-colors">
      <td className="px-6 py-4 text-sm text-foreground font-medium">{deal.address}</td>
      <td className="px-6 py-4 text-sm text-foreground">${deal.price.toLocaleString()}</td>
      <td className="px-6 py-4 text-sm text-foreground">${deal.arv.toLocaleString()}</td>
      <td className="px-6 py-4 text-sm">
        <span className={`font-semibold ${deal.profitPercent >= 0 ? "text-green-600" : "text-red-600"}`}>
          {deal.profitPercent > 0 ? "+" : ""}
          {deal.profitPercent.toFixed(1)}%
        </span>
      </td>
      <td className="px-6 py-4 text-sm">
        <span
          className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
            deal.status === "PASS"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
          }`}
        >
          {deal.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm">
        <Link href={`/deal/${deal.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </td>
    </tr>
  )
}
