"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, TrendingUp, BarChart3, Calendar, Globe } from 'lucide-react'

interface TrendAnalysisDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TrendAnalysisDialog({ open, onOpenChange }: TrendAnalysisDialogProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("3M")

  if (!open) return null

  const trendData = [
    {
      category: "AI & MACHINE LEARNING",
      growth: "+156%",
      momentum: 94,
      opportunities: 247,
      hotTopics: ["GENERATIVE AI", "COMPUTER VISION", "NLP"]
    },
    {
      category: "SUSTAINABLE TECH",
      growth: "+89%",
      momentum: 78,
      opportunities: 189,
      hotTopics: ["CARBON CAPTURE", "RENEWABLE ENERGY", "CIRCULAR ECONOMY"]
    },
    {
      category: "REMOTE WORK TOOLS",
      growth: "+67%",
      momentum: 85,
      opportunities: 156,
      hotTopics: ["VIRTUAL COLLABORATION", "PRODUCTIVITY", "WELLNESS"]
    },
    {
      category: "FINTECH INNOVATION",
      growth: "+45%",
      momentum: 72,
      opportunities: 134,
      hotTopics: ["DEFI", "DIGITAL PAYMENTS", "ROBO-ADVISORS"]
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="brutalist-card w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="brutalist-text-primary text-3xl flex items-center">
                <TrendingUp className="h-8 w-8 mr-2" />
                TREND ANALYSIS
              </CardTitle>
              <CardDescription className="brutalist-text-secondary">
                REAL-TIME MARKET TREND INTELLIGENCE AND OPPORTUNITY MAPPING
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="brutalist-button bg-red-500 text-white"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Timeframe Selector */}
          <div className="flex items-center space-x-4">
            <span className="brutalist-text-primary font-black">TIMEFRAME:</span>
            {["1M", "3M", "6M", "1Y", "ALL"].map((period) => (
              <Button
                key={period}
                size="sm"
                variant={selectedTimeframe === period ? "default" : "outline"}
                onClick={() => setSelectedTimeframe(period)}
                className={`brutalist-button ${
                  selectedTimeframe === period ? "bg-yellow-400" : "bg-white"
                }`}
              >
                {period}
              </Button>
            ))}
          </div>

          {/* Trend Categories */}
          <div className="grid gap-6">
            {trendData.map((trend, index) => (
              <Card key={index} className={`brutalist-card asymmetric-${(index % 3) + 1}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="brutalist-text-primary text-xl">
                      {trend.category}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className="brutalist-badge bg-lime-400">
                        {trend.growth}
                      </Badge>
                      <Badge className="brutalist-badge bg-cyan-400">
                        {trend.opportunities} OPS
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="brutalist-text-secondary text-sm">MOMENTUM SCORE</span>
                      <span className="brutalist-text-primary text-sm font-black">{trend.momentum}%</span>
                    </div>
                    <Progress value={trend.momentum} className="h-2" />
                  </div>
                  
                  <div>
                    <span className="brutalist-text-secondary text-sm mb-2 block">HOT TOPICS</span>
                    <div className="flex flex-wrap gap-2">
                      {trend.hotTopics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} className="brutalist-badge bg-yellow-400 text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t-2 border-black">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Globe className="h-4 w-4 text-black" />
                        <span className="brutalist-text-secondary text-xs">GLOBAL</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-black" />
                        <span className="brutalist-text-secondary text-xs">UPDATED 2H AGO</span>
                      </div>
                    </div>
                    <Button size="sm" className="brutalist-button bg-cyan-400">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      DEEP DIVE
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
