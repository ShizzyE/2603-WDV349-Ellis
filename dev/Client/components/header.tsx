"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Bot, Notebook, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const MotionLink = motion(Link)

export default function Header({ title }: { title: string }) {
  const links = [
    { icon: Calendar, href: "/dashboard/calendar" },
    { icon: Notebook, href: "/dashboard/planning" },
    { icon: Bot, href: "/dashboard/ask-ai" },
  ]

  return (
    <div className="flex flex-col p-4 sm:p-6">
      {/* Header */}
      <div className="relative mb-8 flex items-center justify-center sm:mb-10">

        {/* LEFT ICON NAV */}
        <div className="absolute left-0 flex flex-row gap-4">
          {links.map((link, index) => {
            const Icon = link.icon

            return (
              <MotionLink
                key={index}
                href={link.href}
                className="relative flex items-center justify-center p-2 rounded-lg hover:bg-white/10 hover:shadow-lg transition"
                whileHover="hover"
              >
                <Icon size={28} />

                {/* Animated underline */}
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--foreground)]"
                  initial={{ scaleX: 0 }}
                  variants={{
                    hover: { scaleX: 1 },
                  }}
                  style={{ transformOrigin: "left" }}
                  transition={{ duration: 0.25 }}
                />
              </MotionLink>
            )
          })}
        </div>

        {/* TITLE */}
        <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          {title}
        </h1>

        {/* LOGOUT */}
        <Button
          className="absolute right-0 px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base"
          variant="destructive"
        >
          Logout
        </Button>

      </div>
    </div>
  )
}