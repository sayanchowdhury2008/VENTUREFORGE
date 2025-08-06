"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <LandingPage onSignIn={() => setIsAuthenticated(true)} />
  }

  return <Dashboard />
}
