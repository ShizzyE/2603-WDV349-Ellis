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
    <div className="h-screen flex flex-col">
      <Header title="Ask AI" />

      {/* Window UI */}
      <div className="flex-1 flex items-center justify-center p-5">
        <Card className="w-full max-w-3xl h-[70vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">
          
          {/* Title Bar */}
          <div className="p-3.5 border-b text-center font-bold text-lg">
            Ask PlanBuddy
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {/* Messages will go here */}
            <div className="text-sm text-muted-foreground text-center mt-10">
              Start asking PlanBuddy anything about your tasks...
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t flex gap-2">
            <Input
              placeholder="Ask PlanBuddy..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend()
              }}
            />

            <Button onClick={handleSend}>
              Send
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}