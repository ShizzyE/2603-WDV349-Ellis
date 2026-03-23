"use client"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { logIn, logOut } from "@/redux/features/auth-slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"

export default function Page() {
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()

  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const redirectToHome = () => {
    console.log("Logged in, redirecting to home page")

    dispatch(logIn(username)) // Update Redux state with username
    router.push("/home")
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
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none hover:shadow-md focus:shadow-lg"
            />

            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none hover:shadow-md focus:shadow-lg"
            />

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none hover:shadow-md focus:shadow-lg"
            />

            <button
              type="button"
              onClick={redirectToHome}
              className="mt-2 cursor-pointer rounded-lg bg-primary py-2 font-medium text-background hover:bg-primary/90 hover:shadow-md"
            >
              Create Account
            </button>

            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-foreground/20" />
              <span className="text-xs text-foreground/60">OR</span>
              <div className="h-px flex-1 bg-foreground/20" />
            </div>

            <button
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-lg border border-foreground py-2 hover:shadow-md"
              onClick={redirectToLogin}
            >
              Login
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
