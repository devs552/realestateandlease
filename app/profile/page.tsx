"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Mail, User, Shield, Calendar } from "lucide-react"

export default function ProfilePage() {
  const { admin, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <AdminLayout>
      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your admin account</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p className="text-lg font-semibold text-foreground">{admin?.name}</p>
              <p className="text-sm text-muted-foreground">{admin?.role}</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your admin account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-border rounded-lg flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">Email Address</p>
                  <p className="font-medium text-foreground">{admin?.email}</p>
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">Access Level</p>
                  <p className="font-medium text-foreground">Full Administrator</p>
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">Account Created</p>
                  <p className="font-medium text-foreground">December 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>Your administrative privileges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                "View all deals and properties",
                "Access deal details and analysis",
                "Generate daily summaries",
                "View underwriting rules",
                "Manage admin account settings",
              ].map((permission, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2">
                  <div className="w-5 h-5 rounded border-2 border-success bg-success/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-success" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-foreground">{permission}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Session & Logout</CardTitle>
            <CardDescription>Manage your current session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You are currently logged in to the Real Estate Admin system. Click below to log out of your account.
              </p>
              <Button variant="destructive" onClick={handleLogout} className="w-full">
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
