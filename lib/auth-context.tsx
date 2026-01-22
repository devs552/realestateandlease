"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Admin {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  admin: Admin | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
function getTokenFromStorage(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)

 const login = async (email: string, password: string) => {
  try {
    // Validate inputs
    if (!email || password.length < 6) {
      throw new Error("Invalid credentials");
    }

    // Call your login API
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Handle response
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();

    // Store token (in localStorage or cookies)
    localStorage.setItem("token", data.token);

    // Set admin user state
    setAdmin({
      id: data.user.id,
      name: data.user.fullName,
      email: data.user.email,
      role: data.user.role,
    });

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

  const logout = () => {
    setAdmin(null)
  }
 const token = getTokenFromStorage()
  return (
    <AuthContext.Provider value={{ admin, isAuthenticated: !!token, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
