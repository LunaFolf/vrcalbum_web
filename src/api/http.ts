type urlParams = {
  [key: string]: string | number | boolean
}

type jsonResponse = {
  [key: string]: any
}

function convertToUrlParams(params?: urlParams): URLSearchParams {
  const urlParams = new URLSearchParams()

  if (!params) return urlParams

  for (const [key, value] of Object.entries(params)) {
    urlParams.set(key, value.toString())
  }

  return urlParams
}

export async function get(url: string, params?: urlParams): Promise<jsonResponse> {
  const urlParams = convertToUrlParams(params)
  const response = await fetch(url + '?' + new URLSearchParams(urlParams), {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })

  if (!response.ok) {
    console.error(response)
    throw new Error(response.statusText)
  }

  return await response.json()
}
