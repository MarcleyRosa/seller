export interface Store {
  store_id: string
  id: string
  title: string
  price: string
  image_url: string
}

export interface NewOrder {
  time: Date
  order: {
    id: string
    created_at: string
    state: string
  }[]
}
