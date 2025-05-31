export interface ICategoryBase {
  name: string
  description: string
  parent_category: number
  file: File
}

export interface ICategory extends ICategoryBase {
  id: number
}

export interface ICategoryRequest extends ICategoryBase {}
