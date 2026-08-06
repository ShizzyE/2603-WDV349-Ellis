"use client"

import React from "react"
import Header from "@/components/header"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"


const priorityTasks = [
  {
    title: "Complete React Dashboard",
    priority: "High",
    date: "8/11/2026",
    description: "Finish dashboard layout and responsive design.",
  },
  {
    title: "Finish Assignment",
    priority: "Medium",
    date: "8/11/2026",
    description: "Complete remaining project requirements.",
  },
  {
    title: "Study For Exam",
    priority: "High",
    date: "8/24/2026",
    description: "Review notes and prepare for exam.",
  },
]


const overdueTasks = [
  {
    title: "Submit Project",
    priority: "Low",
    date: "8/8/2026",
    description: "Upload final project files.",
  },
  {
    title: "Complete Research",
    priority: "High",
    date: "8/10/2026",
    description: "Finish research documentation.",
  },
  {
    title: "Review Notes",
    priority: "Medium",
    date: "8/12/2026",
    description: "Review class notes.",
  },
]


function TaskCard({
  task,
  overdue = false,
}: {
  task: {
    title: string
    priority: string
    date: string
    description: string
  }
  overdue?: boolean
}) {
  return (
    <Card
      className={`cursor-pointer transition hover:scale-[1.02] hover:shadow-lg ${
        overdue ? "bg-black/50 opacity-80" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge>
            {task.priority}
          </Badge>

          <span className="text-sm text-muted-foreground">
            {task.date}
          </span>
        </div>

        <CardTitle className="text-lg">
          {task.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {task.description}
        </p>
      </CardContent>
    </Card>
  )
}


export default function Dashboard() {
  const completedTasks = 0
  const totalTasks = 11

  const progress =
    (completedTasks / totalTasks) * 100


  return (
    <div>
      <Header title="Dashboard" />


      <main className="flex flex-col gap-8 overflow-y-auto p-4 sm:p-6">

        {/* Progress */}
        <Card>
          <CardHeader>
            <CardTitle>
              Completed Tasks
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">

            <div className="flex justify-between text-sm">
              <span>
                Progress
              </span>

              <span>
                {completedTasks}/{totalTasks}
              </span>
            </div>

            <Progress value={progress} />

          </CardContent>
        </Card>



        {/* Priority Tasks */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            Next: Priority
          </h2>

          <div className="
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-3
          ">
            {priorityTasks.map((task, index) => (
              <TaskCard
                key={index}
                task={task}
              />
            ))}
          </div>
        </section>



        {/* Overdue Tasks */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            Overdue Tasks
          </h2>

          <div className="
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-3
          ">
            {overdueTasks.map((task, index) => (
              <TaskCard
                key={index}
                task={task}
              />
            ))}
          </div>
        </section>


      </main>
    </div>
  )
}