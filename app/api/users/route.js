import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getAuthUser } from "@/lib/auth-guard";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const authUser = getAuthUser(req);
  if (!authUser || authUser.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const data = await req.json();
  data.password = await bcrypt.hash(data.password, 10);
  data.createdBy = authUser.id;

  const user = await User.create(data);
  return NextResponse.json(user, { status: 201 });
}

export async function GET(req) {
  await connectDB();
  const authUser = getAuthUser(req);
  if (!authUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const users = await User.find()
    .select("-password")
    .populate("createdBy", "fullName email");

  return NextResponse.json(users);
}
