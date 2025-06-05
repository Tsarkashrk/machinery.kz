"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { ICON_SIZE } from "@/6-shared/constants/constants";
import { authApi } from "@/6-shared/api";
import Button from "./Button";
import { PLATFORM_PAGES } from "@/6-shared/config/pages-url.config";
import { useTranslations } from "next-intl";

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const t = useTranslations("Button");

  const { mutate, isPending } = useMutation<void, Error>({
    mutationKey: ["logout"],
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["profile"], null);
      queryClient.removeQueries({ queryKey: ["profile"] });
      router.push(PLATFORM_PAGES.HOME);
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return (
    <div className="logout">
      <Button
        variant="danger"
        icon={<LogOut size={ICON_SIZE} />}
        onClick={() => mutate()}
        isLoading={isPending}
      >
        {isPending ? "Logging out..." : t("logout")}
      </Button>
    </div>
  );
}
