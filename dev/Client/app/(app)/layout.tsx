"use client"
import React from "react"
import Sidebar from "@/components/sidebar"
import AIPanel from "@/components/aipanel"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
      <AIPanel />
    </div>
  )
}
