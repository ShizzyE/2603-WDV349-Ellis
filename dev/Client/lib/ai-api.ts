const API_URL = "http://127.0.0.1:8000"

export interface AIResponse {
  response: string
}

function getAuthHeaders() {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("You are not authenticated.")
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export async function sendAIMessage(message: string): Promise<string> {
  const response = await fetch(`${API_URL}/ai/chat`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      message,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to communicate with PlanBuddy AI."
    )
  }

  return data.response
}