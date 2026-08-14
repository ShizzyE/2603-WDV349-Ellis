const API_URL = "http://localhost:8000"

export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Registration failed")
  }

  return data
}

export async function loginUser(
  email: string,
  password: string
) {
  const body = new URLSearchParams()

  body.append("username", email)
  body.append("password", password)

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Login failed")
  }

  return data
}

export async function getCurrentUser() {
  const token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("Not authenticated")
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.detail || "Could not get current user"
    )
  }

  return data
}

export function logoutUser() {
  localStorage.removeItem("access_token")
}