import { axiosWithAuth } from './interceptors';

const BASE_URL = '/purchase-transactions';

export interface ICompletePurchase {
  final_condition_notes: string;
  satisfaction_rating: number;
}

export interface IConfirmPurchasePickup {
  equipment_condition_notes: string;
  pickup_photos: string[];
}

export interface IReportIssue {
  issue_type: 'equipment_damage' | string;
  description: string;
  evidence_urls: string[];
}

export interface IPurchaseRespondRequest {
  action: string;
  response_message: string;
  inspection_period_days: number;
}

export const purchaseApi = {
  getAll: async (params?: {
    page?: number;
    search?: string;
    ordering?: string;
  }) => {
    const response = await axiosWithAuth.get(BASE_URL + '/', { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosWithAuth.get(`${BASE_URL}/${id}/`);
    return response.data;
  },

  completePurchase: async (id: number, data: ICompletePurchase) => {
    const response = await axiosWithAuth.post(
      `${BASE_URL}/${id}/complete/`,
      data,
    );
    return response.data;
  },

  confirmPickup: async (id: number, data: IConfirmPurchasePickup) => {
    const response = await axiosWithAuth.post(
      `${BASE_URL}/${id}/confirm-pickup/`,
      data,
    );
    return response.data;
  },

  reportIssue: async (id: number, data: IReportIssue) => {
    const response = await axiosWithAuth.post(
      `${BASE_URL}/${id}/report-issue/`,
      data,
    );
    return response.data;
  },

  respondToPurchaseRequest: async (
    id: number,
    data: IPurchaseRespondRequest,
  ) => {
    const response = await axiosWithAuth.post(
      `${BASE_URL}/${id}/respond/`,
      data,
    );
    return response.data;
  },
};
