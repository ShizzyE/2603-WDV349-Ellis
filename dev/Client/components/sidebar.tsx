"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Settings,
  Info,
  LayoutDashboard,
  Calendar,
  Notebook,
  Menu,
  Bot,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useAppSelector } from "@/redux/store"

export default function Sidebar() {
  const user = useAppSelector((state) => state.auth.value)
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 right-0 left-0 z-40 flex items-center justify-between border-b bg-background p-4 md:hidden">
        <h1 className="text-xl font-bold">PlanBuddy</h1>

        <button onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-64 transform flex-col border-r border-border bg-sidebar p-6 text-foreground transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:static md:flex md:translate-x-0`}
      >
        {/* Mobile Close Button */}
        <div className="mb-6 flex justify-end md:hidden">
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Logo */}
        <h1 className="mb-10 text-2xl font-bold">PlanBuddy</h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 text-lg">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-white/10 hover:shadow-lg"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

           <Link
            href="/dashboard/ask-ai"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-white/10 hover:shadow-lg md:hidden"
          >
            <Bot size={20} />
            Ask AI
          </Link>

          <Link
            href="/dashboard/calendar"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-white/10 hover:shadow-lg"
          >
            <Calendar size={20} />
            Calendar
          </Link>

          <Link
            href="/dashboard/planning"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-white/10 hover:shadow-lg"
          >
            <Notebook size={20} />
            Planning
          </Link>

          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-white/10 hover:shadow-lg"
          >
            <Info size={20} />
            About
          </Link>

          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-white/10 hover:shadow-lg"
          >
            <Settings size={20} />
            Settings
          </Link>
        </nav>

        {/* User Card */}
        <div className="mt-auto">
          <Card className="flex items-center gap-3 p-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {user.isAuth ? user.username.slice(0, 2).toUpperCase() : "GU"}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col text-sm">
              <span className="font-semibold">
                {user.isAuth ? user.username : "Guest"}
              </span>

              <span className="text-xs text-muted-foreground">
                {user.isAuth ? "Logged in" : "Not logged in"}
              </span>
            </div>
          </Card>
        </div>
      </aside>
    </>
  )
}
