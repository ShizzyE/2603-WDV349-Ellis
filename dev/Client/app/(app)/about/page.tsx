"use client"

import React from "react"
import Image from "next/image"
import Header from "@/components/header"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import picture from "@/app/(app)/about/assets/pfp-shawn.jpeg"

import {
  Bot,
  Calendar,
  CheckCircle,
} from "lucide-react"


export default function About() {
  return (
    <div>
      <Header title="About" />

      <main className="mx-auto flex max-w-5xl flex-col gap-8 p-4 sm:p-6">

        {/* Introduction */}
        <Card>
          <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row">

            {/* Image */}
            <div className="relative h-48 w-48 overflow-hidden rounded-full border">
              <Image
                src={picture}
                alt="Shawn's Profile Picture"
                fill
                className="object-cover"
              />
            </div>


            {/* Overview */}
            <div className="flex flex-col gap-3 text-center md:text-left">

              <h2 className="text-2xl font-bold">
                About PlanBuddy
              </h2>

              <p className="text-muted-foreground">
                PlanBuddy is a productivity application designed to help
                users organize their tasks, manage their schedules, and
                stay focused on their goals.
              </p>

              <p className="text-muted-foreground">
                The goal of PlanBuddy is to combine simple planning tools
                with AI-powered assistance to make managing daily
                responsibilities easier and more efficient.
              </p>

            </div>

          </CardContent>
        </Card>


        {/* Features */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* AI Assistant */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot size={24} />
                AI Assistant
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">
                PlanBuddy's AI assistant helps users brainstorm ideas,
                organize tasks, create plans, and receive helpful
                suggestions based on their goals.
              </p>
            </CardContent>
          </Card>


          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={24} />
                Smart Calendar
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">
                The calendar feature allows users to schedule tasks,
                track important deadlines, and visualize their upcoming
                responsibilities.
              </p>
            </CardContent>
          </Card>

        </div>


        {/* Goals */}
        <Card>
          <CardHeader>
            <CardTitle>
              PlanBuddy Features
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">

            <div className="flex items-center gap-2">
              <CheckCircle size={20}/>
              <span>
                Task organization and priority management
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle size={20}/>
              <span>
                AI-powered planning assistance
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle size={20}/>
              <span>
                Calendar scheduling and deadline tracking
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle size={20}/>
              <span>
                Personalized user preferences and themes
              </span>
            </div>

          </CardContent>
        </Card>


      </main>
    </div>
  )
}