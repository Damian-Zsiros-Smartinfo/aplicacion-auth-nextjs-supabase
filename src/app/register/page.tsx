"use client";
import React, { useState } from "react";
import { User } from "@/types/User";
import Form from "../components/Form";
import { registerUser } from "../services/registerUser";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { push: redirect } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    const {
      data: { registered },
      error
    } = await registerUser(UserInfo);
    if (error || !registered) {
      alert("Ocurrió un error al intentar realizar el registro.");
      setIsSubmitting(false);
    }
    if (registered) {
      alert("Has sido registrado correctamente...");
      setIsSubmitting(false);
      redirect("/login");
    }
  };
  return (
    <main className="w-full min-h-screen grid place-items-center">
      <form action="" onSubmit={onSubmit}></form>
      <Form
        onChange={onChange}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}
