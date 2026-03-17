"use client"
import React from "react"
import Link from "next/link"

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
            className="transition-colors hover:text-accent"
          >
            Dashboard
          </Link>

          <Link href="/about" className="transition-colors hover:text-accent">
            About
          </Link>

          <Link
            href="/settings"
            className="transition-colors hover:text-accent"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
