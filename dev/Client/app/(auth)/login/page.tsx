"use client"
import React, { useEffect } from "react"
import SpaceBackground from "@/components/spacebg"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  const handleClick = () => {
    console.log("Login button clicked")

    router.push("/home")
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <SpaceBackground />
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        {/* Brand title OUTSIDE the form */}
        <h1 className="text-center text-3xl font-bold">PlanBuddy</h1>

        {/* Window-style form container */}
        <div className="w-80 rounded-xl border border-white bg-black p-8">
          <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="rounded-lg border border-white/20 bg-black px-4 py-2 outline-none focus:border-white"
            />

            <input
              type="password"
              placeholder="Password"
              className="rounded-lg border border-white/20 bg-black px-4 py-2 outline-none focus:border-white"
            />

            <button
              type="button"
              onClick={handleClick}
              className="mt-2 rounded-lg bg-white py-2 font-medium text-black hover:bg-gray-200"
            >
              Login
            </button>
            <button
              type="button"
              className="mt-2 rounded-lg bg-white py-2 font-medium text-black hover:bg-gray-200"
            >
              Sign Up
            </button>

            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-xs text-white/60">OR</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>

            <button
              type="button"
              className="flex items-center justify-center rounded-lg border border-white py-2 hover:bg-white hover:text-black"
            >
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
