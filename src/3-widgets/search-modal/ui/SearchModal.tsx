"use client";

import { FC, useEffect } from "react";
import { SearchFeature } from "@/4-features/search/ui/SearchFeature";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SearchModal = ({ isOpen, onClose }: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <SearchFeature placeholder="Search products" />
      </div>
    </div>
  );
};
