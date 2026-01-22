import { NextResponse } from "next/server"
import Rule from "@/models/Rule"
import { DEFAULT_RULES } from "@/lib/defaultRules"
import {connectDB} from "@/lib/db"

export async function POST() {
  await connectDB()

  const count = await Rule.countDocuments()
  if (count === 0) {
    await Rule.insertMany(DEFAULT_RULES)
  }

  return NextResponse.json({ success: true })
}
