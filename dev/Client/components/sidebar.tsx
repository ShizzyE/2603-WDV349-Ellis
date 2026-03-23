"use client"
import React from "react"
import Link from "next/link"
import { Settings, Info, LayoutDashboard } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useAppSelector } from "@/redux/store"

export default function Sidebar() {
  const user = useAppSelector((state) => state.auth.value)

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 flex-col border-r border-border bg-sidebar p-6 text-foreground">
        {/* Logo */}
        <h1 className="mb-10 text-2xl font-bold">PlanBuddy</h1>

        {/* Nav */}
        <nav className="flex flex-col gap-6 text-lg">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-white/10 hover:shadow-lg"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>

          <Link
            href="/about"
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-white/10 hover:shadow-lg"
          >
            <Info size={20} />
            About
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-white/10 hover:shadow-lg"
          >
            <Settings size={20} /> Settings
          </Link>
        </nav>

        {/* 👇 Pushes this to bottom */}
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
    </div>
  )
}
