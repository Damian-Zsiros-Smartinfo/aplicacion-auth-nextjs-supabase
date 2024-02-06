import { db } from "@/app/db/connection";
import { UserVerify, UserWithoutId } from "@/app/types/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const userData: UserVerify = { email, password };
    const { data, error } = await db
      .from("users")
      .select("*")
      .eq("email", userData.email)
      .single();
    if (error) throw new Error(error.message);
    if (!userData.password) throw new Error("Password is required");
    if (!(await bcrypt.compareSync(userData.password, data?.password)))
      return NextResponse.json(
        {
          logued: false,
          error: {
            message: "Invalid credentials",
          },
        },
        { status: 403 }
      );
    return NextResponse.json({
      logued: true,
      user: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        logued: false,
        error,
      },
      { status: 500 }
    );
  }
}
