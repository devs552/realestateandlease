import { NextResponse } from "next/server"
import Deal from "@/models/Deal"
import { connectDB } from "@/lib/db"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const deal = await Deal.findById(id)
    
    if (!deal) {
      return NextResponse.json(
        { error: "Deal not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(deal)
  } catch (error) {
    console.error("GET /api/deals/[id] error:", error)
    return NextResponse.json(
      { error: "Failed to fetch deal" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()

    const deal = await Deal.findByIdAndUpdate(id, body, { 
      new: true,
      runValidators: true 
    })
    
    if (!deal) {
      return NextResponse.json(
        { error: "Deal not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(deal)
  } catch (error) {
    console.error("PATCH /api/deals/[id] error:", error)
    return NextResponse.json(
      { error: "Failed to update deal" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    
    const deal = await Deal.findByIdAndDelete(id)
    
    if (!deal) {
      return NextResponse.json(
        { error: "Deal not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, deletedId: id })
  } catch (error) {
    console.error("DELETE /api/deals/[id] error:", error)
    return NextResponse.json(
      { error: "Failed to delete deal" },
      { status: 500 }
    )
  }
}