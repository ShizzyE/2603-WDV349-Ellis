"use client"

import React, { useEffect, useMemo, useState } from "react"
import Header from "@/components/header"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Calendar, Trash2 } from "lucide-react"

import {
  getTasks,
  updateTask,
  deleteTask as deleteTaskApi,
  type ApiTask,
} from "@/lib/task-api"

type Priority = "High" | "Medium" | "Low"

type Status = "Not Started" | "In Progress" | "Delayed" | "Completed"

type Label = "School" | "Work" | "Personal" | "Faith" | "Business"

type Task = ApiTask

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

function getStatusVariant(status: Status) {
  switch (status) {
    case "Completed":
      return "default"

    case "In Progress":
      return "secondary"

    case "Delayed":
      return "destructive"

    case "Not Started":
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

function TaskCard({
  task,
  onDelete,
  onStatusChange,
  overdue = false,
}: {
  task: Task
  onDelete: (id: number) => void
  onStatusChange: (id: number, status: Status) => void
  overdue?: boolean
}) {
  const timeRemaining = getTimeRemaining(task.due_date)

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

            <Badge variant="outline">{task.label}</Badge>
          </div>

          <Button
            size="icon"
            variant="destructive"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <CardTitle className="text-lg">{task.title}</CardTitle>

          <Select
            value={task.status}
            onValueChange={(value) => onStatusChange(task.id, value as Status)}
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
        <p className="text-sm text-muted-foreground">{task.description}</p>

        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div className="flex gap-2">
            <Calendar className="mt-1 h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Due Date</p>

              <p className="text-sm font-medium">
                {new Date(`${task.due_date}T00:00:00`).toLocaleDateString()}
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

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  /*
   * Load tasks from FastAPI when Dashboard mounts.
   */
  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true)
        setError("")

        const data = await getTasks()

        console.log("Dashboard tasks from API:", data)

        setTasks(data)
      } catch (error) {
        console.error("Failed to load dashboard tasks:", error)

        setError("Failed to load tasks from the server.")
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  /*
   * Delete task from database and then
   * remove it from the Dashboard.
   */
  async function deleteTask(id: number) {
    try {
      setError("")

      await deleteTaskApi(id)

      setTasks((current) => current.filter((task) => task.id !== id))
    } catch (error) {
      console.error("Failed to delete task:", error)

      setError("Failed to delete task.")
    }
  }

  /*
   * Update task status in the database.
   */
  async function updateStatus(id: number, status: Status) {
    const currentTask = tasks.find((task) => task.id === id)

    if (!currentTask) {
      return
    }

    try {
      setError("")

      const updatedTask = await updateTask(id, {
        title: currentTask.title,
        description: currentTask.description,
        notes: currentTask.notes,
        priority: currentTask.priority,
        label: currentTask.label,
        due_date: currentTask.due_date,
        status,
        start_date: currentTask.start_date,
      })

      setTasks((current) =>
        current.map((task) => (task.id === id ? updatedTask : task))
      )
    } catch (error) {
      console.error("Failed to update task:", error)

      setError("Failed to update task status.")
    }
  }

  /*
   * Completed task statistics.
   */
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length

  const totalTasks = tasks.length

  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100

  /*
   * All incomplete tasks sorted by priority,
   * then by due date.
   *
   * This means Medium and Low tasks now appear
   * on the Dashboard too.
   */
  const activeTasks = useMemo(() => {
    const priorityOrder: Record<Priority, number> = {
      High: 1,
      Medium: 2,
      Low: 3,
    }

    return tasks
      .filter((task) => task.status !== "Completed")
      .sort((a, b) => {
        const priorityDifference =
          priorityOrder[a.priority as Priority] -
          priorityOrder[b.priority as Priority]

        if (priorityDifference !== 0) {
          return priorityDifference
        }

        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      })
  }, [tasks])

  /*
   * Overdue tasks.
   */
  const overdueTasks = useMemo(() => {
    const now = new Date()

    return tasks.filter((task) => {
      if (task.status === "Completed") {
        return false
      }

      const due = new Date(`${task.due_date}T23:59:59`)

      return due < now
    })
  }, [tasks])

  return (
    <main className="flex flex-col gap-8 overflow-y-auto p-4 sm:p-6">
      <Header title="Dashboard" />
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Progress</span>

            <span>
              {completedTasks}/{totalTasks}
            </span>
          </div>

          <Progress value={progress} />
        </CardContent>
      </Card>

      {loading ? (
        <Card>
          <CardContent className="flex min-h-[200px] items-center justify-center">
            <p className="text-muted-foreground">Loading tasks...</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Next: Priority</h2>

              <p className="text-sm text-muted-foreground">
                {activeTasks.length} active tasks
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {activeTasks.length === 0 ? (
                <p className="text-muted-foreground">No active tasks.</p>
              ) : (
                activeTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    onStatusChange={updateStatus}
                  />
                ))
              )}
            </div>
          </section>

          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Overdue Tasks</h2>

              <p className="text-sm text-muted-foreground">
                {overdueTasks.length} overdue tasks
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {overdueTasks.length === 0 ? (
                <p className="text-muted-foreground">No overdue tasks.</p>
              ) : (
                overdueTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    overdue
                    onDelete={deleteTask}
                    onStatusChange={updateStatus}
                  />
                ))
              )}
            </div>
          </section>
        </>
      )}
    </main>
  )
}
