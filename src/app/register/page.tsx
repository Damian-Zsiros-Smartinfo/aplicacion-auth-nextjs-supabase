"use client";
import React, { useState } from "react";
import { User } from "@/types/User";
import Form from "../components/Form";

export default function RegisterPage() {
  const [UserInfo, setUserInfo] = useState<User>({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...UserInfo,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "aplication/json"
        },
        body: JSON.stringify(UserInfo)
      });
      if (!res.ok) throw new Error();
      const { registered } = await res.json();
      if (registered) alert("Has sido registrado correctamente...");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al intentar realizar el registro.");
    }
  };
  return (
    <main className="w-full min-h-screen grid place-items-center">
      <form action="" onSubmit={onSubmit}></form>
      <Form onChange={onChange} onSubmit={onSubmit} />
    </main>
  );
}
