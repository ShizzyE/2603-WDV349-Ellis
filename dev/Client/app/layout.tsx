import type { Metadata } from "next"

import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { ReduxProvider } from "@/redux/provider"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "PlanBuddy | AI-Powered Planning",
    template: "%s | PlanBuddy",
  },
  metadataBase: new URL("https://planbuddy.io"),
  description:
    "PlanBuddy is an AI-powered productivity app that helps users organize tasks, manage schedules, and stay focused on their goals.",
  keywords: [
    "PlanBuddy",
    "AI planning",
    "AI productivity",
    "task management",
    "to-do app",
    "productivity app",
    "task planner",
    "schedule planner",
  ],
  authors: [{ name: "Shawn Ellis" }],
  creator: "Shawn Ellis",
  applicationName: "PlanBuddy",

  openGraph: {
    title: "PlanBuddy | AI-Powered Planning",
    description:
      "Organize tasks, manage schedules, and stay focused with PlanBuddy.",
    siteName: "PlanBuddy",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable
      )}
    >
      <body>
        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}