"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ProblemDiscoveryDialog } from "@/components/problem-discovery-dialog"
import { TrendAnalysisDialog } from "@/components/trend-analysis-dialog"
import { Search, TrendingUp, Lightbulb, Target, Zap, Users, DollarSign, BarChart3, Plus, Filter } from 'lucide-react'

export function BrainstormValidate() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showProblemDialog, setShowProblemDialog] = useState(false)
  const [showTrendDialog, setShowTrendDialog] = useState(false)

  const trendingProblems = [
    {
      id: "1",
      title: "REMOTE WORK BURNOUT",
      description: "EMPLOYEES STRUGGLING WITH WORK-LIFE BALANCE IN DISTRIBUTED TEAMS",
      trend: "+45%",
      marketSize: "$2.1B",
      difficulty: "MEDIUM",
      opportunity: 85
    },
    {
      id: "2", 
      title: "SUSTAINABLE PACKAGING",
      description: "E-COMMERCE COMPANIES NEED ECO-FRIENDLY SHIPPING SOLUTIONS",
      trend: "+67%",
      marketSize: "$8.4B",
      difficulty: "HIGH",
      opportunity: 92
    },
    {
      id: "3",
      title: "AI CONTENT MODERATION",
      description: "SOCIAL PLATFORMS REQUIRE AUTOMATED HARMFUL CONTENT DETECTION",
      trend: "+123%",
      marketSize: "$1.8B",
      difficulty: "HIGH",
      opportunity: 78
    },
    {
      id: "4",
      title: "ELDERLY TECH ADOPTION",
      description: "SENIORS NEED SIMPLIFIED INTERFACES FOR DIGITAL SERVICES",
      trend: "+34%",
      marketSize: "$3.2B",
      difficulty: "LOW",
      opportunity: 71
    }
  ]

  const aiOpportunities = [
    {
      id: "1",
      title: "VOICE-ACTIVATED GROCERY ORDERING",
      confidence: 89,
      marketGap: "UNDERSERVED ELDERLY MARKET",
      competition: "LOW",
      timeToMarket: "6-8 MONTHS"
    },
    {
      id: "2",
      title: "AI-POWERED PLANT CARE ASSISTANT", 
      confidence: 76,
      marketGap: "URBAN GARDENING BOOM",
      competition: "MEDIUM",
      timeToMarket: "4-6 MONTHS"
    },
    {
      id: "3",
      title: "AUTOMATED MEETING SUMMARIZER",
      confidence: 94,
      marketGap: "REMOTE WORK EFFICIENCY",
      competition: "HIGH",
      timeToMarket: "3-4 MONTHS"
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "LOW": return "bg-lime-400"
      case "MEDIUM": return "bg-yellow-400"
      case "HIGH": return "bg-red-500 text-white"
      default: return "bg-gray-400"
    }
  }

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case "LOW": return "bg-lime-400"
      case "MEDIUM": return "bg-yellow-400"
      case "HIGH": return "bg-red-500 text-white"
      default: return "bg-gray-400"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
          <Input
            placeholder="SEARCH PROBLEMS & OPPORTUNITIES..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="brutalist-input pl-12"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline"
            className="brutalist-button bg-cyan-400"
          >
            <Filter className="h-5 w-5 mr-2" />
            FILTER
          </Button>
          <Button 
            onClick={() => setShowProblemDialog(true)}
            className="brutalist-button"
          >
            <Plus className="h-5 w-5 mr-2" />
            DISCOVER PROBLEMS
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "TRENDING PROBLEMS", value: "247", icon: TrendingUp, color: "bg-red-500" },
          { title: "AI OPPORTUNITIES", value: "89", icon: Lightbulb, color: "bg-yellow-400" },
          { title: "MARKET GAPS", value: "156", icon: Target, color: "bg-cyan-400" },
          { title: "VALIDATION SCORE", value: "8.4", icon: Zap, color: "bg-lime-400" }
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

      {/* Trending Problems */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="brutalist-text-primary text-3xl">TRENDING PROBLEMS</h2>
          <Button 
            variant="outline"
            onClick={() => setShowTrendDialog(true)}
            className="brutalist-button bg-lime-400"
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            ANALYZE TRENDS
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {trendingProblems.map((problem, index) => (
            <Card key={problem.id} className={`brutalist-card asymmetric-${(index % 3) + 1}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="brutalist-text-primary text-lg mb-2">
                      {problem.title}
                    </CardTitle>
                    <CardDescription className="brutalist-text-secondary">
                      {problem.description}
                    </CardDescription>
                  </div>
                  <Badge className="brutalist-badge bg-lime-400 ml-2">
                    {problem.trend}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="brutalist-text-secondary text-xs">MARKET SIZE</span>
                    <div className="brutalist-text-primary text-sm font-black">{problem.marketSize}</div>
                  </div>
                  <div>
                    <span className="brutalist-text-secondary text-xs">DIFFICULTY</span>
                    <Badge className={`brutalist-badge ${getDifficultyColor(problem.difficulty)} text-xs`}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="brutalist-text-secondary text-sm">OPPORTUNITY SCORE</span>
                    <span className="brutalist-text-primary text-sm font-black">{problem.opportunity}%</span>
                  </div>
                  <Progress value={problem.opportunity} className="h-2" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t-2 border-black">
                  <Button size="sm" variant="outline" className="brutalist-button bg-yellow-400">
                    <Target className="h-4 w-4 mr-1" />
                    VALIDATE
                  </Button>
                  <Button size="sm" variant="outline" className="brutalist-button bg-cyan-400">
                    <Users className="h-4 w-4 mr-1" />
                    RESEARCH
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI-Discovered Opportunities */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="brutalist-text-primary text-3xl">AI-DISCOVERED OPPORTUNITIES</h2>
          <Button className="brutalist-button">
            <Zap className="h-5 w-5 mr-2" />
            GENERATE MORE
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {aiOpportunities.map((opportunity, index) => (
            <Card key={opportunity.id} className={`brutalist-card asymmetric-${(index % 3) + 1}`}>
              <CardHeader>
                <CardTitle className="brutalist-text-primary text-lg mb-2">
                  {opportunity.title}
                </CardTitle>
                <div className="flex items-center justify-between">
                  <span className="brutalist-text-secondary text-sm">AI CONFIDENCE</span>
                  <Badge className="brutalist-badge bg-lime-400">
                    {opportunity.confidence}%
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <span className="brutalist-text-secondary text-xs">MARKET GAP</span>
                  <div className="brutalist-text-primary text-sm font-black">{opportunity.marketGap}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="brutalist-text-secondary text-xs">COMPETITION</span>
                    <Badge className={`brutalist-badge ${getCompetitionColor(opportunity.competition)} text-xs`}>
                      {opportunity.competition}
                    </Badge>
                  </div>
                  <div>
                    <span className="brutalist-text-secondary text-xs">TIME TO MARKET</span>
                    <div className="brutalist-text-primary text-xs font-black">{opportunity.timeToMarket}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t-2 border-black">
                  <Button size="sm" className="brutalist-button bg-yellow-400">
                    <DollarSign className="h-4 w-4 mr-1" />
                    VALIDATE
                  </Button>
                  <Button size="sm" variant="outline" className="brutalist-button bg-cyan-400">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    ANALYZE
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialogs */}
      <ProblemDiscoveryDialog 
        open={showProblemDialog} 
        onOpenChange={setShowProblemDialog}
      />
      <TrendAnalysisDialog 
        open={showTrendDialog} 
        onOpenChange={setShowTrendDialog}
      />
    </div>
  )
}
