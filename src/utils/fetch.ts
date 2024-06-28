import { useRouter } from 'vue-router'

class Request {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, method: string, data?: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const router = useRouter()
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    if (!token) {
      router.push('/signin')
    }

    const isBody = data && Object.keys(data).length > 0

    console.log(token)

    const options: any = {
      method,
      headers: {
        Accept: 'application/json',
        'X-API-KEY': import.meta.env.VITE_X_API_KEY,
        Authorization: `Bearer ${token}`
      }
    }

    if (isBody) {
      options.body = JSON.stringify(data)
      options.headers['Content-Type'] = 'application/json'
    } else {
      options.body = data
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
}

export { Request }
