"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LogOut, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

export function Header() {
  const { admin, logout } = useAuth()
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle("dark")
    setIsDark(!isDark)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Welcome back</h2>
          <p className="text-sm text-muted-foreground">{admin?.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-lg">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
