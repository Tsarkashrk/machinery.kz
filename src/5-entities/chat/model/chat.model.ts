import { IEquipment } from "@/5-entities/equipment";
import { IUser } from "@/5-entities/user";

export interface ILastMessage {
  content: string;
  sender_id: number;
  timestamp: string;
  is_read: boolean;
}

export interface IChatMessage {
  id: number;
  chat: number;
  sender_details: IUser;
  content: string;
  timestamp: string;
  is_read: boolean;
}

export interface IChatMessageRequest {
  chat: number;
  sender: number;
  content: string;
  is_read: boolean;
}

export interface IChatMessages {
  count: number;
  next: number;
  previous: number;
  results: IChatMessage[];
}

export interface IChatResponse {
  id: number;
  dealer_details: IUser;
  buyer_details: IUser;
  deal_item_details: IEquipment;
  created_at: string;
  updated_at: string;
  last_message: ILastMessage;
  messages?: IChatMessage[];
}

export interface IChatRequest {
  dealer: number;
  buyer: number;
  equipment: number;
}

export interface IChatsResponse {
  count: number;
  next: string;
  previous: string;
  results: IChatResponse[];
}
