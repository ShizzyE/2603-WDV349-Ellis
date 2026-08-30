const API_URL = process.env.NEXT_PUBLIC_API_URL

export type ApiTask = {
  id: number
  title: string
  description: string
  notes: string
  priority: string
  label: string
  due_date: string
  status: string
  start_date: string
  updated_at?: string | null
  completed_at?: string | null
  created_at?: string | null
}

export type FrontendTask = {
  id: number
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  label: "School" | "Work" | "Personal" | "Faith" | "Business"
  due_date: string
  status: "Not Started" | "In Progress" | "Delayed" | "Completed"
  start_date: string
  notes: string
  created_at: string
  updated_at: string
  completed_at?: string
}

function getAuthHeaders() {
  const token = localStorage.getItem("access_token")

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export function convertTask(task: ApiTask): FrontendTask {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority as FrontendTask["priority"],
    label: task.label as FrontendTask["label"],
    due_date: task.due_date,
    status: task.status as FrontendTask["status"],
    start_date: task.start_date,
    notes: task.notes,
    created_at: task.created_at ?? "",
    updated_at: task.updated_at ?? "",
    completed_at: task.completed_at ?? undefined,
  }
}

export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks/`, {
    method: "GET",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return response.json()
}

export async function createTask(task: any) {
  const response = await fetch(`${API_URL}/tasks/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error("Failed to create task")
  }

  return response.json()
}

export async function updateTask(id: number, task: any) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error("Failed to update task")
  }

  return response.json()
}

export async function deleteTask(id: number) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to delete task")
  }
}