"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { registerUser, loginUser } from "@/lib/user-api"

export default function Page() {
  const router = useRouter()

  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const createAccount = async () => {
    if (!username || !email || !password) {
      alert("Please fill out all fields")
      return
    }

    try {
      await registerUser(username, email, password)

      // Automatically log the user in
      const data = await loginUser(email, password)

      // Store JWT
      localStorage.setItem("access_token", data.access_token)

      console.log("Account created and logged in successfully")

      alert("Account created successfully!")

      router.push("/dashboard")
    } catch (error) {
      console.error("Registration error:", error)

      alert(error instanceof Error ? error.message : "Registration failed")
    }
  }

  const redirectToLogin = () => {
    console.log("Redirected to Login page")

    router.push("/login")
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        {/* Brand title OUTSIDE the form */}
        <h1 className="text-center text-3xl font-bold">PlanBuddy</h1>

        {/* Window-style form container */}
        <div className="w-100 rounded-xl border border-foreground bg-background p-8">
          <h2 className="mb-6 text-center text-2xl font-semibold">Sign Up</h2>

          <form className="flex flex-col gap-4">
            {/* Username */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none hover:shadow-md focus:shadow-lg"
              required
            />

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

            {/* Create Account */}
            <button
              type="button"
              onClick={createAccount}
              className="mt-2 cursor-pointer rounded-lg bg-primary py-2 font-medium text-background hover:bg-primary/90 hover:shadow-md"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-foreground/20" />

              <span className="text-xs text-foreground/60">OR</span>

              <div className="h-px flex-1 bg-foreground/20" />
            </div>

            {/* Login */}
            <button
              type="button"
              onClick={redirectToLogin}
              className="flex cursor-pointer items-center justify-center rounded-lg border border-foreground py-2 hover:shadow-md"
            >
              Login
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center font-mono text-xs text-muted-foreground">
            (Press <kbd className="p-1.5">&quot;d&quot;</kbd> to toggle dark
            mode)
          </div>
        </div>
      </div>
    </div>
  )
}
