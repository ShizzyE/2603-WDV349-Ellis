"use client"

import React, { useEffect, useMemo, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import type { EventClickArg } from "@fullcalendar/core"

type Task = {
  id: number
  title: string
  description: string
  notes: string
  priority: string
  label: string
  due_date: string
  status: string
  start_date: string
  updated_at?: string
  completed_at?: string
  created_at?: string
}

const priorityRank: Record<string, number> = {
  high: 3,
  medium: 2,
  low: 1,
}

export default function CalendarCom() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true)
        setError(null)

        // Get JWT token from localStorage
        const token = localStorage.getItem("access_token")

        // Make sure the user is logged in
        if (!token) {
          throw new Error("You are not logged in.")
        }

        // Request only the current user's tasks
        const response = await fetch("http://localhost:8000/tasks/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Your session has expired. Please log in again.")
          }

          throw new Error("Failed to fetch tasks")
        }

        const data = await response.json()

        console.log("TASK DATA:", data)

        setTasks(data)
      } catch (err) {
        console.error(err)

        setError(err instanceof Error ? err.message : "Unable to load tasks.")
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  /*
   * Convert database tasks into FullCalendar events.
   */
  const events = useMemo(() => {
    return tasks
      .filter((task) => task.due_date)
      .map((task) => ({
        id: String(task.id),
        title: task.title,
        start: task.due_date,
        classNames: [`priority-${task.priority.toLowerCase()}`],
        extendedProps: {
          task,
        },
      }))
  }, [tasks])

  /*
   * Get all tasks due on the selected date.
   * Highest priority appears first.
   */
  const selectedTasks = useMemo(() => {
    if (!selectedDate) return []

    return tasks
      .filter((task) => task.due_date === selectedDate)
      .sort(
        (a, b) =>
          (priorityRank[b.priority.toLowerCase()] ?? 0) -
          (priorityRank[a.priority.toLowerCase()] ?? 0)
      )
  }, [tasks, selectedDate])

  const mostImportantTask = selectedTasks[0]

  function handleDateClick(info: { dateStr: string }) {
    setSelectedDate(info.dateStr)
  }

  /*
   * Open the clicked task in the centered task popup.
   */
  function handleEventClick(info: EventClickArg) {
    const task = info.event.extendedProps.task as Task

    setSelectedTask(task)
  }

  /*
   * Close the task popup.
   */
  function closeTaskView() {
    setSelectedTask(null)
  }

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Planner Calendar</h2>

      {loading && (
        <p className="mb-4 text-sm text-muted-foreground">Loading tasks...</p>
      )}

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        themeSystem="standard"
        events={events}
        eventDisplay="block"
        dayMaxEvents={3}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />

      {/* Tasks for selected date */}
      {selectedDate && (
        <div className="mt-6 rounded-xl border bg-background p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tasks due</p>

              <h3 className="text-lg font-semibold">
                {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
                  undefined,
                  {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </h3>
            </div>

            <button
              onClick={() => setSelectedDate(null)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>

          {selectedTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No tasks are due on this day.
            </p>
          ) : (
            <div className="space-y-3">
              {/* Most important task */}
              {mostImportantTask && (
                <div
                  className={`rounded-lg border-l-4 p-4 ${
                    mostImportantTask.priority.toLowerCase() === "high"
                      ? "border-red-500 bg-red-500/10"
                      : mostImportantTask.priority.toLowerCase() === "medium"
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-green-500 bg-green-500/10"
                  }`}
                >
                  <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Most Important
                  </p>

                  <p className="font-semibold">{mostImportantTask.title}</p>

                  <p className="mt-1 text-sm text-muted-foreground capitalize">
                    {mostImportantTask.priority} priority
                  </p>

                  {mostImportantTask.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {mostImportantTask.description}
                    </p>
                  )}
                </div>
              )}

              {/* Remaining tasks */}
              {selectedTasks.slice(1).map((task) => (
                <div key={task.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{task.title}</p>

                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        task.priority.toLowerCase() === "high"
                          ? "bg-red-500/15 text-red-500"
                          : task.priority.toLowerCase() === "medium"
                            ? "bg-yellow-500/15 text-yellow-600"
                            : "bg-green-500/15 text-green-500"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected Task Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeTaskView}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border bg-background p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close X */}
            <button
              onClick={closeTaskView}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-md text-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Close task"
            >
              ✕
            </button>

            {/* Task Header */}
            <div className="pr-10">
              <p className="mb-1 text-sm text-muted-foreground">Task Details</p>

              <h3 className="text-xl font-semibold">{selectedTask.title}</h3>
            </div>

            {/* Task Information */}
            <div className="mt-6 space-y-4">
              {/* Description */}
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Description
                </p>

                <p className="mt-1 text-sm">
                  {selectedTask.description || "No description provided."}
                </p>
              </div>

              {/* Priority + Status */}
              {/* Priority */}
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Priority
                </p>

                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      selectedTask.priority.toLowerCase() === "high"
                        ? "bg-red-500"
                        : selectedTask.priority.toLowerCase() === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />

                  <div>
                    <p
                      className={`font-semibold ${
                        selectedTask.priority.toLowerCase() === "high"
                          ? "text-red-500"
                          : selectedTask.priority.toLowerCase() === "medium"
                            ? "text-yellow-600"
                            : "text-green-500"
                      }`}
                    >
                      {selectedTask.priority} Priority
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Status
                </p>

                <p className="mt-1 text-sm">{selectedTask.status}</p>
              </div>
            </div>

            {/* Label */}
            <div className="mt-4">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Label
              </p>

              <p className="mt-1 text-sm">{selectedTask.label || "No label"}</p>
            </div>

            {/* Due Date */}
            <div className="mt-4">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Due Date
              </p>

              <p className="mt-1 text-sm">
                {selectedTask.due_date
                  ? new Date(
                      `${selectedTask.due_date}T00:00:00`
                    ).toLocaleDateString()
                  : "No due date"}
              </p>
            </div>

            {/* Start Date */}
            {selectedTask.start_date && (
              <div className="mt-4">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Start Date
                </p>

                <p className="mt-1 text-sm">
                  {new Date(
                    `${selectedTask.start_date}T00:00:00`
                  ).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Notes */}
            {selectedTask.notes && (
              <div className="mt-4">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Notes
                </p>

                <p className="mt-1 text-sm whitespace-pre-wrap">
                  {selectedTask.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .fc {
          --fc-border-color: hsl(var(--border));
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: hsl(var(--muted));
          --fc-today-bg-color: rgba(59, 130, 246, 0.08);
          --fc-button-bg-color: transparent;
          --fc-button-border-color: hsl(var(--border));
          --fc-button-text-color: hsl(var(--foreground));
          --fc-button-hover-bg-color: hsl(var(--muted));
          --fc-button-hover-border-color: hsl(var(--border));
          --fc-button-active-bg-color: hsl(var(--muted));
          --fc-button-active-border-color: hsl(var(--border));

          color: hsl(var(--foreground));
        }

        .fc .fc-toolbar-title {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .fc .fc-button {
          border-radius: 8px;
          box-shadow: none;
          text-transform: capitalize;
        }

        .fc .fc-daygrid-day {
          min-height: 110px;
          cursor: pointer;
        }

        /* Monday - Sunday */
        .fc .fc-col-header-cell-cushion {
          color: hsl(var(--foreground)) !important;
          font-weight: 600;
        }

        .fc .fc-daygrid-day-number {
          color: hsl(var(--foreground)) !important;
          padding: 8px;
          font-size: 0.875rem;
        }

        .fc .fc-day-today {
          background: rgba(59, 130, 246, 0.06) !important;
        }

        .fc .fc-event {
          border: none !important;
          border-radius: 6px;
          padding: 3px 7px;
          margin: 2px 4px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
        }

        /* High = Red */
        .fc .priority-high {
          background: #ef4444 !important;
          color: white !important;
        }

        /* Medium = Orange */
        .fc .priority-medium {
          background: #f59e0b !important;
          color: white !important;
        }

        /* Low = Green */
        .fc .priority-low {
          background: #22c55e !important;
          color: white !important;
        }

        .fc .fc-event-title {
          font-weight: 500;
        }

        .fc .fc-daygrid-day:hover {
          background: hsl(var(--muted) / 0.35);
        }
      `}</style>
    </div>
  )
}
