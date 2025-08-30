import User from "../../../models/user.model";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connect from "@/db/db"; // your mongoose connection file

export async function POST(req: Request) {
  const { email, password, username } = await req.json();

  try {
    await connect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await User.hashPassword(password);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = newUser.generateJWT();

    const response = NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      secure: false, // Set true in production with HTTPS
      sameSite: "strict",
    });

    return response;
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: "Error signing up", error: err.message },
      { status: 500 }
    );
  }
}
