import React from 'react'
import { Avatar } from '@/components/ui/avatar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        Dashboard Menu
        <Avatar>
          <img src="https://github.com/shadcn.png" alt="User Avatar" />
        </Avatar>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}