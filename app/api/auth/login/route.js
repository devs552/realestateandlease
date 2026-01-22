import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import { use } from "react";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  if (user.status !== "active") {
    return NextResponse.json({ message: "Account inactive" }, { status: 403 });
  }

  const match = await bcrypt.compare(password, user.password);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("pass", hashedPassword);
  console.log("hashed password",user.password);
  if (!match) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken(user);

  return NextResponse.json({
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    },
  });
}
