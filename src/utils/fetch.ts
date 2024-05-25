import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url: string) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // reset state before fetching..
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}

export async function useFetchPost(url: string, body: any) {
  const token: string | null = localStorage.getItem('token')
  const options = { 
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-API-KEY": "ZwtuEmALA8tBb9Dunb0uakD2s14=",
    "Authorization": `Bearer ${token}`
    }
  }

  const response = await fetch(url, options)

  const json = await response.json()

  return json
}

export async function useFetchUpdate(url: string, body: any) {
  const options = { 
    body: JSON.stringify(body),
    method: 'PATCH',
    headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-API-KEY": "ZwtuEmALA8tBb9Dunb0uakD2s14="
    }
  }

  const response = await fetch(url, options)

  const json = await response.json()

  return json
}


export async function useFetchGet(url: string) {
  const token: string | null = localStorage.getItem('token')
  
  const options = { 
    method: 'GET',
    headers: {
    "Accept": "application/json",
    "X-API-KEY": "bUaKpEmhR2CnIl8mdO5zjHiOmWw=",
    "Authorization": `Bearer ${token}`
    }
  }

  const response = await fetch(url, options)

  const json = await response.json()

  return json
}