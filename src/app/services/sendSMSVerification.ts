import { User } from "@/types/User";

export async function sendSMSVerification(email: string) {
  try {
    const res = await fetch("/api/send-verification-sms", {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json"
      },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    return { data };
  } catch (error) {
    return { data: {}, error };
  }
}
