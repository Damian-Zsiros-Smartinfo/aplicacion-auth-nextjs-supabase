import { db } from "@/app/db/connection";
import { UserWithoutId } from "@/app/types/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
    try {
        const { email, name, password, phone } = await request.json()
        const userData: UserWithoutId = { email, name, password, phone }
        if(!process.env.SALT_ENCRYPT_PASSWORDS) throw new Error() 
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ENCRYPT_PASSWORDS));
        const passwordHashed = bcrypt.hashSync(password, salt);
        await db.from('users').insert({ name, email, password: passwordHashed, phone })
        return NextResponse.json({
            logued: true,
            user: userData
        })
    } catch (error) {
        return NextResponse.json({
            logued: false,
            error
        }, { status: 500 })

    }
}