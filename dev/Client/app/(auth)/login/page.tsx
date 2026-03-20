"use client"
import { Button } from "@/components/ui/button"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function Login() {
  const router = useRouter()

  const handleClick = () => {
    console.log("Account created, redirecting to home page")

    router.push("/home")
  }

  const redirectToSignUp = () => {
    console.log("Redirected to Sign up page")

    router.push("/")
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        {/* Brand title OUTSIDE the form */}
        <h1 className="text-center text-3xl font-bold">PlanBuddy</h1>

        {/* Window-style form container */}
        <div className="w-100 rounded-xl border border-foreground bg-background p-8">
          <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none hover:shadow-md focus:shadow-lg"
            />

            <input
              type="password"
              placeholder="Password"
              className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none hover:shadow-md focus:shadow-lg"
            />

            <button
              type="button"
              onClick={handleClick}
              className="mt-2 cursor-pointer rounded-lg bg-primary py-2 font-medium text-white hover:bg-primary/90 hover:shadow-md"
            >
              Login
            </button>

            <motion.button
              type="button"
              onClick={redirectToSignUp}
              className="cursor-pointer font-bold text-foreground"
              whileHover={{ scale: 1.10 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up ?
            </motion.button>

            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-foreground/20" />
              <span className="text-xs text-foreground/60">OR</span>
              <div className="h-px flex-1 bg-foreground/20" />
            </div>

            <button
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-lg border border-foreground py-2 hover:shadow-md"
            >
              Continue with Google {/* Add Google icon here */}
            </button>
          </form>
          <div className="mt-4 flex items-center justify-center font-mono text-xs text-muted-foreground">
            (Press <kbd className="p-1.5">"d"</kbd> to toggle dark mode)
          </div>
        </div>
      </div>
    </div>
  )
}
