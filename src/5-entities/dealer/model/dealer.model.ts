import { ICompanyResponse } from "@/5-entities/company";
import { IUser } from "@/5-entities/user";

export interface IDealerData {
  users: IUser[];
  companies: ICompanyResponse[];
}
