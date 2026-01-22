"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Edit2, Plus, Shield, AlertCircle, Loader } from "lucide-react"
import { useState, useEffect } from "react"

interface User {
  _id: string
  fullName: string
  email: string
  phone: string
  role: "admin" | "manager" | "employee"
  status: "active" | "inactive"
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "employee" as const,
    status: "active" as const,
  })

  // Fetch users on mount
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem("token")

      if (!token) {
        setError("Authentication token not found")
        setLoading(false)
        return
      }

      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          setError("Unauthorized. Please login again.")
          localStorage.removeItem("token")
          return
        }
        throw new Error("Failed to fetch users")
      }

      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users")
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const token = localStorage.getItem("token")

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
          status: formData.status,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create user")
      }

      const newUser = await response.json()
      setUsers([...users, newUser])
      setFormData({ fullName: "", email: "", phone: "", password: "", role: "employee", status: "active" })
      setIsCreating(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user")
      console.error("Create error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdate = async () => {
    if (!editingId || !formData.fullName || !formData.email || !formData.phone) return

    try {
      setIsSubmitting(true)
      setError(null)

      const token = localStorage.getItem("token")

      const response = await fetch(`/api/users/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          status: formData.status,
          ...(formData.password && { password: formData.password }),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update user")
      }

      const updatedUser = await response.json()
      setUsers(users.map((user) => (user._id === editingId ? updatedUser : user)))
      setEditingId(null)
      setFormData({ fullName: "", email: "", phone: "", password: "", role: "employee", status: "active" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user")
      console.error("Update error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

 const handleDelete = async (id: string) => {
  console.log("id ",id)
  if (!confirm("Are you sure you want to delete this user?")) return

  try {
    setError(null)

    const token = localStorage.getItem("token")

    if (!token) {
      setError("Authentication token not found. Please login again.")
      localStorage.removeItem("token")
      return
    }

    console.log("Deleting user:", id)
    console.log("Token exists:", !!token)

    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    console.log("Delete response status:", response.status)

    if (!response.ok) {
      let errorMessage = "Failed to delete user"
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch (e) {
        // Response is not JSON
        errorMessage = `Server error: ${response.statusText}`
      }
      throw new Error(errorMessage)
    }

    const responseData = await response.json()
    console.log("Delete response:", responseData)

    // Remove the deleted user from the list
    setUsers(users.filter((user) => user._id !== id))
    setError(null)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Failed to delete user"
    setError(errorMessage)
    console.error("Delete error:", err)
  }
}

  const handleEdit = (user: User) => {
    setEditingId(user._id)
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      password: "",
      role: user.role,
      status: user.status,
    })
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-destructive/20 text-destructive"
      case "manager":
        return "bg-primary/20 text-primary"
      case "employee":
        return "bg-blue-500/20 text-blue-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const resetForm = () => {
    setIsCreating(false)
    setEditingId(null)
    setFormData({ fullName: "", email: "", phone: "", password: "", role: "employee", status: "active" })
    setError(null)
  }

  return (
    <AdminLayout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground">Manage team members and permissions</p>
          </div>
          <Button
            onClick={() => {
              setIsCreating(!isCreating)
              setEditingId(null)
              setFormData({ fullName: "", email: "", phone: "", password: "", role: "employee", status: "active" })
            }}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        </div>

        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="flex gap-3 pt-6">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {(isCreating || editingId) && (
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle>{editingId ? "Edit User" : "Add New User"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Password {editingId && "(Leave empty to keep current)"}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={editingId ? "Leave empty to keep current" : "Enter password"}
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-foreground font-medium">
                    Role
                  </Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as "admin" | "manager" | "employee" })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-foreground font-medium">
                    Status
                  </Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={resetForm} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  onClick={editingId ? handleUpdate : handleCreate}
                  className="bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      {editingId ? "Updating..." : "Creating..."}
                    </>
                  ) : editingId ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage users and their roles ({users.length})</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No users found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Full Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Phone</th>
                      <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Role</th>
                      <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                      <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user?._id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-sm font-medium">{user?.fullName}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{user?.email}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{user?.phone}</td>
                        <td className="text-center py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user?.role)}`}
                          >
                            <Shield className="w-3 h-3" />
                            {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              user?.status === "active" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {user?.status.charAt(0).toUpperCase() + user?.status.slice(1)}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(user)}
                              className="text-primary hover:text-primary/80 transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="text-destructive hover:text-destructive/80 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}