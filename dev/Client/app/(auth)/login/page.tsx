"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { logIn } from "@/redux/features/auth-slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { loginUser } from "@/lib/user-api"

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const loginToApp = async () => {
    if (!email || !password) {
      alert("Please enter both email and password")
      return
    }

    try {
      // Send login request to FastAPI
      const data = await loginUser(email, password)

      // Store JWT authentication token
      localStorage.setItem(
        "access_token",
        data.access_token
      )

      // Update Redux authentication state
      dispatch(logIn(email))

      console.log("Login successful, redirecting to home page")

      // Redirect to Dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)

      alert(
        error instanceof Error
          ? error.message
          : "Login failed"
      )
    }
  }

  const redirectToSignUp = () => {
    router.push("/")
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">

        {/* Brand title OUTSIDE the form */}
        <h1 className="text-center text-3xl font-bold">
          PlanBuddy
        </h1>

        {/* Window-style form container */}
        <div className="w-100 rounded-xl border border-foreground bg-background p-8">

          <h2 className="mb-6 text-center text-2xl font-semibold">
            Login
          </h2>

          <form className="flex flex-col gap-4">

            {/* Email */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none hover:shadow-md focus:shadow-lg"
              required
            />

            {/* Password */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none hover:shadow-md focus:shadow-lg"
              required
            />

            {/* Login */}
            <button
              type="button"
              onClick={loginToApp}
              className="mt-2 cursor-pointer rounded-lg bg-primary py-2 font-medium text-white hover:bg-primary/90 hover:shadow-md"
            >
              Login
            </button>

            {/* Sign Up */}
            <motion.button
              type="button"
              onClick={redirectToSignUp}
              className="cursor-pointer font-bold text-foreground"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up ?
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-foreground/20" />

              <span className="text-xs text-foreground/60">
                OR
              </span>

              <div className="h-px flex-1 bg-foreground/20" />
            </div>

            {/* Google OAuth - Coming Later */}
            <button
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-lg border border-foreground py-2 hover:shadow-md"
            >
              Continue with Google
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