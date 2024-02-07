"use client";
import React, { useState } from "react";
import { User } from "@/types/User";
import Form from "../components/FormRegister";
import { registerUser } from "../services/registerUser";
import { useRouter } from "next/navigation";
import { isSavedUser } from "../api/services/usersService";

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
    const { data, error } = await registerUser(UserInfo);
    const statusRegister = data?.registered || false;
    if (data.exists == true) {
      alert("Ya hay otro usuario con ese email. Intenta con otro email");
      return setIsSubmitting(false);
    }
    if (error) {
      alert(
        "Ocurrió un error al intentar realizar el registro. Pruebe con otro correo electronico o si persiste contacte con el administrador."
      );
      setIsSubmitting(false);
    }
    if (statusRegister) {
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
