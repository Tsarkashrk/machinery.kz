export interface ICategoryBase {
  name: string
  description: string
  parent_category: number
}

export interface ICategory extends ICategoryBase {
  id: number
}

export interface ICategoryRequest extends ICategoryBase {}
