class Request {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, method: string, data?: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    const options: RequestInit = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': 'D+PQFRWy9hb/RqN2bYZnHXUNIMY=',
        Authorization: `Bearer ${token}`
      }
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      if (response.status === 204) {
        return null as T
      }
      return await response.json()
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  }

  public get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, 'GET')
  }

  public post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, 'POST', data)
  }

  public put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data)
  }

  public patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, 'PATCH', data)
  }

  public delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, 'DELETE')
  }

  public async uploadImage<T>(endpoint: string, body: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const token: string | null = localStorage.getItem('token')
    const formData = new FormData()

    formData.append('store[name]', body.name)
    formData.append('store[image]', body.image)

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        'X-API-KEY': 'ZwtuEmALA8tBb9Dunb0uakD2s14=',
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      if (response.status === 204) {
        return null as T
      }
      return await response.json()
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  }

  public async updateImage<T>(endpoint: string, body: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const token: string | null = localStorage.getItem('token')
    const formData = new FormData()

    formData.append('store[name]', body.name)
    formData.append('store[image]', body.image)

    const options = {
      method: 'PATCH',
      body: formData,
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        'X-API-KEY': 'ZwtuEmALA8tBb9Dunb0uakD2s14=',
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      if (response.status === 204) {
        return null as T
      }
      return await response.json()
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  }
}

export { Request }
