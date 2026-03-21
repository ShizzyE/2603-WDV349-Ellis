"use client"
import React, { useState } from "react"

export default function AIPanel() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")

  const handleSend = async () => {
    console.log("Sending prompt:", prompt)

    // TEMP fake response
    setResponse("AI response will show here...")
  }

  return (
    <aside className="flex w-80 flex-col border-l border-border bg-background p-4">
      <h2 className="mb-4 text-lg font-semibold">AI Assistant</h2>

      <div className="mb-4 flex-1 overflow-y-auto text-sm">
        {response || "Ask me anything about your tasks..."}
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt..."
          className="w-full rounded-lg border border-border p-2 outline-none"
        />

        <button
          onClick={handleSend}
          className="rounded-lg bg-primary py-2 text-white"
        >
          Send
        </button>
      </div>
    </aside>
  )
}
