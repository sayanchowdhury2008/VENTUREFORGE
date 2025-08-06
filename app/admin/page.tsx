"use client"

import { AdminDashboard } from "@/components/admin-dashboard"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Simple admin check - in real app, check user role
    if (!user || user.email !== "admin@ventureforge.com") {
      router.push("/")
    }
  }, [user, router])

  if (!user || user.email !== "admin@ventureforge.com") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return <AdminDashboard />
}
