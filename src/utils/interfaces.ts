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

export interface User {
  id: number
  email: string
  created_at: string
  updated_at: string
  role: string
  address: {
    id: number
    street: string
    house_number: string
    neighborhood: string
    city: string
    state: string
    zip_code: string
    country: string
    user_id: number
    created_at: string
    updated_at: string
  }
}
