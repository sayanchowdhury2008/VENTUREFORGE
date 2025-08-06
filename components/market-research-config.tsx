"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ResearchChat } from "@/components/research-chat"
import { Settings, Play, Pause, RotateCcw, Database, Clock, Target, TrendingUp, Users, DollarSign, BarChart3, Globe, Zap } from 'lucide-react'

export function MarketResearchConfig() {
  const [isRunning, setIsRunning] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const researchParameters = [
    {
      title: "MARKET DEPTH",
      description: "HOW DEEP TO ANALYZE MARKET SEGMENTS",
      value: 75,
      options: ["SURFACE", "MODERATE", "DEEP", "COMPREHENSIVE"]
    },
    {
      title: "COMPETITOR ANALYSIS",
      description: "LEVEL OF COMPETITIVE INTELLIGENCE",
      value: 60,
      options: ["BASIC", "STANDARD", "ADVANCED", "ENTERPRISE"]
    },
    {
      title: "TREND SENSITIVITY",
      description: "HOW QUICKLY TO DETECT MARKET CHANGES",
      value: 90,
      options: ["WEEKLY", "DAILY", "HOURLY", "REAL-TIME"]
    },
    {
      title: "DATA SOURCES",
      description: "NUMBER OF INFORMATION CHANNELS",
      value: 85,
      options: ["LIMITED", "STANDARD", "EXTENSIVE", "UNLIMITED"]
    }
  ]

  const activeResearch = [
    {
      id: "1",
      title: "FINTECH DISRUPTION ANALYSIS",
      status: "RUNNING",
      progress: 67,
      timeRemaining: "2H 15M",
      dataPoints: "1,247",
      insights: "89"
    },
    {
      id: "2",
      title: "SUSTAINABLE TECH TRENDS",
      status: "COMPLETED",
      progress: 100,
      timeRemaining: "DONE",
      dataPoints: "3,891",
      insights: "156"
    },
    {
      id: "3",
      title: "AI HEALTHCARE OPPORTUNITIES",
      status: "QUEUED",
      progress: 0,
      timeRemaining: "PENDING",
      dataPoints: "0",
      insights: "0"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "RUNNING": return "bg-yellow-400"
      case "COMPLETED": return "bg-lime-400"
      case "QUEUED": return "bg-red-500 text-white"
      default: return "bg-gray-400"
    }
  }

  return (
    <div className="space-y-8">
      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="brutalist-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="brutalist-text-primary text-2xl flex items-center">
              <Settings className="h-6 w-6 mr-2" />
              RESEARCH PARAMETERS
            </CardTitle>
            <CardDescription className="brutalist-text-secondary">
              CONFIGURE YOUR AUTOMATED MARKET INTELLIGENCE SYSTEM
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {researchParameters.map((param, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="brutalist-text-primary text-sm font-black">{param.title}</h4>
                    <p className="brutalist-text-secondary text-xs">{param.description}</p>
                  </div>
                  <Badge className="brutalist-badge bg-cyan-400">
                    {param.value}%
                  </Badge>
                </div>
                <Progress value={param.value} className="h-2" />
                <div className="flex items-center space-x-2">
                  {param.options.map((option, optIndex) => (
                    <Button
                      key={optIndex}
                      size="sm"
                      variant={optIndex === Math.floor(param.value / 25) ? "default" : "outline"}
                      className={`brutalist-button text-xs ${
                        optIndex === Math.floor(param.value / 25) 
                          ? "bg-yellow-400" 
                          : "bg-white"
                      }`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="brutalist-card">
          <CardHeader>
            <CardTitle className="brutalist-text-primary text-xl">
              SYSTEM CONTROL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button 
                className={`brutalist-button w-full ${isRunning ? "bg-red-500 text-white" : "bg-lime-400"}`}
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" />
                    PAUSE RESEARCH
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    START RESEARCH
                  </>
                )}
              </Button>
              
              <Button variant="outline" className="brutalist-button bg-yellow-400 w-full">
                <RotateCcw className="h-5 w-5 mr-2" />
                RESET CONFIG
              </Button>
              
              <Button 
                variant="outline" 
                className="brutalist-button bg-cyan-400 w-full"
                onClick={() => setShowChat(true)}
              >
                <Zap className="h-5 w-5 mr-2" />
                AI ASSISTANT
              </Button>
            </div>

            <div className="pt-4 border-t-2 border-black space-y-2">
              <div className="flex items-center justify-between">
                <span className="brutalist-text-secondary text-xs">SYSTEM STATUS</span>
                <Badge className={`brutalist-badge ${isRunning ? "bg-lime-400" : "bg-red-500 text-white"}`}>
                  {isRunning ? "ACTIVE" : "IDLE"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="brutalist-text-secondary text-xs">QUEUE SIZE</span>
                <span className="brutalist-text-primary text-xs font-black">3 JOBS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="brutalist-text-secondary text-xs">DAILY QUOTA</span>
                <span className="brutalist-text-primary text-xs font-black">847/1000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Sources */}
      <Card className="brutalist-card">
        <CardHeader>
          <CardTitle className="brutalist-text-primary text-2xl flex items-center">
            <Database className="h-6 w-6 mr-2" />
            DATA SOURCES & FREQUENCY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "MARKET REPORTS", status: "ACTIVE", frequency: "DAILY", sources: 247 },
              { name: "SOCIAL MEDIA", status: "ACTIVE", frequency: "REAL-TIME", sources: 1891 },
              { name: "NEWS FEEDS", status: "ACTIVE", frequency: "HOURLY", sources: 456 },
              { name: "PATENT DATA", status: "PAUSED", frequency: "WEEKLY", sources: 89 }
            ].map((source, index) => (
              <div key={index} className={`brutalist-card p-4 asymmetric-${(index % 3) + 1}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="brutalist-text-primary text-sm font-black">{source.name}</h4>
                  <Badge className={`brutalist-badge ${source.status === "ACTIVE" ? "bg-lime-400" : "bg-red-500 text-white"}`}>
                    {source.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="brutalist-text-secondary text-xs">FREQUENCY</span>
                    <span className="brutalist-text-primary text-xs font-black">{source.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="brutalist-text-secondary text-xs">SOURCES</span>
                    <span className="brutalist-text-primary text-xs font-black">{source.sources}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Research Jobs */}
      <Card className="brutalist-card">
        <CardHeader>
          <CardTitle className="brutalist-text-primary text-2xl flex items-center">
            <BarChart3 className="h-6 w-6 mr-2" />
            ACTIVE RESEARCH JOBS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeResearch.map((job, index) => (
              <div key={job.id} className={`brutalist-card p-4 asymmetric-${(index % 3) + 1}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="brutalist-text-primary text-lg font-black mb-1">{job.title}</h4>
                    <div className="flex items-center space-x-4">
                      <Badge className={`brutalist-badge ${getStatusColor(job.status)}`}>
                        {job.status}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-black" />
                        <span className="brutalist-text-secondary text-sm">{job.timeRemaining}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="brutalist-text-primary text-2xl font-black">{job.progress}%</div>
                    <div className="brutalist-text-secondary text-xs">COMPLETE</div>
                  </div>
                </div>
                
                <Progress value={job.progress} className="h-2 mb-4" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-black" />
                    <div>
                      <div className="brutalist-text-primary text-sm font-black">{job.dataPoints}</div>
                      <div className="brutalist-text-secondary text-xs">DATA POINTS</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-black" />
                    <div>
                      <div className="brutalist-text-primary text-sm font-black">{job.insights}</div>
                      <div className="brutalist-text-secondary text-xs">INSIGHTS</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Research Chat Dialog */}
      <ResearchChat 
        open={showChat} 
        onOpenChange={setShowChat}
      />
    </div>
  )
}
