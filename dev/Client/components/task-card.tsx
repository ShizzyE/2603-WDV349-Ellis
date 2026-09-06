"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Pencil, Save, Trash2, X } from "lucide-react"
import { updateTask, type ApiTask } from "@/lib/task-api"

// Type definitions for task properties
type Priority = "High" | "Medium" | "Low"
type Status = "Not Started" | "In Progress" | "Delayed" | "Completed"
type Label = "School" | "Work" | "Personal" | "Faith" | "Business"

type TaskCardProps = {
  task: ApiTask
  onDelete: (id: number) => void
  onUpdated: (task: ApiTask) => void
  overdue?: boolean
}

const labels: Label[] = ["School", "Work", "Personal", "Faith", "Business"]

function getPriorityVariant(priority: Priority) {
  switch (priority) {
    case "High":
      return "destructive"
    case "Medium":
      return "secondary"
    case "Low":
      return "outline"
  }
}

function getTimeRemaining(date: string) {
  if (!date) {
    return "No due date"
  }

  const dueDate = new Date(`${date}T23:59:59`)
  const now = new Date()
  const difference = dueDate.getTime() - now.getTime()

  if (difference < 0) {
    return "Overdue"
  }

  const days = Math.ceil(difference / (1000 * 60 * 60 * 24))

  if (days === 0) {
    return "Due today"
  }

  if (days === 1) {
    return "Due tomorrow"
  }

  return `${days} days remaining`
}

type TaskForm = {
  title: string
  description: string
  notes: string
  priority: Priority
  label: Label
  due_date: string
  status: Status
  start_date: string
}

function toApiTask(task: TaskForm) {
  return {
    title: task.title.trim(),
    description: task.description.trim(),
    notes: task.notes.trim(),
    priority: task.priority,
    label: task.label,
    due_date: task.due_date,
    status: task.status,
    start_date: task.start_date || task.due_date,
  }
}

