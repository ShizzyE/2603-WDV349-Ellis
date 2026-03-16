"use client"
import React from "react"
import { Button } from "@/components/ui/button"

export default function Planning() {
  return (
    <div className="flex min-h-svh flex-col p-4 sm:p-6">

      {/* Header */}
      <div className="relative flex items-center justify-center mb-8 sm:mb-10">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          Planning
        </h1>

        {/* Logout Button */}
        <Button
          className="absolute right-0 text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2"
          variant={"destructive"}
        >
          Logout
        </Button>

      </div>

      {/* Page Content */}
      <div className="flex flex-col gap-4 text-sm sm:text-base leading-loose">
        Planning Page Content
      </div>

    </div>
  )
}