"use client"

import React, { useState } from "react"

import Header from "@/components/header"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { sendAIMessage } from "@/lib/ai-api"

// Message interface for chat messages
interface Message {
  // Roles are for differentiating between user and assistant messages
  role: "user" | "assistant"
  content: string
}

export default function AskAI() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()

    setInput("")
    setError("")

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ])

    setLoading(true)

    try {
      const response = await sendAIMessage(userMessage)

      // Add the assistant's response to the chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
        },
      ])
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Oops something went wrong."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <Header title="Ask AI" />

      <div className="flex flex-1 items-center justify-center p-5">
        <Card className="flex h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-xl">

          {/* Title Bar */}
          <div className="border-b p-3.5 text-center text-lg font-bold">
            Ask PlanBuddy
          </div>

          {/* Chat Area */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">

            {messages.length === 0 && (
              <div className="mt-10 text-center text-sm text-muted-foreground">
                Start asking PlanBuddy anything about your tasks...
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-muted px-4 py-2 text-sm">
                  PlanBuddy is thinking...
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex gap-2 border-t p-4">
            <Input
              placeholder="Ask PlanBuddy..."
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend()
                }
              }}
            />

            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              {loading ? "..." : "Send"}
            </Button>
          </div>

        </Card>
      </div>
    </div>
  )
}