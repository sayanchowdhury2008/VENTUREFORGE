"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Lightbulb, Target, TrendingUp, Users } from 'lucide-react'

interface CreateJobDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateJobDialog({ open, onOpenChange }: CreateJobDialogProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    industry: "",
    targetMarket: "",
    budget: "",
    timeline: ""
  })

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    onOpenChange(false)
    setStep(1)
    setFormData({
      title: "",
      description: "",
      industry: "",
      targetMarket: "",
      budget: "",
      timeline: ""
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="brutalist-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="brutalist-text-primary text-3xl flex items-center">
                <Lightbulb className="h-8 w-8 mr-2" />
                CREATE NEW PROJECT
              </CardTitle>
              <CardDescription className="brutalist-text-secondary">
                STEP {step} OF 3: {step === 1 ? "BASIC INFO" : step === 2 ? "MARKET DETAILS" : "VALIDATION SETUP"}
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
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="brutalist-text-primary text-sm font-black mb-2 block">
                    PROJECT TITLE
                  </label>
                  <Input
                    placeholder="E.G., AI-POWERED FITNESS APP"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="brutalist-input"
                    required
                  />
                </div>
                
                <div>
                  <label className="brutalist-text-primary text-sm font-black mb-2 block">
                    DESCRIPTION
                  </label>
                  <textarea
                    placeholder="DESCRIBE YOUR VENTURE IDEA IN DETAIL..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="brutalist-input w-full h-24 resize-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="brutalist-text-primary text-sm font-black mb-2 block">
                    INDUSTRY
                  </label>
                  <Input
                    placeholder="E.G., HEALTHCARE, FINTECH, EDTECH"
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    className="brutalist-input"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="brutalist-text-primary text-sm font-black mb-2 block">
                    TARGET MARKET
                  </label>
                  <Input
                    placeholder="E.G., MILLENNIALS, SMALL BUSINESSES, SENIORS"
                    value={formData.targetMarket}
                    onChange={(e) => setFormData({...formData, targetMarket: e.target.value})}
                    className="brutalist-input"
                    required
                  />
                </div>
                
                <div>
                  <label className="brutalist-text-primary text-sm font-black mb-2 block">
                    ESTIMATED BUDGET
                  </label>
                  <Input
                    placeholder="E.G., $50K, $100K, $500K"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="brutalist-input"
                    required
                  />
                </div>
                
                <div>
                  <label className="brutalist-text-primary text-sm font-black mb-2 block">
                    TIMELINE
                  </label>
                  <Input
                    placeholder="E.G., 6 MONTHS, 1 YEAR, 2 YEARS"
                    value={formData.timeline}
                    onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                    className="brutalist-input"
                    required
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="brutalist-card p-4 bg-yellow-400">
                  <h3 className="brutalist-text-primary text-lg mb-2">VALIDATION PREVIEW</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="brutalist-text-secondary">PROJECT:</span>
                      <span className="brutalist-text-primary font-black">{formData.title}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="brutalist-text-secondary">INDUSTRY:</span>
                      <span className="brutalist-text-primary font-black">{formData.industry}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="brutalist-text-secondary">BUDGET:</span>
                      <span className="brutalist-text-primary font-black">{formData.budget}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "MARKET ANALYSIS", icon: TrendingUp, time: "2-3 HOURS" },
                    { title: "COMPETITOR RESEARCH", icon: Target, time: "1-2 HOURS" },
                    { title: "USER VALIDATION", icon: Users, time: "3-4 HOURS" },
                    { title: "SUCCESS SCORING", icon: Lightbulb, time: "30 MINUTES" }
                  ].map((item, index) => (
                    <div key={index} className="brutalist-card p-3 asymmetric-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <item.icon className="h-5 w-5 text-black" />
                        <span className="brutalist-text-primary text-sm font-black">{item.title}</span>
                      </div>
                      <Badge className="brutalist-badge bg-lime-400 text-xs">
                        {item.time}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t-2 border-black">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="brutalist-button bg-gray-400"
                >
                  BACK
                </Button>
              )}
              
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="brutalist-button ml-auto"
                >
                  NEXT STEP
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="brutalist-button bg-lime-400 ml-auto"
                >
                  CREATE PROJECT
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
