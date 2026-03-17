"use client"
import React, { useState } from "react"
import Header from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AskAI() {
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    console.log(input)
    setInput("")
  }

  return (
    <div className="flex h-screen flex-col">
      <Header title="Ask AI" />

      {/* Window UI */}
      <div className="flex flex-1 items-center justify-center p-5">
        <Card className="flex h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-xl">
          {/* Title Bar */}
          <div className="border-b p-3.5 text-center text-lg font-bold">
            Ask PlanBuddy
          </div>

          {/* Chat Area */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {/* Messages will go here */}
            <div className="mt-10 text-center text-sm text-muted-foreground">
              Start asking PlanBuddy anything about your tasks...
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-2 border-t p-4">
            <Input
              placeholder="Ask PlanBuddy..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend()
              }}
            />

            <Button onClick={handleSend}>Send</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
