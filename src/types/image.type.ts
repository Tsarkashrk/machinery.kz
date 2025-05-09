export interface IImage {
  id: number
  equipment: number
  image_url: string
  image_type: string
  uploaded_at: string
}

export interface IImageRequest extends IImage {}

