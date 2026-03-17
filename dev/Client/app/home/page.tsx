"use client"
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const MotionLink = motion(Link)

export default function Home() {
  const links = [
    { name: "Settings", href: "/settings" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "About", href: "/about" },
  ]

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6">
      {/* Brand */}
      <h1 className="bg-[linear-gradient(365deg,#1100CD,#00A1FF)] bg-clip-text text-center text-8xl font-bold text-transparent">
        PlanBuddy
      </h1>

      {/* Navigation */}
      <nav className="mt-12 flex justify-center gap-12 text-xl font-semibold">
        {links.map((link) => (
          <MotionLink
            key={link.name}
            href={link.href}
            className="relative overflow-hidden text-2xl px-2 py-1"
            whileHover="hover"
            
          >
            {link.name}

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
        ))}
      </nav>
    </div>
  )
}
