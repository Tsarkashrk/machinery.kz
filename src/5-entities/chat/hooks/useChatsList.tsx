"use client";

import { chatApi } from "@/6-shared/api/chats.api";
import { useQuery } from "@tanstack/react-query";

export const useChatsList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["chats"],
    queryFn: () => chatApi.getChats(),
  });

  return {
    chatList: data,
    isLoading,
    error,
  };
};
