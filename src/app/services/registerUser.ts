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
    const data = await res.json();
    console.log(data);
    return { data };
  } catch (error) {
    return { data: { registered: false, exists: false }, error };
  }
}
