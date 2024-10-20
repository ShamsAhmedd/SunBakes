export interface Product {
  _id: string
  title: string
  description: string
  quantity: number
  price: number
  imageCover: string
  ratingAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  category: Category
  headerImg: string
}

export interface Category {
  _id: string
  title: string
  imageUrl: string
  __v: number
}
