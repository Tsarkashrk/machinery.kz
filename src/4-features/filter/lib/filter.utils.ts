import { IEquipmentFilters, IFilterFormData } from "../model/filter.model";

export const convertFormDataToFilters = (
  formData: IFilterFormData,
): IEquipmentFilters => {
  const filters: IEquipmentFilters = {
    page: 1,
    page_size: 20,
  };

  if (formData.search?.trim()) filters.search = formData.search.trim();
  if (formData.brand) filters.brand = Number(formData.brand);
  if (formData.category) filters.category = Number(formData.category);
  if (formData.available_for_rent)
    filters.available_for_rent = formData.available_for_rent;
  if (formData.available_for_sale)
    filters.available_for_sale = formData.available_for_sale;
  if (formData.min_price) filters.min_price = Number(formData.min_price);
  if (formData.max_price) filters.max_price = Number(formData.max_price);
  if (formData.min_rental_rate)
    filters.min_rental_rate = Number(formData.min_rental_rate);
  if (formData.max_rental_rate)
    filters.max_rental_rate = Number(formData.max_rental_rate);
  if (formData.min_year) filters.min_year = Number(formData.min_year);
  if (formData.max_year) filters.max_year = Number(formData.max_year);

  return filters;
};

export const getInitialFormData = (): IFilterFormData => ({
  search: "",
  brand: "",
  category: null,
  available_for_rent: false,
  available_for_sale: false,
  min_price: "",
  max_price: "",
  min_rental_rate: "",
  max_rental_rate: "",
  min_year: "",
  max_year: "",
  condition: "",
  location_city: "",
});
