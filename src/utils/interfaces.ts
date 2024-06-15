export interface Store {
  name: string
  store_id: string
  stock: number
  id: string
  title: string
  price: string
  image_url: string
  active: boolean
}

export interface NewOrder {
  time: Date
  order: {
    id: string
    created_at: string
    state: string
  }[]
}

export interface Product {
  title: string
  price: string
  stock: number
  image_url: string
}
