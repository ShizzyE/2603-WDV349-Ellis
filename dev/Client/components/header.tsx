"use client"
import React from "react"
import { Button } from "@/components/ui/button"


export default function Header({title}: {title: string}) {
  return (
    <div className="flex flex-col p-4 sm:p-6">
      {/* Header */}
      <div className="relative mb-8 flex items-center justify-center sm:mb-10">
        {/* Title */}
        <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          {title}
        </h1>

        {/* Logout Button */}
        <Button
          className="absolute right-0 px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base"
          variant={"destructive"}
        >
          Logout
        </Button>
      </div>

      {/* Page Content */}
      {/* <div className="flex flex-col gap-4 text-sm leading-loose sm:text-base">
        Dashboard Page Content
      </div> */}
    </div>
  )
}
