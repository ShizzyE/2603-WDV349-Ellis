"use client"
import React from "react"
import Header from "@/components/header"
import CalendarCom from "@/components/calendar-com"

export default function Calendar() {
  return (
    <div>
      <Header title="Calendar" />

      <div>
        <CalendarCom  />
      </div>
    </div>
  )
}
