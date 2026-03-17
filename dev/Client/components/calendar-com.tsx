"use client"

import React, { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"

export default function CalendarCom() {
   
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Planner Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
      />
    </div>
  )
}
