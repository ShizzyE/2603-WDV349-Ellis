"use client"

import React, { useState } from "react"

import { sendAIMessage } from "@/lib/ai-api"

export default function AIPanel() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSend = async () => {
    if (!prompt.trim() || loading) return

    const userPrompt = prompt.trim()

    setPrompt("")
    setError("")
    setLoading(true)

    try {
      const aiResponse = await sendAIMessage(userPrompt)

      setResponse(aiResponse)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <aside className="hidden flex-col border-l border-border bg-background p-4 md:flex md:w-48 lg:w-56 xl:w-64 2xl:w-80">
      <h2 className="mb-4 text-lg font-semibold">AI Assistant</h2>

      {/* AI Response */}
      <div className="mb-4 flex-1 overflow-y-auto text-sm">
        {loading ? (
          <p className="text-muted-foreground">PlanBuddy is thinking...</p>
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : (
          <p className="whitespace-pre-wrap">
            {response || "Ask me anything about your tasks..."}
          </p>
        )}
      </div>

      {/* Input */}
      <div className="flex flex-col gap-2">
        <textarea
          value={prompt}
          disabled={loading}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Type your prompt..."
          rows={3}
          className="w-full resize-none rounded-lg border border-border bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          onClick={handleSend}
          disabled={loading || !prompt.trim()}
          className="rounded-lg bg-primary py-2 text-sm text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </aside>
  )
}
