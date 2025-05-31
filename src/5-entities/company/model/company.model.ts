export interface ICompanyBase {
  company_name: string
  company_address: string
  company_phone: string
  company_email: string
  website: string
  founded_year: number
}

export interface ICompanyResponse extends ICompanyBase {
  id: number
  image_url: string
}

export interface ICompaniesResponse {
  count: number
  next: string
  previous: string
  results: ICompanyResponse[]
}

export interface ICompanyPostRequest extends ICompanyBase {
  password: string
}

export interface ICompanyEditRequest extends ICompanyBase {
  file: FileList | string
}
