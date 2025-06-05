"use client";

import { usePasswordReset } from "@/5-entities/auth";
import Button from "@/6-shared/ui/Buttons/Button";
import { Input } from "@/6-shared/ui/Input/Input";
import { SubmitHandler, useForm } from "react-hook-form";

interface IResetPassword {
  email: string;
}

export const ResetPasswordSection = () => {
  const { mutate } = usePasswordReset();

  const { register, handleSubmit } = useForm<IResetPassword>();

  const onSubmit = async (data: IResetPassword) => {
    mutate(data.email);
  };

  return (
    <section className="reset-password">
      <div className="reset-password__wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            id="email"
            placeholder="mchnry@ex.com"
            {...register("email", {
              required: "Введите почту",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Неверный формат!",
              },
            })}
          />
          <Button>Отправить</Button>
        </form>
      </div>
    </section>
  );
};
