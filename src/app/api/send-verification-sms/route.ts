import { db } from "@/app/db/connection";
import { UserVerify } from "@/app/types/User";
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { getUserByPhone, saveOTP } from "../services/usersService";
import { sendVerificationCodeSMS } from "../services/smsService";
import { generateVerificationCode } from "@/app/utils/generateVerificationCode";

export async function POST(request: NextRequest) {
  try {
    const { phone }: UserVerify = await request.json();
    if (!phone) throw new Error("Phone is required");
    const codigo = generateVerificationCode();
    await saveOTP(phone, codigo);
    await sendVerificationCodeSMS({ phone, codigo });
    return NextResponse.json(
      {
        message: "Codigo enviado correctamente",
        send: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
