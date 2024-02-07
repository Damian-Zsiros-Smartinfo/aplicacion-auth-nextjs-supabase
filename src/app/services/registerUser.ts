import { User } from "@/types/User";

export async function registerUser(userInfo: User) {
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json"
      },
      body: JSON.stringify(userInfo)
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return { data };
  } catch (error) {
    return { error };
  }
}
