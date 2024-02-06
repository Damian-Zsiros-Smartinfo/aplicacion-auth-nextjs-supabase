import { db } from "@/app/db/connection";
import { User, UserVerify } from "@/app/types/User";
import { NextRequest, NextResponse } from "next/server";

interface OTPVerification extends Partial<User> {
  code: string;
}

export async function POST(request: NextRequest) {
  try {
    const { phone, code }: OTPVerification = await request.json();
    if (!phone || !code) throw new Error("Phone and Code is required");
    const {
      data: { id },
      error,
    } = await db.from("users").select("*").eq("phone", `+${phone}`).single();
    if (error) throw new Error(`DB Error: ${error.message}`);
    const { data, error: err } = await db
      .from("otp_codes")
      .select("*")
      .eq("id_user", id)
      .single();
    if (err) throw new Error(`DB Error: ${err.message}`);
    const { code: codeReal }: { code: string } = data;
    if (codeReal != code) {
      return NextResponse.json(
        {
          verified: false,
          error: {
            message: "Invalid Code",
          },
        },
        { status: 400 }
      );
    }
    const { error: e } = await db.from("otp_codes").delete().eq("id_user", id);
    if (e) throw new Error(`DB Error: ${e.message}`);
    return NextResponse.json(
      {
        message: "Telefono validado correctamente...",
        verified: true,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      {
        verified: false,
        error: {
          message: err.message,
        },
      },
      { status: 500 }
    );
  }
}
