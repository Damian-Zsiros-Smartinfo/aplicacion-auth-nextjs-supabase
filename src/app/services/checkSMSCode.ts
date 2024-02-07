import { User } from "@/types/User";

export async function checkSMSCode(
  phone: string,
  code: string,
  password: string
) {
  try {
    const res = await fetch("/api/check-sms-code", {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json"
      },
      body: JSON.stringify({ phone, code, password })
    });
    const data = await res.json();
    return { data };
  } catch (error) {
    return { data: {}, error };
  }
}
