"use client";
import React, { useState } from "react";
import Form from "../components/FormRecover";
import FormVerify from "../components/FormCheckVerify";
import { useRouter } from "next/navigation";
import { OTP, UserVerify } from "../types/User";
import { sendSMSVerification } from "../services/sendSMSVerification";
import { checkSMSCode } from "../services/checkSMSCode";

export default function RecoverPasswordPage() {
  const [hasSendCode, sethasSendCode] = useState(false);
  const { push: redirect } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [UserInfo, setUserInfo] = useState<OTP>({
    email: "",
    code: "",
    password: ""
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
    if (!UserInfo.email) return alert("Please enter your email and your phone");
    const { data, error } = await sendSMSVerification(UserInfo.email);
    if (error) return alert("Ocurrio un error");
    setUserInfo({
      ...UserInfo,
      phone: data.user.phone
    });
    alert(data.message);
    sethasSendCode(true);
    setIsSubmitting(false);
  };

  const onSubmitVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!UserInfo.email || !UserInfo.phone || !UserInfo.password)
      return alert("Please enter your datas obligatory");
    const { data, error } = await checkSMSCode(
      UserInfo.phone,
      UserInfo.code,
      UserInfo.password
    );
    const errorObj = error as { message?: string };
    if (error) {
      alert(errorObj?.message);
    } else {
      alert(data.message);
      setIsSubmitting(false);
      redirect("/login");
    }
  };
  return (
    <main className="w-full min-h-screen grid place-items-center">
      {hasSendCode ? (
        <>
          <FormVerify
            onChange={onChange}
            onSubmit={onSubmitVerify}
            isSubmitting={isSubmitting}
          />
        </>
      ) : (
        <>
          <Form
            onChange={onChange}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </>
      )}
    </main>
  );
}
