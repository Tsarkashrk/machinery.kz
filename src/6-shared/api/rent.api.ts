import { axiosWithAuth } from './interceptors';

const BASE_URL = '/rental-transactions';

export interface IRentEquipment {
  equipment: number;
  renter: number;
  start_date: Date;
  end_date: Date;
  total_amount: string;
  status: string;
  rental_terms: string;
  pickup_confirmed_by_owner: boolean;
  pickup_confirmed_by_renter: boolean;
  return_confirmed_by_owner: boolean;
  return_confirmed_by_renter: boolean;
  security_deposit_amount: string;
}

export interface IConfirmRentalPickup {
  confirmation_code: string;
  equipment_condition_notes: string;
  pickup_photos: string[];
}

export interface IRentalReportIssue {
  issue_type: 'equipment_damage' | string;
  description: string;
  evidence_urls: string[];
}

export interface IRentalRespondRequest {
  action: string;
  response_message: string;
}

export interface IConfirmReturn {
  equipment_condition_notes: string;
  return_photos: any;
  damage_reported: boolean;
  damage_description: string;
}

export const rentApi = {
  getRentalList: async () => {
    const response = await axiosWithAuth.post(`${BASE_URL}/`);
    return response.data;
  },

  getRentalTransaction: async (id: number) => {
    const response = await axiosWithAuth.get(`${BASE_URL}/${id}/`);
    return response.data;
  },

  rentEquipment: async (data: IRentEquipment) => {
    const response = await axiosWithAuth.post(`${BASE_URL}/`, data);
    return response.data;
  },

  updateRentalTransaction: async (id: number, data: IRentEquipment) => {
    const response = await axiosWithAuth.put(`${BASE_URL}/${id}/`, data);
    return response.data;
  },

  deleteRentalTransaction: async (id: number) => {
    const response = await axiosWithAuth.delete(`${BASE_URL}/${id}/`);
    return response.status === 204;
  },

  confirmPickup: async (id: number, data: IConfirmRentalPickup) => {
    const response = await axiosWithAuth.post(
      `${BASE_URL}/${id}/confirm-pickup/`,
      data,
    );
    return response.data;
  },

  confirmReturn: async (id: number, data: IConfirmReturn) => {
    const response = await axiosWithAuth.post(
      `${BASE_URL}/${id}/confirm-return/`,
      data,
    );
    return response.data;
  },

  reportIssue: async (id: number, data: IRentalReportIssue) => {
    const response = await axiosWithAuth.post(
      `${BASE_URL}/${id}/report-issue/`,
      data,
    );
    return response.data;
  },

  respondToRentalRequest: async (id: number, data: IRentalRespondRequest) => {
    const response = await axiosWithAuth.post(
      `${BASE_URL}/${id}/respond/`,
      data,
    );
    return response.data;
  },

  requestRental: async (data: IRentEquipment) => {
    const response = await axiosWithAuth.post(`${BASE_URL}/request/`, data);
    return response.data;
  },

  cancelRental: async (id: number) => {
    const response = await axiosWithAuth.post(`${BASE_URL}/${id}/cancel/`);
    return response.data;
  },

  myTransactions: async () => {
    const response = await axiosWithAuth.get(`${BASE_URL}/my-transactions/`);
    return response.data;
  },
};
