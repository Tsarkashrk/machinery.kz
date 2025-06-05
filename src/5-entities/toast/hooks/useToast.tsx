import { showToast } from "@/6-shared/ui/Toast/Toast";
import Button from "@/6-shared/ui/Buttons/Button";
import { ReactElement } from "react";

export const useToast = () => {
  const showSuccess = (message: string, description?: string) => {
    showToast.success(message, description);
  };

  const showError = (message: string, description?: string) => {
    showToast.error(message, description);
  };

  const showWarning = (message: string, description?: string) => {
    showToast.warning(message, description);
  };

  const showInfo = (message: string, description?: string) => {
    showToast.info(message, description);
  };

  const showWithAction = (
    title: string,
    description: string,
    actionLabel: string,
    onAction: () => void,
    type: "success" | "error" | "warning" | "info" = "info",
  ) => {
    const actionButton = <button onClick={onAction}>{actionLabel}</button>;

    showToast.withAction(title, description, actionButton, type);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showWithAction,
  };
};
