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
      <aside className="w-64 border-r border-border bg-sidebar text-foreground flex flex-col p-6">

        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold mb-10">
          PlanBuddy
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-6 text-lg">

          <Link
            href="/dashboard"
            className="hover:text-accent transition-colors"
          >
            Dashboard
          </Link>

          <Link
            href="/about"
            className="hover:text-accent transition-colors"
          >
            About
          </Link>

          <Link
            href="/settings"
            className="hover:text-accent transition-colors"
          >
            Settings
          </Link>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  )
}
