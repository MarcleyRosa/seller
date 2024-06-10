const token = localStorage.getItem('token') || sessionStorage.getItem('token')

export const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'X-API-KEY': import.meta.env.X_API_KEY,
    Authorization: `Bearer ${token}`
  }
}
