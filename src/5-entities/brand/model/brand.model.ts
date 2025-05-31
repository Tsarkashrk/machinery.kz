interface IBrandBase {
  name: string
  description: string
  file: string
  website: string
  founded_year: number
}

export interface IBrand extends IBrandBase {
  id: number
  created_at: string
}

export interface IBrandRequest extends IBrandBase {}
