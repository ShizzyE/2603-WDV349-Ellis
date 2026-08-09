"use client"

import React, { useState } from "react"
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

type Priority = "High" | "Medium" | "Low"

type Status = "Not Started" | "In Progress" | "Delayed" | "Completed"

type Label = "School" | "Work" | "Personal" | "Faith" | "Business"

type Task = {
  id: number
  title: string
  description: string
  priority: Priority
  label: Label
  dueDate: string
  status: Status
  startDate: string
  notes: string
  createdAt: string
  updatedAt: string
  completedAt?: string
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete React Dashboard",
    description: "Finish dashboard layout and responsive design.",
    priority: "High",
    label: "School",
    dueDate: "2026-08-11",
    status: "In Progress",
    startDate: "2026-08-07",
    notes: "",
    createdAt: "",
    updatedAt: "",
  },

  {
    id: 2,
    title: "Finish Assignment",
    description: "Complete remaining project requirements.",
    priority: "Medium",
    label: "School",
    dueDate: "2026-08-11",
    status: "Not Started",
    startDate: "2026-08-07",
    notes: "",
    createdAt: "",
    updatedAt: "",
  },

  {
    id: 3,
    title: "Submit Project",
    description: "Upload final project files.",
    priority: "Low",
    label: "School",
    dueDate: "2026-08-08",
    status: "Delayed",
    startDate: "2026-08-07",
    notes: "",
    createdAt: "",
    updatedAt: "",
  },
]

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
  const timeRemaining = getTimeRemaining(task.dueDate)

  return (
    <Card
      className={`transition-all hover:-translate-y-1 hover:shadow-lg ${
        overdue ? "border-destructive/40" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            <Badge variant={getPriorityVariant(task.priority)}>
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
                {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString()}
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
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  function deleteTask(id: number) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  function updateStatus(id: number, status: Status) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,

              status,

              updatedAt: new Date().toISOString(),
            }
          : task
      )
    )
  }

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length

  const totalTasks = tasks.length

  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100

  const priorityTasks = tasks.filter(
    (task) => task.priority === "High" && task.status !== "Completed"
  )

  const overdueTasks = tasks.filter((task) => {
    const today = new Date()

    const due = new Date(`${task.dueDate}T23:59:59`)

    return due < today && task.status !== "Completed"
  })

  return (
    <div>
      <Header title="Dashboard" />

      <main className="flex flex-col gap-8 overflow-y-auto p-4 sm:p-6">
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

        <section>
          <h2 className="mb-4 text-2xl font-bold">Next: Priority</h2>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {priorityTasks.length === 0 ? (
              <p className="text-muted-foreground">No priority tasks.</p>
            ) : (
              priorityTasks.map((task) => (
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
          <h2 className="mb-4 text-2xl font-bold">Overdue Tasks</h2>

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
      </main>
    </div>
  )
}
