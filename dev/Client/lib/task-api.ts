const API_URL = "http://127.0.0.1:8000"

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
  dueDate: string
  status: "Not Started" | "In Progress" | "Delayed" | "Completed"
  startDate: string
  notes: string
  createdAt: string
  updatedAt: string
  completedAt?: string
}

export function convertTask(task: ApiTask): FrontendTask {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority as FrontendTask["priority"],
    label: task.label as FrontendTask["label"],
    dueDate: task.due_date,
    status: task.status as FrontendTask["status"],
    startDate: task.start_date,
    notes: task.notes,
    createdAt: task.created_at ?? "",
    updatedAt: task.updated_at ?? "",
    completedAt: task.completed_at ?? undefined,
  }
}

export async function getTasks(): Promise<ApiTask[]> {
  const response = await fetch(`${API_URL}/tasks/`)

  if (!response.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return response.json()
}

export async function createTask(task: {
  title: string
  description: string
  notes: string
  priority: string
  label: string
  due_date: string
  status: string
  start_date: string
}) {
  const response = await fetch(`${API_URL}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Failed to create task")
  }

  return response.json()
}

export async function updateTask(
  id: number,
  task: {
    title: string
    description: string
    notes: string
    priority: string
    label: string
    due_date: string
    status: string
    start_date: string
  }
) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Failed to update task")
  }

  return response.json()
}

export async function deleteTask(id: number) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete task")
  }
}