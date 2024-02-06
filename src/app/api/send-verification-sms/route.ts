import { db } from "@/app/db/connection";
import { UserVerify } from "@/app/types/User";
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: NextRequest) {
  try {
    const { phone }: UserVerify = await request.json();
    if (!phone) throw new Error("Phone is required");
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    if (!accountSid || !authToken)
      throw new Error("Invalid Twilio Credentials");
    const client = twilio(accountSid, authToken);
    const codigo = Math.round(Math.random() * 1000000).toString();
    const {
      data: { id },
      error,
    } = await db.from("users").select("*").eq("phone", `+${phone}`).single();
    if (error) throw new Error(`DB Error: ${error.message}`);
    const { error: err } = await db
      .from("otp_codes")
      .insert({ id_user: id, code: codigo });
    if (err) throw new Error(`DB Error: ${err.message}`);
    client.messages.create({
      body: `Aqui esta tu codigo de verificacion:  ${codigo}`,
      from: "+15735383546",
      to: `+${phone}`,
    });
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
