"use client"

import React, { useEffect } from "react"
import { store } from "./store"
import { Provider } from "react-redux"
import { logIn } from "./features/auth-slice"
import { getCurrentUser } from "@/lib/user-api"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("access_token")

      if (!token) return

      try {
        const currentUser = await getCurrentUser()

        store.dispatch(
          logIn({
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
          })
        )
      } catch (error) {
        console.error("Failed to restore user:", error)
        localStorage.removeItem("access_token")
      }
    }

    restoreUser()
  }, [])

  return <Provider store={store}>{children}</Provider>
}
