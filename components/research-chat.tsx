"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Send, Zap, BarChart3, TrendingUp, Target } from 'lucide-react'

interface ResearchChatProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ResearchChat({ open, onOpenChange }: ResearchChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "ai" as const,
      content: "HELLO! I'M YOUR AI RESEARCH ASSISTANT. ASK ME ANYTHING ABOUT MARKET TRENDS, COMPETITORS, OR VALIDATION STRATEGIES.",
      timestamp: "10:30 AM"
    }
  ])

  if (!open) return null

  const handleSend = () => {
    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: "ai" as const,
        content: "ANALYZING YOUR REQUEST... BASED ON CURRENT MARKET DATA, HERE ARE MY INSIGHTS:",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const quickActions = [
    { label: "MARKET SIZE", icon: BarChart3 },
    { label: "COMPETITORS", icon: Target },
    { label: "TRENDS", icon: TrendingUp },
    { label: "VALIDATION", icon: Zap }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="brutalist-card w-full max-w-4xl h-[80vh] flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="brutalist-text-primary text-2xl flex items-center">
                <Zap className="h-6 w-6 mr-2" />
                AI RESEARCH ASSISTANT
              </CardTitle>
              <CardDescription className="brutalist-text-secondary">
                GET INSTANT MARKET INSIGHTS AND VALIDATION GUIDANCE
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
        
        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-100 border-2 border-black">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 ${
                    msg.type === "user"
                      ? "brutalist-card bg-yellow-400 asymmetric-1"
                      : "brutalist-card bg-cyan-400 asymmetric-2"
                  }`}
                >
                  <div className="brutalist-text-primary text-sm font-bold mb-1">
                    {msg.content}
                  </div>
                  <div className="brutalist-text-secondary text-xs">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={() => setMessage(`TELL ME ABOUT ${action.label}`)}
                className="brutalist-button bg-lime-400 text-xs"
              >
                <action.icon className="h-4 w-4 mr-1" />
                {action.label}
              </Button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="ASK ABOUT MARKETS, TRENDS, COMPETITORS..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="brutalist-input flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className="brutalist-button"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
