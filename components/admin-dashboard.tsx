"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Activity, DollarSign, TrendingUp, Server, AlertTriangle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [systemHealth, setSystemHealth] = useState<any>(null)
  const [recentUsers, setRecentUsers] = useState<any[]>([])

  useEffect(() => {
    // Simulate loading admin data
    setTimeout(() => {
      setStats({
        totalUsers: 12847,
        activeUsers: 3421,
        totalJobs: 45623,
        completedJobs: 42156,
        revenue: 89420,
        conversionRate: 23.4,
      })

      setSystemHealth({
        apiStatus: "healthy",
        dbStatus: "healthy",
        aiServiceStatus: "warning",
        cpuUsage: 67,
        memoryUsage: 45,
        diskUsage: 23,
        responseTime: 145,
      })

      setRecentUsers([
        { id: 1, email: "john@example.com", joinDate: "2024-01-15", jobs: 5, status: "active" },
        { id: 2, email: "sarah@startup.com", joinDate: "2024-01-14", jobs: 12, status: "premium" },
        { id: 3, email: "mike@venture.io", joinDate: "2024-01-13", jobs: 3, status: "active" },
        { id: 4, email: "lisa@tech.com", joinDate: "2024-01-12", jobs: 8, status: "active" },
        { id: 5, email: "david@innovation.co", joinDate: "2024-01-11", jobs: 15, status: "premium" },
      ])
    }, 1000)
  }, [])

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Server className="h-8 w-8 text-orange-500 mr-3" />
              <h1 className="text-2xl font-bold text-white">
                VentureForge <span className="text-orange-500">Admin</span>
              </h1>
            </div>
            <Badge variant="secondary" className="bg-red-500/20 text-red-300">
              ADMIN ACCESS
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-400">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-400">+8% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Jobs</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalJobs.toLocaleString()}</div>
              <p className="text-xs text-gray-400">+25% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-gray-400">+18% from last month</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Server className="h-5 w-5 mr-2 text-orange-500" />
                System Health Monitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">API Service</span>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Database</span>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">AI Service</span>
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">CPU Usage</span>
                      <span className="text-white">{systemHealth.cpuUsage}%</span>
                    </div>
                    <Progress value={systemHealth.cpuUsage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Memory</span>
                      <span className="text-white">{systemHealth.memoryUsage}%</span>
                    </div>
                    <Progress value={systemHealth.memoryUsage} className="h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Disk Usage</span>
                      <span className="text-white">{systemHealth.diskUsage}%</span>
                    </div>
                    <Progress value={systemHealth.diskUsage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Response Time</span>
                      <span className="text-white">{systemHealth.responseTime}ms</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">99.8%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                  <div className="text-xs text-gray-500 mt-2">Last 30 days</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Users */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-400" />
                Recent User Activity
              </CardTitle>
              <CardDescription>Latest user registrations and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{user.email.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.email}</div>
                        <div className="text-gray-400 text-sm">Joined {user.joinDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-white font-bold">{user.jobs}</div>
                        <div className="text-gray-400 text-xs">Jobs</div>
                      </div>
                      <Badge
                        variant={user.status === "premium" ? "default" : "secondary"}
                        className={user.status === "premium" ? "bg-orange-500" : ""}
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
