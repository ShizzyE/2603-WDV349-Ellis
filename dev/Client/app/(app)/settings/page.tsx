"use client"

import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [username, setUsername] = useState("Username")
  const [password, setPassword] = useState("password123")


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


  const saveChanges = () => {
    console.log({
      username,
      password,
    })

    // Send update request here
  }


  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-6">

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>
            Appearance
          </CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Dark Mode
            </p>

            <p className="text-sm text-muted-foreground">
              Press "D" to toggle theme
            </p>
          </div>

          <Switch
            checked={darkMode}
            onCheckedChange={toggleTheme}
          />
        </CardContent>
      </Card>


      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle>
            Account Settings
          </CardTitle>
        </CardHeader>


        <CardContent className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <Label>
              Username
            </Label>

            <Input
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />
          </div>


          <div className="flex flex-col gap-2">
            <Label>
              Password
            </Label>

            <div className="relative">

              <Input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />


              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >

                {showPassword ? (
                  <EyeOff size={18}/>
                ) : (
                  <Eye size={18}/>
                )}

              </button>

            </div>
          </div>


          <Button
            onClick={saveChanges}
          >
            Save Changes
          </Button>


        </CardContent>
      </Card>

    </div>
  )
}