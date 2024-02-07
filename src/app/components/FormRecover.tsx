"use client";
import React from "react";
import Input from "./Input";
import { User } from "@/types/User";
import Link from "next/link";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  isSubmitting?: boolean | false;
}

export default function FormRecover({
  onSubmit,
  onChange,
  isSubmitting = false
}: Props) {
  return (
    <form
      method="POST"
      onSubmit={onSubmit}
      className="flex flex-col gap-4 border p-4 rounded"
    >
      <Input
        textLabel="Email"
        type="email"
        id="email"
        onChange={onChange}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? `Enviando mensaje de verificacion...`
          : `Enviar mensaje de verificacion`}
      </button>
    </form>
  );
}
