import { NextResponse } from "next/server"
import Rule from "@/models/Rule"
import {connectDB} from "@/lib/db"

export async function GET() {
  await connectDB()
  const rules = await Rule.find().sort({ engine: 1 })
  return NextResponse.json(rules)
}
