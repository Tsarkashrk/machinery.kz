"use client";

import Button from "@/6-shared/ui/Buttons/Button";
import { Input } from "@/6-shared/ui/Input/Input";
import Label from "@/6-shared/ui/Label/Label";
import TextMuted from "@/6-shared/ui/TextMuted/TextMuted";
import { PLATFORM_PAGES } from "@/6-shared/config/pages-url.config";
import { authApi } from "@/6-shared/api";
import { IAuthRegisterRequest } from "@/5-entities/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Title } from "@/6-shared/ui/Title/Title";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ICON_SIZE } from "@/6-shared/constants/constants";
import { Eye, EyeOff } from "lucide-react";

const RegisterSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const t = useTranslations("AuthPage");
  const tButton = useTranslations("Button");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IAuthRegisterRequest>({
    mode: "onChange",
  });

  const password = watch("password");

  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IAuthRegisterRequest) => authApi.register(data),
    onSuccess() {
      toast.success("Successfully registered!");
      reset();
      push(PLATFORM_PAGES.LOGIN);
    },
    onError() {
      toast.error("Registration error!", {
        description: "Make sure your credentials are valid",
      });
    },
  });

  const onSubmit: SubmitHandler<IAuthRegisterRequest> = (data) => {
    const { confirm_password, ...payload } = data;
    mutate(payload);
  };

  return (
    <section className="auth-form">
      <div className="auth-form__wrapper">
        <div className="auth-form__header">
          <Title>{t("register-title")}</Title>
          <TextMuted>{t("register-description")}</TextMuted>
        </div>
        <form className="auth-form__body" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__container">
            <div className="auth-form__credentials">
              <Label forElement="first_name">{t("register-first-name")}</Label>
              <Input
                id="first_name"
                placeholder="Alex"
                {...register("first_name", { required: "Укажите имя" })}
              />
              {errors.first_name && (
                <TextMuted color="red">{errors.first_name.message}</TextMuted>
              )}
            </div>
            <div className="auth-form__credentials">
              <Label forElement="last_name">{t("register-last-name")}</Label>
              <Input
                type="text"
                id="last_name"
                placeholder="Morro"
                {...register("last_name", { required: "Укажите фамилию" })}
              />
              {errors.last_name && (
                <TextMuted color="red">{errors.last_name.message}</TextMuted>
              )}
            </div>
          </div>

          {/* <div className="auth-form__credentials">
            <Label forElement="username">{t('register-username')}</Label>
            <Input
              id="username"
              placeholder="AlexoMor"
              {...register('username', {
                required: 'Username is required!',
              })}
            />
          </div> */}

          <div className="auth-form__credentials">
            <Label forElement="email">{t("register-email")}</Label>
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
            {errors.email && (
              <TextMuted color="red">{errors.email.message}</TextMuted>
            )}
          </div>

          <div className="auth-form__container">
            <div className="auth-form__credentials auth-form__password">
              <Label forElement="password">{t("register-password")}</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••"
                  {...register("password", {
                    required: "Введите пароль",
                    minLength: {
                      value: 6,
                      message: "Пароль должен содержать не менее 6 символов!",
                    },
                  })}
                />
                <div
                  className="auth-form__eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye size={ICON_SIZE} />
                  ) : (
                    <EyeOff size={ICON_SIZE} />
                  )}
                </div>
              </div>

              {errors.password && (
                <TextMuted color="red">{errors.password.message}</TextMuted>
              )}
            </div>

            <div className="auth-form__credentials auth-form__password">
              <Label forElement="confirm_password">
                {t("register-password-confirm")}
              </Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  placeholder="••••••"
                  {...register("confirm_password", {
                    required: "Подтвердите пароль",
                    validate: (value) =>
                      value === password || "Пароли не совпадают!",
                  })}
                />
                <div
                  className="auth-form__eye"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye size={ICON_SIZE} />
                  ) : (
                    <EyeOff size={ICON_SIZE} />
                  )}
                </div>
              </div>
              {errors.confirm_password && (
                <TextMuted color="red">
                  {errors.confirm_password.message}
                </TextMuted>
              )}
            </div>
          </div>

          <Button variant="default" isLoading={isPending}>
            {tButton("register")}
          </Button>
        </form>
        <p className="auth-form__footer">
          {t("register-to-login")}{" "}
          <Button link={PLATFORM_PAGES.LOGIN} variant="underlined">
            {tButton("login")}
          </Button>
        </p>
      </div>
    </section>
  );
};

export default RegisterSection;
