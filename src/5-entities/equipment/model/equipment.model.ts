import { IBrand } from "@/5-entities/brand/model/brand.model";
import { ICategory } from "@/5-entities/category";

interface IEquipmentBase {
  name: string;
  description: string;
  daily_rental_rate: string;
  purchase_price: string;
  manufacturer: string;
  model: string;
  year: number;
  condition: string;
  owner: number;
  available_for_rent: boolean;
  available_for_sale: boolean;
  location_city: string;
  location_address: string;
}

export interface IEquipmentResponse {
  count: number;
  next: string;
  previous: string;
  results: IEquipment[];
}

export interface IImage {
  id: number;
  equipment: number;
  image_url: string;
  image_type: string;
  uplaoded_at: string;
}

export interface IEquipment extends IEquipmentBase {
  id: number;
  category_details: ICategory;
  brand_details: IBrand;
  status: string;
  images: IImage[];
  created_at: string;
}

export interface IEquipmentRequest extends IEquipmentBase {
  category: number;
  brand: number;
}

export interface IEquipmentWithImage extends IEquipment {
  image: string;
}
