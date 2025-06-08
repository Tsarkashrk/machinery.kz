import { axiosWithAuth } from "./interceptors";
import { IUser, IUserRequest } from "@/5-entities/user";

const BASE_URL = "/me";

export const profileApi = {
  getProfile: async () => {
    const response = await axiosWithAuth.get<IUser>(`${BASE_URL}/`);
    return response.data;
  },

  editProfile: async (data: IUserRequest) => {
    const response = await axiosWithAuth.put(`${BASE_URL}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateProfileImage: async (image: FormData) => {
    const response = await axiosWithAuth.post(
      `${BASE_URL}/profile-image/`,
      image,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },
};
