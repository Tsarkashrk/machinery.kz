import { useCallback, useEffect, useRef, useState } from "react";

interface WebSocketState {
  ws: WebSocket | null;
  reconnectAttempts: number;
  listeners: Map<string, Set<(data: any) => void>>;
}

const createWebSocketService = () => {
  let state: WebSocketState = {
    ws: null,
    reconnectAttempts: 0,
    listeners: new Map(),
  };

  const maxReconnectAttempts = 5;
  const reconnectInterval = 3000;
  const baseUrl = `ws://${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_WEBHOOKS_PORT}`;

  const handleMessage = (data: any) => {
    const { type, ...payload } = data;
    const listeners = state.listeners.get(type);

    if (listeners) {
      listeners.forEach((listener) => listener(payload));
    }
  };

  const reconnect = (token?: string) => {
    if (state.reconnectAttempts < maxReconnectAttempts) {
      state.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnecting... Attempt ${state.reconnectAttempts}`);
        connect(token);
      }, reconnectInterval);
    }
  };

  const connect = (token?: string) => {
    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      return;
    }

    const wsUrl = token
      ? `${baseUrl}/ws/chat/?token=${token}`
      : `${baseUrl}/ws/chat/`;

    state.ws = new WebSocket(wsUrl);

    state.ws.onopen = () => {
      console.log("WebSocket connected");
      state.reconnectAttempts = 0;
    };

    state.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    state.ws.onclose = () => {
      console.log("WebSocket disconnected");
      reconnect(token);
    };

    state.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  const subscribe = (event: string, callback: (data: any) => void) => {
    if (!state.listeners.has(event)) {
      state.listeners.set(event, new Set());
    }
    state.listeners.get(event)!.add(callback);

    return () => {
      const listeners = state.listeners.get(event);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          state.listeners.delete(event);
        }
      }
    };
  };

  const sendMessage = (data: any) => {
    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  const disconnect = () => {
    if (state.ws) {
      state.ws.close();
      state.ws = null;
    }
    state.listeners.clear();
  };

  const getReadyState = () => state.ws?.readyState;

  return {
    connect,
    subscribe,
    sendMessage,
    disconnect,
    getReadyState,
  };
};

export const wsService = createWebSocketService();
