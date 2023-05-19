import { Api } from "@/__generated"
import { useSessionStore } from "@/store"

export const api = new Api(async ({ uri, method, body }) => {
  const token = useSessionStore().token as string | undefined
  const response = await fetch(`http://localhost:8080${uri}`, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      ...(token !== undefined && token !== "" ? { token } : {})
    }
  })
  if (response.status !== 200) {
    throw await response.text()
  }
  const text = await response.text()
  if (text.length === 0) {
    return null
  }

  return JSON.parse(text)
})
