"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Bot, Notebook, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { logOut } from "@/redux/features/auth-slice"
import { AppDispatch } from "@/redux/store"

const MotionLink = motion(Link)

export default function Header({ title }: { title: string }) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logOut()) //  clear redux state
    router.push("/login") //  redirect to login
  }

  const links = [
    { icon: Calendar, href: "/dashboard/calendar" },
    { icon: Notebook, href: "/dashboard/planning" },
    { icon: Bot, href: "/dashboard/ask-ai" },
  ]

  return (
    <div className="flex flex-col p-4 sm:p-6">
      <div className="relative mb-8 flex items-center justify-center sm:mb-10">
        
        {/* LEFT NAV */}
        <div className="absolute left-0 flex flex-row gap-4">
          {links.map((link, index) => {
            const Icon = link.icon

            return (
              <MotionLink
                key={index}
                href={link.href}
                className="relative flex items-center justify-center rounded-lg p-2 transition hover:bg-white/10 hover:shadow-lg"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={28} />

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
          onClick={handleLogout}
          className="absolute right-0 px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base"
          variant="destructive"
        >
          Logout
        </Button>
      </div>
    </div>
  )
}