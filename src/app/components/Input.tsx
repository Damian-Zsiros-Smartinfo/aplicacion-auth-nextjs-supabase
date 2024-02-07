import React from "react";

interface Props {
  id?: string;
  textLabel: string;
  type: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
  textLabel,
  type,
  required,
  id = "",
  onChange
}: Props) {
  return (
    <div className="">
      <label
        htmlFor={id}
        className="w-full flex items-center justify-center gap-4 [&>input]:w-fit [&>input]:border [&>input]:outline-none"
      >
        <span>
          {textLabel} {required ? "*" : ""}
        </span>
        <input
          className="p-1"
          type={type}
          onChange={onChange}
          id={id}
          name={id}
          required={required}
        />
      </label>
    </div>
  );
}