export default function TaskCard({
  task,
  onDelete,
  onUpdated,
  overdue = false,
}: TaskCardProps) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [pendingUpdate, setPendingUpdate] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState<TaskForm>({
    title: task.title,
    description: task.description,
    notes: task.notes,
    priority: task.priority as Priority,
    label: task.label as Label,
    due_date: task.due_date,
    status: task.status as Status,
    start_date: task.start_date,
  })

  const timeRemaining = getTimeRemaining(task.due_date)

  function startEditing() {
    setError("")

    setForm({
      title: task.title,
      description: task.description,
      notes: task.notes,
      priority: task.priority as Priority,
      label: task.label as Label,
      due_date: task.due_date,
      status: task.status as Status,
      start_date: task.start_date,
    })

    setEditing(true)
  }

  function cancelEditing() {
    setError("")
    setEditing(false)
  }

  async function saveTask() {
    if (!form.title.trim() || !form.description.trim() || !form.due_date) {
      setError("Title, description, and due date are required.")
      return
    }

    if (saving) {
      return
    }

    try {
      setSaving(true)
      setError("")

      const updated = await updateTask(task.id, toApiTask(form))

      const updatedTask: ApiTask = {
        ...task,
        title: updated.title,
        description: updated.description,
        notes: updated.notes,
        priority: updated.priority,
        label: updated.label,
        due_date: updated.due_date,
        status: updated.status,
        start_date: updated.start_date,
        created_at: updated.created_at ?? task.created_at,
        updated_at: updated.updated_at ?? task.updated_at,
        completed_at: updated.completed_at ?? task.completed_at,
      }

      onUpdated(updatedTask)
      setEditing(false)
    } catch (error) {
      console.error("Failed to update task:", error)
      setError("Unable to update task.")
    } finally {
      setSaving(false)
    }
  }

  async function changeLabel(label: Label) {
    if (pendingUpdate) {
      return
    }

    try {
      setPendingUpdate(true)
      setError("")

      const updated = await updateTask(
        task.id,
        toApiTask({
          title: task.title,
          description: task.description,
          notes: task.notes,
          priority: task.priority as Priority,
          label,
          due_date: task.due_date,
          status: task.status as Status,
          start_date: task.start_date,
        })
      )

      const updatedTask: ApiTask = {
        ...task,
        label: updated.label,
        updated_at: updated.updated_at ?? task.updated_at,
      }

      onUpdated(updatedTask)
    } catch (error) {
      console.error("Failed to update label:", error)
      setError("Unable to update label.")
    } finally {
      setPendingUpdate(false)
    }
  }

  async function changeStatus(status: Status) {
    if (pendingUpdate) {
      return
    }

    try {
      setPendingUpdate(true)
      setError("")

      const updated = await updateTask(
        task.id,
        toApiTask({
          title: task.title,
          description: task.description,
          notes: task.notes,
          priority: task.priority as Priority,
          label: task.label as Label,
          due_date: task.due_date,
          status,
          start_date: task.start_date,
        })
      )

      const updatedTask: ApiTask = {
        ...task,
        status: updated.status,
        updated_at: updated.updated_at ?? task.updated_at,
        completed_at: updated.completed_at ?? task.completed_at,
      }

      onUpdated(updatedTask)
    } catch (error) {
      console.error("Failed to update status:", error)
      setError("Unable to update status.")
    } finally {
      setPendingUpdate(false)
    }
  }

  if (editing) {
    return (
      <Card className={overdue ? "border-destructive/40" : ""}>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-lg">Edit Task</CardTitle>

            <Button
              size="icon"
              variant="ghost"
              onClick={cancelEditing}
              disabled={saving}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {error && (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>

            <Input
              value={form.title}
              disabled={saving}
              onChange={(event) =>
                setForm({
                  ...form,
                  title: event.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>

            <Textarea
              rows={4}
              value={form.description}
              disabled={saving}
              onChange={(event) =>
                setForm({
                  ...form,
                  description: event.target.value,
                })
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Label</label>

              <Select
                value={form.label}
                disabled={saving}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    label: value as Label,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {labels.map((label) => (
                    <SelectItem key={label} value={label}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>

              <Select
                value={form.priority}
                disabled={saving}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    priority: value as Priority,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="High">High</SelectItem>

                  <SelectItem value="Medium">Medium</SelectItem>

                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>

              <Select
                value={form.status}
                disabled={saving}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    status: value as Status,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>

                  <SelectItem value="In Progress">In Progress</SelectItem>

                  <SelectItem value="Delayed">Delayed</SelectItem>

                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>

              <Input
                type="date"
                value={form.start_date}
                disabled={saving}
                onChange={(event) =>
                  setForm({
                    ...form,
                    start_date: event.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>

              <Input
                type="date"
                value={form.due_date}
                disabled={saving}
                onChange={(event) =>
                  setForm({
                    ...form,
                    due_date: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>

            <Textarea
              rows={3}
              value={form.notes}
              disabled={saving}
              onChange={(event) =>
                setForm({
                  ...form,
                  notes: event.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline" onClick={cancelEditing} disabled={saving}>
              Cancel
            </Button>

            <Button onClick={saveTask} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />

              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`transition-all hover:-translate-y-1 hover:shadow-lg ${
        overdue ? "border-destructive/40" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant={getPriorityVariant(task.priority as Priority)}>
              {task.priority}
            </Badge>

            <Select
              value={task.label}
              onValueChange={(value) => changeLabel(value as Label)}
              disabled={pendingUpdate}
            >
              <SelectTrigger className="h-7 w-auto min-w-[100px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {labels.map((label) => (
                  <SelectItem key={label} value={label}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={startEditing}
              disabled={pendingUpdate}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDelete(task.id)}
              disabled={pendingUpdate}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <CardTitle className="text-lg">{task.title}</CardTitle>

          <Select
            value={task.status}
            onValueChange={(value) => changeStatus(value as Status)}
            disabled={pendingUpdate}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Not Started">Not Started</SelectItem>

              <SelectItem value="In Progress">In Progress</SelectItem>

              <SelectItem value="Delayed">Delayed</SelectItem>

              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {error && <p className="text-sm text-destructive">{error}</p>}

        <p className="text-sm text-muted-foreground">{task.description}</p>

        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div className="flex gap-2">
            <Calendar className="mt-1 h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Due Date</p>

              <p className="text-sm font-medium">
                {task.due_date
                  ? new Date(`${task.due_date}T00:00:00`).toLocaleDateString()
                  : "No due date"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Deadline</p>

            <p
              className={
                timeRemaining === "Overdue"
                  ? "text-sm font-semibold text-destructive"
                  : "text-sm font-semibold"
              }
            >
              {timeRemaining}
            </p>
          </div>
        </div>

        {task.notes && (
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-xs font-medium">Notes</p>

            <p className="mt-1 text-sm text-muted-foreground">{task.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
