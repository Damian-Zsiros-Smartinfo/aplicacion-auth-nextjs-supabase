import { db } from "@/app/db/connection";
import { User, UserVerify } from "@/app/types/User";
import { NextRequest, NextResponse } from "next/server";
import { getOTPByPhone, getUserByPhone } from "../services/usersService";
import bcrypt from "bcryptjs";
interface OTPVerification extends Partial<User> {
  code: string;
}

export async function POST(request: NextRequest) {
  try {
    const { phone, code, password }: OTPVerification = await request.json();
    if (!phone || !code || !password)
      throw new Error("Phone and Code is required");
    const data = await getOTPByPhone(phone);
    const { id_user: id, code: codeReal }: { id_user: string; code: string } =
      data;
    if (codeReal != code) {
      return NextResponse.json(
        {
          verified: false,
          error: {
            message: "Invalid Code"
          }
        },
        { status: 400 }
      );
    }
    const { error: e } = await db.from("otp_codes").delete().eq("id_user", id);
    if (!process.env.SALT_ENCRYPT_PASSWORDS) throw new Error();
    const salt = bcrypt.genSaltSync(
      parseInt(process.env.SALT_ENCRYPT_PASSWORDS)
    );
    const passwordHashed = bcrypt.hashSync(password, salt);
    console.log(id);
    const { error: er } = await db
      .from("users")
      .update({ password: passwordHashed })
      .eq("id", id);

    if (er) throw new Error(`DB Error: ${er.message}`);
    return NextResponse.json(
      {
        message: "Telefono validado correctamente...",
        verified: true
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      {
        verified: false,
        error: {
          message: err.message
        }
      },
      { status: 500 }
    );
  }
}
