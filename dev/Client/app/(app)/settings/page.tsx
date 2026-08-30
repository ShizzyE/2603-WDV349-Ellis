"use client"

import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import {
  getCurrentUser,
  updateCurrentUser,
  changePassword,
} from "@/lib/user-api"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const [saving, setSaving] = useState(false)

  const [message, setMessage] = useState("")

  const [username, setUsername] = useState("")

  const [currentPassword, setCurrentPassword] = useState("")

  const [newPassword, setNewPassword] = useState("")

  // Toggle dark mode
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev

      if (newMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }

      return newMode
    })
  }

  // Keyboard shortcut: Press D
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "d") {
        toggleTheme()
      }
    }

    window.addEventListener("keydown", handleKey)

    return () => {
      window.removeEventListener("keydown", handleKey)
    }
  }, [])

  // Load current user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser()

        setUsername(user.username)
      } catch (error) {
        console.error(error)
      }
    }

    loadUser()
  }, [])

  // Save username/password
  const saveChanges = async () => {
    setMessage("")

    if (!username.trim()) {
      setMessage("Username cannot be empty.")
      return
    }

    if (newPassword && newPassword.length < 8) {
      setMessage("New password must be at least 8 characters.")
      return
    }

    if (newPassword && !currentPassword) {
      setMessage("Enter your current password to change your password.")
      return
    }

    setSaving(true)

    try {
      // Update username
      await updateCurrentUser(username.trim())

      // Update password if requested
      if (newPassword) {
        await changePassword(currentPassword, newPassword)
      }

      setCurrentPassword("")
      setNewPassword("")

      setMessage("Changes saved successfully.")
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to save changes."
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
      {/* Appearance */}

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium">Dark Mode</p>

            <p className="text-sm text-muted-foreground">
              Press &quot;D&quot; to toggle theme
            </p>
          </div>

          <Switch checked={darkMode} onCheckedChange={toggleTheme} />
        </CardContent>
      </Card>

      {/* Account */}

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          {/* Username */}

          <div className="flex flex-col gap-2">
            <Label>Change Username</Label>

            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          {/* Current Password */}

          <div className="flex flex-col gap-2">
            <Label>Current Password</Label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}

          <div className="flex flex-col gap-2">
            <Label>New Password</Label>

            <Input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          {/* Status message */}

          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}

          <Button onClick={saveChanges} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
