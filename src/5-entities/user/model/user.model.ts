export enum EnumUserRoles {
  'admin' = 'admin',
  'user' = 'user',
  'moderator' = 'moderator',
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  is_verified: boolean;
  date_joined: string;
  user_role: EnumUserRoles;
  image_url: string;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  iin: any;
  trust_score: number;
  successful_rentals_as_renter: number;
  successful_rentals_as_owner: number;
  successful_purchases_as_buyer: number;
  successful_purchases_as_seller: number;
  total_transactions: string;
}

export interface IUserRequest {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  file: File | string;
}
