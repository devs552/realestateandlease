import { connectDB } from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import { getAuthUser } from "@/lib/auth-guard"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  try {
    // Await params in newer Next.js versions
    const { id } = await params

    await connectDB()
    const authUser = getAuthUser(req)

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user = await User.findById(id).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      _id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    })
  } catch (error) {
    console.error("GET error:", error)
    return NextResponse.json({ message: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    // Await params in newer Next.js versions
    const { id } = await params
    console.log("PUT /api/users/[id] called with ID:", id)

    await connectDB()
    const authUser = getAuthUser(req)

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (authUser.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()

    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const currentUser = await User.findById(id)
    if (!currentUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    if (body.email !== currentUser.email) {
      const existingUser = await User.findOne({ email: body.email })
      if (existingUser) {
        return NextResponse.json({ message: "Email already exists" }, { status: 409 })
      }
    }

    if (body.password && body.password.trim()) {
      body.password = await bcrypt.hash(body.password, 10)
    } else {
      delete body.password
    }

    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
    }).select("-password")

    return NextResponse.json({
      _id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    })
  } catch (error) {
    console.error("PUT error:", error)
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    // Await params in newer Next.js versions
    const { id } = await params
    console.log("DELETE /api/users/[id] called with ID:", id)

    await connectDB()
    const authUser = getAuthUser(req)

    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (authUser.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const user = await User.findById(id)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    await User.findByIdAndDelete(id)
    console.log("User deleted successfully:", id)

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json({ message: "Failed to delete user", error: error.message }, { status: 500 })
  }
}