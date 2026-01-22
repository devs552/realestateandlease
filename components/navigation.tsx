"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-semibold text-foreground">Underwriting System</h1>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Deals List
            </Link>
            <Link
              href="/daily-summary"
              className={`text-sm font-medium transition-colors ${
                isActive("/daily-summary") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Daily Summary
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
