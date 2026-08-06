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
    <aside className="hidden flex-col border-l border-border bg-background p-4 md:flex md:w-48 lg:w-56 xl:w-64 2xl:w-80">
      {" "}
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
