"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Target, TrendingUp, Users, ArrowRight, CheckCircle } from 'lucide-react'

interface LandingPageProps {
  onSignIn: () => void
}

export function LandingPage({ onSignIn }: LandingPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSignIn()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="brutalist-header px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black border-2 border-black transform rotate-12"></div>
            <h1 className="brutalist-text-primary text-2xl">VENTUREFORGE</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="brutalist-text-primary hover:bg-yellow-400 border-2 border-transparent hover:border-black"
              onClick={() => setIsSignUp(false)}
            >
              SIGN IN
            </Button>
            <Button 
              className="brutalist-button"
              onClick={() => setIsSignUp(true)}
            >
              GET STARTED
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-cyan-400 via-yellow-400 to-red-500">
        <div className="max-w-7xl mx-auto text-center">
          <div className="brutalist-card max-w-4xl mx-auto p-12 asymmetric-1">
            <Badge className="brutalist-badge mb-6 asymmetric-2">
              AI-POWERED VALIDATION
            </Badge>
            <h1 className="brutalist-text-primary text-6xl md:text-8xl mb-8 leading-tight">
              FORGE YOUR
              <br />
              BILLION-DOLLAR
              <br />
              VENTURE
            </h1>
            <p className="brutalist-text-secondary text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              STOP GUESSING. START VALIDATING. OUR AI ANALYZES MARKET DATA, 
              PREDICTS SUCCESS PROBABILITY, AND GUIDES YOU TO VENTURE GOLD.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                className="brutalist-button text-xl px-8 py-4 asymmetric-3"
                onClick={() => setIsSignUp(true)}
              >
                START FORGING NOW
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <div className="flex items-center space-x-2 brutalist-text-secondary">
                <CheckCircle className="h-5 w-5" />
                <span className="font-bold">FREE 7-DAY TRIAL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-lime-400">
        <div className="max-w-7xl mx-auto">
          <h2 className="brutalist-text-primary text-5xl text-center mb-16">
            FEATURES THAT DOMINATE
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="h-12 w-12" />,
                title: "AI VALIDATION",
                description: "INSTANT SUCCESS PROBABILITY SCORING WITH MACHINE LEARNING"
              },
              {
                icon: <Target className="h-12 w-12" />,
                title: "MARKET RESEARCH",
                description: "AUTOMATED COMPETITIVE ANALYSIS AND MARKET SIZING"
              },
              {
                icon: <TrendingUp className="h-12 w-12" />,
                title: "TREND ANALYSIS",
                description: "REAL-TIME MARKET TRENDS AND OPPORTUNITY DETECTION"
              },
              {
                icon: <Users className="h-12 w-12" />,
                title: "USER INSIGHTS",
                description: "DEEP CUSTOMER PERSONA AND BEHAVIOR ANALYSIS"
              }
            ].map((feature, index) => (
              <Card key={index} className={`brutalist-card asymmetric-${(index % 3) + 1}`}>
                <CardHeader>
                  <div className="brutalist-badge w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="brutalist-text-primary text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="brutalist-text-secondary">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section className="px-6 py-20 bg-red-500">
        <div className="max-w-md mx-auto">
          <Card className="brutalist-card">
            <CardHeader>
              <CardTitle className="brutalist-text-primary text-3xl text-center">
                {isSignUp ? "JOIN THE FORGE" : "ENTER THE FORGE"}
              </CardTitle>
              <CardDescription className="brutalist-text-secondary text-center">
                {isSignUp 
                  ? "CREATE YOUR ACCOUNT AND START VALIDATING" 
                  : "SIGN IN TO YOUR VENTURE DASHBOARD"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="brutalist-input"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="brutalist-input"
                    required
                  />
                </div>
                <Button type="submit" className="brutalist-button w-full text-lg py-3">
                  {isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="brutalist-text-secondary hover:underline font-bold"
                >
                  {isSignUp 
                    ? "ALREADY HAVE AN ACCOUNT? SIGN IN" 
                    : "NEED AN ACCOUNT? SIGN UP"
                  }
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-white border-2 border-white transform rotate-12"></div>
            <h3 className="font-black text-xl uppercase tracking-wider">VENTUREFORGE</h3>
          </div>
          <p className="font-bold uppercase tracking-wide">
            © 2024 VENTUREFORGE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}
