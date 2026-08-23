const API_URL = "http://localhost:8000"

// API interface for PlanBuddy AI
export interface AIResponse {
  response: string
}

// Function to send a message to the PlanBuddy AI and receive a response
export async function sendAIMessage(message: string): Promise<string> {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("You are not authenticated.")
  }

  const response = await fetch(`${API_URL}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)

    throw new Error(
      errorData?.detail || "Failed to send message to PlanBuddy AI."
    )
  }

  const data: AIResponse = await response.json()

  return data.response
}