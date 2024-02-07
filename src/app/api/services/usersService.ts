import { db } from "@/app/db/connection";
import { User } from "@/app/types/User";

export async function saveUser({ name, email, password, phone }: User) {
  const userExists = await getUserByEmail(email);
  if (userExists.exists) return { exists: true };
  return await db.from("users").insert({ name, email, password, phone });
}

export async function saveOTP(phone: string, code: string) {
  const data = await getUserByEmail(phone);
  const { id } = data;
  const { error: err } = await db
    .from("otp_codes")
    .insert({ id_user: id, code });
  if (err) throw new Error(`DB Error: ${err.message}`);
}

export async function isSavedUser(email: string) {
  const result = await db
    .from("users")
    .select("*", { count: "exact" })
    .eq("email", email);
  const { data } = result;
  const dataArr = data || [];
  return dataArr.length > 0;
}

export async function getUserByEmail(email: string) {
  const { data, error } = await db
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error) {
    return { error };
  }
  return data;
}

export async function getUserByPhone(phone: string) {
  const { data, error } = await db
    .from("users")
    .select("*")
    .eq("phone", `${phone}`)
    .single();
  return data;
}

export async function getOTPByPhone(phone: string) {
  const userByPhone = await getUserByPhone(phone);
  console.log(userByPhone.id);
  const { data, error: err } = await db
    .from("otp_codes")
    .select("*")
    .eq("id_user", userByPhone.id);
  if (err) throw new Error(`DB Error: ${err.message}`);
  return data[0];
}
