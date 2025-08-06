"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { JobCard } from "@/components/job-card"
import { BrainstormValidate } from "@/components/brainstorm-validate"
import { MarketResearchConfig } from "@/components/market-research-config"
import { CreateJobDialog } from "@/components/create-job-dialog"
import { Search, Plus, TrendingUp, Target, Zap, Users, Settings, LogOut, Home, Lightbulb, BarChart3, FileText, User } from 'lucide-react'

export function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const sidebarItems = [
    { id: "dashboard", label: "DASHBOARD", icon: Home },
    { id: "brainstorm", label: "BRAINSTORM", icon: Lightbulb },
    { id: "research", label: "RESEARCH", icon: BarChart3 },
    { id: "reports", label: "REPORTS", icon: FileText },
    { id: "profile", label: "PROFILE", icon: User },
  ]

  const mockJobs = [
    {
      id: "1",
      title: "AI-POWERED FITNESS APP",
      description: "PERSONALIZED WORKOUT PLANS USING MACHINE LEARNING",
      status: "ANALYZING" as const,
      progress: 75,
      successProbability: 78,
      marketSize: "$2.8B",
      competition: "MEDIUM",
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      title: "SUSTAINABLE FOOD DELIVERY",
      description: "ECO-FRIENDLY PACKAGING AND CARBON-NEUTRAL DELIVERY",
      status: "COMPLETED" as const,
      progress: 100,
      successProbability: 65,
      marketSize: "$150B",
      competition: "HIGH",
      createdAt: "2024-01-10"
    },
    {
      id: "3",
      title: "REMOTE WORK PRODUCTIVITY TOOL",
      description: "TEAM COLLABORATION PLATFORM FOR DISTRIBUTED TEAMS",
      status: "PENDING" as const,
      progress: 25,
      successProbability: 82,
      marketSize: "$4.1B",
      competition: "MEDIUM",
      createdAt: "2024-01-20"
    }
  ]

  const renderContent = () => {
    switch (activeView) {
      case "brainstorm":
        return <BrainstormValidate />
      case "research":
        return <MarketResearchConfig />
      case "dashboard":
      default:
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "TOTAL PROJECTS", value: "12", icon: Target, color: "bg-yellow-400" },
                { title: "SUCCESS RATE", value: "73%", icon: TrendingUp, color: "bg-lime-400" },
                { title: "MARKET VALUE", value: "$2.1B", icon: Zap, color: "bg-cyan-400" },
                { title: "ACTIVE RESEARCH", value: "5", icon: Users, color: "bg-red-500" }
              ].map((stat, index) => (
                <Card key={index} className={`brutalist-card asymmetric-${(index % 3) + 1}`}>
                  <CardHeader className="pb-2">
                    <div className={`w-12 h-12 ${stat.color} border-2 border-black flex items-center justify-center harsh-shadow-sm`}>
                      <stat.icon className="h-6 w-6 text-black" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="brutalist-text-primary text-3xl font-black mb-1">
                      {stat.value}
                    </div>
                    <p className="brutalist-text-secondary text-sm">
                      {stat.title}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Search and Create */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
                <Input
                  placeholder="SEARCH PROJECTS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="brutalist-input pl-12"
                />
              </div>
              <Button 
                onClick={() => setShowCreateDialog(true)}
                className="brutalist-button"
              >
                <Plus className="h-5 w-5 mr-2" />
                NEW PROJECT
              </Button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockJobs.map((job, index) => (
                <JobCard key={job.id} job={job} className={`asymmetric-${(index % 3) + 1}`} />
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="brutalist-sidebar w-64 p-6">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-black border-2 border-black transform rotate-12"></div>
            <h1 className="brutalist-text-primary text-xl text-white">VENTUREFORGE</h1>
          </div>
          <p className="text-white font-bold text-sm">FORGE YOUR FUTURE</p>
        </div>

        <nav className="space-y-2 mb-8">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left font-bold uppercase tracking-wide transition-all duration-200 border-2 ${
                activeView === item.id
                  ? "bg-yellow-400 text-black border-black harsh-shadow-sm"
                  : "text-white border-transparent hover:bg-black hover:border-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="border-t-2 border-white pt-4 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-white font-bold uppercase tracking-wide hover:bg-black border-2 border-transparent hover:border-white transition-all duration-200">
            <Settings className="h-5 w-5" />
            <span>SETTINGS</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-white font-bold uppercase tracking-wide hover:bg-black border-2 border-transparent hover:border-white transition-all duration-200">
            <LogOut className="h-5 w-5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="brutalist-header px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="brutalist-text-primary text-3xl">
                {activeView === "dashboard" && "DASHBOARD"}
                {activeView === "brainstorm" && "BRAINSTORM & VALIDATE"}
                {activeView === "research" && "MARKET RESEARCH"}
                {activeView === "reports" && "REPORTS"}
                {activeView === "profile" && "PROFILE"}
              </h1>
              <p className="brutalist-text-secondary">
                {activeView === "dashboard" && "MONITOR YOUR VENTURE PORTFOLIO"}
                {activeView === "brainstorm" && "DISCOVER AND VALIDATE NEW OPPORTUNITIES"}
                {activeView === "research" && "CONFIGURE AUTOMATED MARKET ANALYSIS"}
                {activeView === "reports" && "ANALYZE YOUR VENTURE PERFORMANCE"}
                {activeView === "profile" && "MANAGE YOUR ACCOUNT SETTINGS"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="brutalist-badge">
                PREMIUM USER
              </Badge>
              <div className="w-10 h-10 bg-lime-400 border-2 border-black harsh-shadow-sm flex items-center justify-center">
                <User className="h-6 w-6 text-black" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          {renderContent()}
        </main>
      </div>

      {/* Create Job Dialog */}
      <CreateJobDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      />
    </div>
  )
}
