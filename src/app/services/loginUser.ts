import { UserLoginInfo } from "@/types/User";

export async function loginUser(userInfo: UserLoginInfo) {
  try {
    const res = await fetch("/api/login", {
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
