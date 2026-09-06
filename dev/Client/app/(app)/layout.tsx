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
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
      <AIPanel />
    </div>
  )
}
