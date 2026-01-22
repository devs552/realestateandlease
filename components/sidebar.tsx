"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Building2, Calendar, Settings, Users } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/deals", label: "Deals", icon: Building2 },
  { href: "/daily-summary", label: "Daily Summary", icon: Calendar },
  { href: "/rules", label: "Rules", icon: Settings },
  { href: "/users", label: "Users", icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Real Estate Admin</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
