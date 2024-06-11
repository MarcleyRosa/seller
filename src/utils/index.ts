const token = localStorage.getItem('token') || sessionStorage.getItem('token')

export const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'X-API-KEY': import.meta.env.X_API_KEY,
    Authorization: `Bearer ${token}`
  }
}

export function formatDate(value: any) {
  if (!value) return ''
  const date = new Date(value)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}
