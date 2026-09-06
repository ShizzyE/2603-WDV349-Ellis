"use client"

import React, { useEffect, useMemo, useState } from "react"

import Header from "@/components/header"
import TaskCard from "@/components/task-card"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"

import {
  getTasks,
  deleteTask as deleteTaskApi,
  type ApiTask,
} from "@/lib/task-api"

type Priority = "High" | "Medium" | "Low"

type Task = ApiTask

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
   * Delete task from the database and
   * remove it from Dashboard state.
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
   * Replace the updated task in Dashboard state.
   *
   * TaskCard handles the API update itself.
   * Dashboard only needs to update its local state.
   */
  function handleUpdated(updatedTask: ApiTask) {
    setTasks((current) =>
      current.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    )
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
   * Active tasks sorted by priority,
   * then by due date.
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

      if (!task.due_date) {
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
                    onUpdated={handleUpdated}
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
                    onUpdated={handleUpdated}
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
