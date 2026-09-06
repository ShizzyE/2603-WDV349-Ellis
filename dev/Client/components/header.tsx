"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { logOut } from "@/redux/features/auth-slice"
import { AppDispatch } from "@/redux/store"

export default function Header({ title }: { title: string }) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logOut())
    router.push("/login")
  }

  return (
    <div className="flex flex-col p-4 sm:p-6">
      <div className="relative mb-8 flex items-center justify-center sm:mb-10">
        <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          {title}
        </h1>

        <Button
          onClick={handleLogout}
          className="absolute right-0"
          variant="destructive"
        >
          Logout
        </Button>
      </div>
    </div>
  )
}