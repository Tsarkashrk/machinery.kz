import { companiesApi } from "@/6-shared/api/companies";
import { useQuery } from "@tanstack/react-query";
import { ICompaniesResponse } from "../model/company.model";

export const useCompaniesList = () => {
  const { data, isLoading } = useQuery<ICompaniesResponse>({
    queryKey: ["companies"],
    queryFn: companiesApi.getAllCompanies,
  });

  return { companiesList: data, isLoading };
};
