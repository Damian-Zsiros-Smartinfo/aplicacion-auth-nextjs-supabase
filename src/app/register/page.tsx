"use client";
import React, { useState } from "react";
import { User } from "@/types/User";
import Form from "../components/Form";
import { registerUser } from "../services/registerUser";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { push: redirect } = useRouter();
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
    const {
      data: { registered },
      error
    } = await registerUser(UserInfo);
    if (error || !registered)
      alert("Ocurrió un error al intentar realizar el registro.");
    if (registered) {
      alert("Has sido registrado correctamente...");
      redirect("/login");
    }
  };
  return (
    <main className="w-full min-h-screen grid place-items-center">
      <form action="" onSubmit={onSubmit}></form>
      <Form onChange={onChange} onSubmit={onSubmit} />
    </main>
  );
}
