export interface Store {
  name: string
  store_id: string
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
