"use client";

import { useForm } from "react-hook-form";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "@/6-shared/ui/Modal/Modal";
import { useEffect } from "react";
import { EnumUserRoles, IUser, IUserRequest } from "@/5-entities/user";
import { IUserUpdateRole } from "@/5-entities/admin";
import CustomDropdown from "@/6-shared/ui/Dropdown/Dropdown";

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
  onSave: (data: IUserUpdateRole) => Promise<void>;
  isLoading?: boolean;
}

export const UpdateUserModal = ({
  isOpen,
  onClose,
  user,
  onSave,
  isLoading = false,
}: UpdateUserModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IUserUpdateRole>({});

  useEffect(() => {
    if (user) {
      reset({
        user_role: user.user_role || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (user: IUserUpdateRole) => {
    await onSave(user);
    handleClose();
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      reset();
    }
  };

  const roles = [
    {
      id: 0,
      title: "Admin",
      value: EnumUserRoles.admin,
      name: EnumUserRoles.admin,
    },
    {
      id: 1,
      title: "Moderator",
      value: EnumUserRoles.moderator,
      name: EnumUserRoles.moderator,
    },
    {
      id: 2,
      title: "User",
      value: EnumUserRoles.user,
      name: EnumUserRoles.user,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      closeOnOverlayClick={!isLoading}
    >
      <ModalHeader>
        <h2>{user ? "Редактировать пользователя" : "Создать компанию"}</h2>
      </ModalHeader>

      <ModalContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-form"
          id="user-form"
        >
          <div className="form-grid form-grid--cols-2">
            <div className="form-group">
              <label className="form-label form-label--required">
                Название пользователя
              </label>
              <CustomDropdown
                control={control}
                {...register("user_role")}
                options={roles}
              />
              {errors.user_role && (
                <div className="form-error">{errors.user_role.message}</div>
              )}
            </div>

            {errors.user_role && (
              <div className="form-error">{errors.user_role.message}</div>
            )}
          </div>
        </form>
      </ModalContent>

      <ModalFooter>
        <button
          type="button"
          onClick={handleClose}
          disabled={isLoading}
          className="modal-btn modal-btn--outline"
        >
          Отмена
        </button>
        <button
          type="submit"
          form="user-form"
          disabled={isLoading}
          className="modal-btn modal-btn--primary"
        >
          {isLoading ? "Сохранение..." : "Сохранить"}
        </button>
      </ModalFooter>
    </Modal>
  );
};
