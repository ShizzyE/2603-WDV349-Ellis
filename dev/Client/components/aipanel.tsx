"use client"

import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { sendAIMessage } from "@/lib/ai-api"

type Message = {
  role: "user" | "assistant" | "error"
  content: string
}

export default function AIPanel() {
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!prompt.trim() || loading) return

    const userPrompt = prompt.trim()

    setPrompt("")
    setLoading(true)

    // Add user's message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userPrompt,
      },
    ])

    try {
      const aiResponse = await sendAIMessage(userPrompt)

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiResponse,
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          content:
            error instanceof Error ? error.message : "Something went wrong.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <aside className="hidden flex-col border-l border-border bg-background p-4 md:flex md:w-48 lg:w-56 xl:w-64 2xl:w-80">
      <h2 className="m-auto mb-4 text-lg font-semibold">AI Assistant</h2>

      {/* Chat Messages */}
      <div className="mb-4 flex flex-1 flex-col gap-3 overflow-y-auto text-sm">
        {messages.length === 0 && !loading && (
          <p className="text-muted-foreground">
            Ask me anything about your tasks...
          </p>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] min-w-0 overflow-hidden rounded-lg px-3 py-2 ${
                message.role === "user"
                  ? "bg-primary text-white"
                  : message.role === "error"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-foreground"
              }`}
            >
              {/* AI and Error response styling */}
              <div className="max-w-full min-w-0 text-sm leading-6 break-words">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="mb-3 text-xl font-bold">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mt-4 mb-2 text-lg font-semibold">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mt-3 mb-2 font-semibold">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-3 last:mb-0">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-3 list-disc space-y-1 pl-5">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-3 list-decimal space-y-1 pl-5">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li>{children}</li>,
                    strong: ({ children }) => (
                      <strong className="font-semibold">{children}</strong>
                    ),
                    code: ({ children }) => (
                      <code className="rounded bg-black/10 px-1 py-0.5 text-xs">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="my-3 overflow-x-auto rounded-lg bg-black/10 p-3 text-xs">
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {/* Loading Bubble */}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-muted px-3 py-2">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            </div>
          </div>
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
