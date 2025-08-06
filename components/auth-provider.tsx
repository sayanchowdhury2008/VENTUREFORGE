"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  user: { name: string; email: string } | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const signIn = async (email: string, password: string) => {
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsAuthenticated(true)
    setUser({ name: "John Doe", email })
  }

  const signOut = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
