"use client"
import React from "react"
import Link from "next/link"
import { Settings, Info, LayoutDashboard } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-border bg-sidebar p-6 text-foreground">
        {/* Logo / Brand */}
        <h1 className="mb-10 text-2xl font-bold">PlanBuddy</h1>

        {/* Navigation */}
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
