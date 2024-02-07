import { UserWithoutId } from "@/app/types/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  getUserByEmail,
  isSavedUser,
  saveUser
} from "../services/usersService";

export async function POST(request: NextRequest) {
  try {
    const { email, name, password, phone } = await request.json();
    const userData: UserWithoutId = { email, name, password, phone };
    const isSavedUserActual = await isSavedUser(userData.email);
    if (isSavedUserActual)
      return NextResponse.json(
        {
          registered: false,
          exists: isSavedUserActual,
          error: {
            message: "Email ya registrado. Intentelo de nuevo."
          }
        },
        { status: 400 }
      );
    if (!process.env.SALT_ENCRYPT_PASSWORDS) throw new Error();
    const salt = bcrypt.genSaltSync(
      parseInt(process.env.SALT_ENCRYPT_PASSWORDS)
    );
    const passwordHashed = bcrypt.hashSync(password, salt);
    await saveUser({ name, email, password: passwordHashed, phone });
    return NextResponse.json({
      registered: true,
      user: userData
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        registered: false,
        error
      },
      { status: 500 }
    );
  }
}
