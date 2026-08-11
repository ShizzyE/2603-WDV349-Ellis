"use client"

import React, { useEffect, useMemo, useState } from "react"
import Header from "@/components/header"

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

import {
  Plus,
  Search,
  ArrowUpDown,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react"

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as deleteTaskApi,
  convertTask,
  type FrontendTask,
} from "@/lib/task-api"

type Priority = "High" | "Medium" | "Low"

type Status = "Not Started" | "In Progress" | "Delayed" | "Completed"

type Label = "School" | "Work" | "Personal" | "Faith" | "Business"

type Task = FrontendTask

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

function TaskCard({
  task,
  onDelete,
  onEdit,
}: {
  task: Task
  onDelete: (id: number) => void
  onEdit: (task: Task) => void
}) {
  const timeRemaining = getTimeRemaining(task.dueDate)

  const overdue = timeRemaining === "Overdue"

  return (
    <Card
      className={`transition-all hover:-translate-y-1 hover:shadow-lg ${
        overdue ? "border-destructive/40" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={getPriorityVariant(task.priority)}>
              {task.priority}
            </Badge>

            <Badge variant="outline">{task.label}</Badge>
          </div>

          <div className="flex gap-2">
            <Button size="icon" variant="outline" onClick={() => onEdit(task)}>
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <CardTitle className="text-lg">{task.title}</CardTitle>

          <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
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
                overdue
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

export default function Planning() {
  const [tasks, setTasks] = useState<Task[]>([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  const [search, setSearch] = useState("")

  const [priorityFilter, setPriorityFilter] = useState("all")

  const [labelFilter, setLabelFilter] = useState("all")

  const [statusFilter, setStatusFilter] = useState("all")

  const [sortBy, setSortBy] = useState("dueDate")

  const [showForm, setShowForm] = useState(false)

  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium" as Priority,
    label: "School" as Label,
    dueDate: "",
    status: "Not Started" as Status,
    startDate: "",
    notes: "",
  })

  /*LOAD TASKS FROM FASTAPI*/
  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true)
        setError("")

        const data = await getTasks()

        setTasks(data.map(convertTask))
      } catch (error) {
        console.error(error)
        setError("Unable to load tasks.")
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  function resetForm() {
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      label: "School",
      dueDate: "",
      status: "Not Started",
      startDate: "",
      notes: "",
    })

    setEditingTask(null)
  }

  /* DELETE TASK FROM DATABASE */
  async function deleteTask(id: number) {
    try {
      setError("")

      await deleteTaskApi(id)

      setTasks((current) => current.filter((task) => task.id !== id))
    } catch (error) {
      console.error(error)
      setError("Unable to delete task.")
    }
  }

  /* OPEN EDIT FORM */
  function editTask(task: Task) {
    setEditingTask(task)

    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      label: task.label,
      dueDate: task.dueDate,
      status: task.status,
      startDate: task.startDate,
      notes: task.notes,
    })

    setShowForm(true)
  }

  /* CREATE OR UPDATE TASK */
  async function handleCreateTask(event: React.FormEvent) {
    event.preventDefault()

    if (
      !newTask.title.trim() ||
      !newTask.description.trim() ||
      !newTask.dueDate
    ) {
      return
    }

    try {
      setError("")

      const taskData = {
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        notes: newTask.notes.trim(),
        priority: newTask.priority,
        label: newTask.label,
        due_date: newTask.dueDate,
        status: newTask.status,
        start_date: newTask.startDate || newTask.dueDate,
      }

      console.log("Task Data:", taskData) // Debugging line

      /* UPDATE EXISTING TASK */
      if (editingTask) {
        const updated = await updateTask(editingTask.id, taskData)

        setTasks((current) =>
          current.map((item) =>
            item.id === editingTask.id ? convertTask(updated) : item
          )
        )
      } else {
        /*
         * CREATE NEW TASK
         */
        const created = await createTask(taskData)

        setTasks((current) => [...current, convertTask(created)])
      }

      resetForm()
      setShowForm(false)
    } catch (error) {
      console.error(error)
      setError("Unable to save task.")
    }
  }

  const labels = ["School", "Work", "Personal", "Faith", "Business"]

  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const searchTerm = search.toLowerCase()

      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm) ||
        task.label.toLowerCase().includes(searchTerm)

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter

      const matchesLabel = labelFilter === "all" || task.label === labelFilter

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter

      return matchesSearch && matchesPriority && matchesLabel && matchesStatus
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === "priority") {
        const order = {
          High: 1,
          Medium: 2,
          Low: 3,
        }

        return order[a.priority] - order[b.priority]
      }

      if (sortBy === "title") {
        return a.title.localeCompare(b.title)
      }

      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })
  }, [tasks, search, priorityFilter, labelFilter, statusFilter, sortBy])

  return (
    <div>
      <Header title="Planning" />

      <main className="flex flex-col gap-8 p-4 sm:p-6 lg:p-8">
        {/* Header */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Planning</h1>

            <p className="mt-1 text-muted-foreground">
              Organize tasks, deadlines, and priorities.
            </p>
          </div>

          <Button
            onClick={() => {
              if (showForm) {
                setShowForm(false)
                resetForm()
              } else {
                resetForm()
                setShowForm(true)
              }
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        {/* Error */}

        {error && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Create/Edit Task */}

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingTask ? "Edit Task" : "Create Task"}</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleCreateTask} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>

                    <Input
                      required
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Label</label>

                    <Select
                      value={newTask.label}
                      onValueChange={(value) =>
                        setNewTask({
                          ...newTask,
                          label: value as Label,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Label" />
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
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>

                  <Textarea
                    required
                    rows={4}
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="text-sm font-medium">Priority</label>

                    <Select
                      value={newTask.priority}
                      onValueChange={(value) =>
                        setNewTask({
                          ...newTask,
                          priority: value as Priority,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>

                        <SelectItem value="Medium">Medium</SelectItem>

                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Status</label>

                    <Select
                      value={newTask.status}
                      onValueChange={(value) =>
                        setNewTask({
                          ...newTask,
                          status: value as Status,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Not Started">Not Started</SelectItem>

                        <SelectItem value="In Progress">In Progress</SelectItem>

                        <SelectItem value="Delayed">Delayed</SelectItem>

                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Due Date</label>

                    <Input
                      required
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          dueDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Start Date</label>

                  <Input
                    type="date"
                    value={newTask.startDate}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes</label>

                  <Textarea
                    rows={3}
                    value={newTask.notes}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-end gap-2 border-t pt-5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      resetForm()
                    }}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" disabled={loading}>
                    {editingTask ? "Update Task" : "Create Task"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filters */}

        <Card>
          <CardContent className="p-4">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  className="pl-9"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>

                  <SelectItem value="High">High</SelectItem>

                  <SelectItem value="Medium">Medium</SelectItem>

                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={labelFilter} onValueChange={setLabelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Label" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Labels</SelectItem>

                  {labels.map((label) => (
                    <SelectItem key={label} value={label}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>

                  <SelectItem value="Not Started">Not Started</SelectItem>

                  <SelectItem value="In Progress">In Progress</SelectItem>

                  <SelectItem value="Delayed">Delayed</SelectItem>

                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <ArrowUpDown className="mr-2 h-4 w-4" />

                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>

                  <SelectItem value="priority">Priority</SelectItem>

                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tasks */}

        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Tasks</h2>

            <p className="text-sm text-muted-foreground">
              {loading ? "Loading..." : `${filteredTasks.length} tasks`}
            </p>
          </div>

          {loading ? (
            <Card>
              <CardContent className="flex min-h-[200px] items-center justify-center">
                <p className="text-muted-foreground">Loading tasks...</p>
              </CardContent>
            </Card>
          ) : filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="flex min-h-[200px] items-center justify-center">
                <p className="text-muted-foreground">No tasks created yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onEdit={editTask}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
