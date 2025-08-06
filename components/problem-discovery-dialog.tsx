"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Search, Zap, TrendingUp, Target } from 'lucide-react'

interface ProblemDiscoveryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProblemDiscoveryDialog({ open, onOpenChange }: ProblemDiscoveryDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  if (!open) return null

  const handleSearch = async () => {
    setIsSearching(true)
    // Simulate AI search
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSearching(false)
  }

  const discoveredProblems = [
    {
      id: "1",
      title: "REMOTE TEAM COMMUNICATION GAPS",
      description: "DISTRIBUTED TEAMS STRUGGLE WITH ASYNC COLLABORATION",
      severity: "HIGH",
      marketSize: "$4.2B",
      trendScore: 89
    },
    {
      id: "2",
      title: "SUSTAINABLE PACKAGING SHORTAGE",
      description: "E-COMMERCE LACKS ECO-FRIENDLY SHIPPING OPTIONS",
      severity: "MEDIUM",
      marketSize: "$12.8B",
      trendScore: 76
    },
    {
      id: "3",
      title: "AI BIAS IN HIRING SYSTEMS",
      description: "RECRUITMENT ALGORITHMS SHOW DEMOGRAPHIC BIAS",
      severity: "HIGH",
      marketSize: "$2.1B",
      trendScore: 94
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="brutalist-card w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="brutalist-text-primary text-3xl flex items-center">
                <Search className="h-8 w-8 mr-2" />
                PROBLEM DISCOVERY
              </CardTitle>
              <CardDescription className="brutalist-text-secondary">
                AI-POWERED PROBLEM IDENTIFICATION AND MARKET OPPORTUNITY ANALYSIS
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
          {/* Search Interface */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="DESCRIBE AN INDUSTRY, MARKET, OR PAIN POINT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="brutalist-input flex-1"
              />
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
                className="brutalist-button"
              >
                {isSearching ? (
                  <>
                    <Zap className="h-5 w-5 mr-2 animate-spin" />
                    ANALYZING...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    DISCOVER
                  </>
                )}
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {["HEALTHCARE", "FINTECH", "EDTECH", "SUSTAINABILITY", "REMOTE WORK", "AI/ML"].map((tag) => (
                <Button
                  key={tag}
                  size="sm"
                  variant="outline"
                  onClick={() => setSearchQuery(tag)}
                  className="brutalist-button bg-cyan-400 text-xs"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          {discoveredProblems.length > 0 && (
            <div className="space-y-4">
              <h3 className="brutalist-text-primary text-2xl">DISCOVERED PROBLEMS</h3>
              
              <div className="grid gap-4">
                {discoveredProblems.map((problem, index) => (
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
                        <Badge className={`brutalist-badge ml-2 ${
                          problem.severity === "HIGH" ? "bg-red-500 text-white" : "bg-yellow-400"
                        }`}>
                          {problem.severity}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="brutalist-text-secondary text-xs">MARKET SIZE</span>
                          <div className="brutalist-text-primary text-sm font-black">{problem.marketSize}</div>
                        </div>
                        <div>
                          <span className="brutalist-text-secondary text-xs">TREND SCORE</span>
                          <div className="brutalist-text-primary text-sm font-black">{problem.trendScore}%</div>
                        </div>
                        <div>
                          <span className="brutalist-text-secondary text-xs">OPPORTUNITY</span>
                          <Badge className="brutalist-badge bg-lime-400">
                            HIGH
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t-2 border-black">
                        <Button size="sm" className="brutalist-button bg-yellow-400">
                          <Target className="h-4 w-4 mr-1" />
                          VALIDATE
                        </Button>
                        <Button size="sm" variant="outline" className="brutalist-button bg-cyan-400">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          ANALYZE
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
