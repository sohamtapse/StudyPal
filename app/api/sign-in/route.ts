import { NextResponse } from "next/server";
import connect from "@/db/db"; // your mongoose connection file
import User from "../../../models/user.model";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    await connect();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isValid = await user.isValidPassword(password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = user.generateJWT();

    const response = NextResponse.json(
      { message: "Signed in successfully" },
      { status: 200 }
    );

    // ✅ set cookie in Next.js
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // stays false in dev
      maxAge: 24 * 60 * 60, // 1 day (seconds, not ms)
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error signing in", error: err.message },
      { status: 500 }
    );
  }
}
