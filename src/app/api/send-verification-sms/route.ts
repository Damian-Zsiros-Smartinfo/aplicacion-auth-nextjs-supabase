import { UserVerify } from "@/app/types/User";
import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, saveOTP } from "../services/usersService";
import { sendVerificationCodeSMS } from "../services/smsService";
import { generateVerificationCode } from "@/app/utils/generateVerificationCode";

export async function POST(request: NextRequest) {
  try {
    const { email }: UserVerify = await request.json();
    if (!email) throw new Error("Email is required");
    const user = await getUserByEmail(email);
    console.log(user.phone);
    const phone = user.phone;
    const codigo = generateVerificationCode();
    await saveOTP(email, codigo);
    await sendVerificationCodeSMS({ phone, codigo });
    return NextResponse.json(
      {
        message: "Codigo enviado correctamente",
        user,
        send: true
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error
      },
      { status: 500 }
    );
  }
}
