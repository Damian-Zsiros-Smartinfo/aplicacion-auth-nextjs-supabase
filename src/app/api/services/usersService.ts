import { db } from "@/app/db/connection";
import { User } from "@/app/types/User";

export async function saveUser({ name, email, password, phone }: User) {
  return await db.from("users").insert({ name, email, password, phone });
}

export async function saveOTP(phone: string, code: string) {
  const data = await getUserByPhone(phone);
  const { id } = data;
  const { error: err } = await db
    .from("otp_codes")
    .insert({ id_user: id, code });
  if (err) throw new Error(`DB Error: ${err.message}`);
}

export async function getUserByEmail(email: string) {
  const { data, error } = await db
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function getUserByPhone(phone: string) {
  const { data, error } = await db
    .from("users")
    .select("*")
    .eq("phone", `+${phone}`)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function getOTPByPhone(phone: string) {
  const userByPhone = await getUserByPhone(phone);
  const { id } = userByPhone;
  const { data, error: err } = await db
    .from("otp_codes")
    .select("*")
    .eq("id_user", id)
    .single();
  if (err) throw new Error(`DB Error: ${err.message}`);
  return data;
}
