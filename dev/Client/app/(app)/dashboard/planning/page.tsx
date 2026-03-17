"use client"
import React, { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

// Types
type TaskType = "regular" | "reminder" | "priority"

interface Task {
  id: number
  text: string
  type: TaskType
}

export default function Planning() {
  const [taskInput, setTaskInput] = useState<string>("")
  const [taskType, setTaskType] = useState<TaskType>("regular")
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (): void => {
    if (!taskInput.trim()) return

    const newTask: Task = {
      id: Date.now(),
      text: taskInput,
      type: taskType,
    }

    setTasks((prev) => [...prev, newTask])
    setTaskInput("")
  }

  const getColor = (type: TaskType): string => {
    if (type === "priority") return "bg-red-500"
    if (type === "reminder") return "bg-orange-400"
    return "bg-green-500"
  }

  const filterTasks = (type: TaskType): Task[] =>
    tasks.filter((t) => t.type === type)

  return (
    <div className="space-y-6 p-6">
      <Header title="Planning" />

      {/* Input Section */}
      <Card className="rounded-2xl p-4 shadow-md">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Add Task</h2>

          <Input
            placeholder="Type your task (AI prompt ready...)"
            value={taskInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTaskInput(e.target.value)
            }
          />

          <div className="flex gap-2">
            <Button
              variant={taskType === "regular" ? "default" : "outline"}
              onClick={() => setTaskType("regular")}
            >
              Regular
            </Button>
            <Button
              variant={taskType === "reminder" ? "default" : "outline"}
              onClick={() => setTaskType("reminder")}
            >
              Reminder
            </Button>
            <Button
              variant={taskType === "priority" ? "default" : "outline"}
              onClick={() => setTaskType("priority")}
            >
              Priority
            </Button>
          </div>

          <Button onClick={addTask} className="w-full">
            Add Task
          </Button>
        </CardContent>
      </Card>

      {/* AI Suggestions Placeholder */}
      <Card className="rounded-2xl border-2 border-dashed p-4">
        <CardContent>
          <h2 className="text-lg font-semibold">AI Suggestions</h2>
          <p className="text-sm text-muted-foreground">
            Suggestions will appear here based on your tasks...
          </p>
        </CardContent>
      </Card>

      {/* Task Categories */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Regular */}
        <div>
          <h3 className="mb-2 font-semibold">Regular</h3>
          <div className="space-y-2">
            {filterTasks("regular").map((task) => (
              <div
                key={task.id}
                className={`rounded-xl p-3 text-white ${getColor(task.type)}`}
              >
                {task.text}
              </div>
            ))}
          </div>
        </div>

        {/* Reminders */}
        <div>
          <h3 className="mb-2 font-semibold">Reminders</h3>
          <div className="space-y-2">
            {filterTasks("reminder").map((task) => (
              <div
                key={task.id}
                className={`rounded-xl p-3 text-white ${getColor(task.type)}`}
              >
                {task.text}
              </div>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <h3 className="mb-2 font-semibold">Priority</h3>
          <div className="space-y-2">
            {filterTasks("priority").map((task) => (
              <div
                key={task.id}
                className={`rounded-xl p-3 text-white ${getColor(task.type)}`}
              >
                {task.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
