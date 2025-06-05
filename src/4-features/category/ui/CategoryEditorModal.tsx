"use client";

import { useForm } from "react-hook-form";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "@/6-shared/ui/Modal/Modal";
import { useEffect } from "react";
import { ICategory, ICategoryRequest } from "@/5-entities/category";
import InputFile from "@/6-shared/ui/Input/InputFile";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ICategory | null;
  onSave: (data: FormData) => Promise<void>;
  isLoading?: boolean;
}

export const CategoryEditorModal = ({
  isOpen,
  onClose,
  item,
  onSave,
  isLoading = false,
}: CreateCategoryModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategoryRequest>({});

  useEffect(() => {
    if (item) {
      reset({
        name: item.name || "",
        description: item.description || "",
        file: item.file || null,
        parent_category: item.parent_category || null,
      });
    }
  }, [item, reset]);

  const onSubmit = async (data: ICategoryRequest) => {
    const formData = new FormData();

    console.log(formData);

    formData.append("name", data.name);
    formData.append("description", data.description);

    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

    if (data.file instanceof File) {
      formData.append("file", data.file);
    }

    formData.append("parent_category", data.parent_category || "");

    await onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      reset();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      closeOnOverlayClick={!isLoading}
    >
      <ModalHeader>
        <h2>{item ? "Редактировать категорию" : "Создать категорию"}</h2>
      </ModalHeader>

      <ModalContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-form"
          id="company-form"
        >
          <div className="form-grid form-grid--cols-2">
            <div className="form-group">
              <label className="form-label form-label--required">
                Название категории
              </label>
              <input
                {...register("name", { required: "Название обязательно" })}
                className={`form-input ${errors.name ? "form-input--error" : ""}`}
                disabled={isLoading}
                placeholder="Введите название компании"
              />
              {errors.name && (
                <div className="form-error">{errors.name.message}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Описание</label>
              <input
                {...register("description")}
                className="form-input"
                disabled={isLoading}
                placeholder="Введите адрес"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Изображение</label>
              <InputFile {...register("file")} />
            </div>
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
          form="company-form"
          disabled={isLoading}
          className="modal-btn modal-btn--primary"
        >
          {isLoading ? "Сохранение..." : "Сохранить"}
        </button>
      </ModalFooter>
    </Modal>
  );
};
