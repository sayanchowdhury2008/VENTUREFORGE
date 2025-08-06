"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SuccessProbabilityGauge } from "@/components/success-probability-gauge"
import { Target, Brain, Cog, Clock, CheckCircle, AlertCircle, Play, Download, MoreHorizontal, Eye } from 'lucide-react'
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Job {
  id: string
  title: string
  description: string
  status: "PENDING" | "ANALYZING" | "COMPLETED"
  progress: number
  successProbability: number
  marketSize: string
  competition: string
  createdAt: string
}

interface JobCardProps {
  job: Job
  className?: string
}

export function JobCard({ job, className }: JobCardProps) {
  const [isRunning, setIsRunning] = useState(job.status === "ANALYZING")
  const { toast } = useToast()

  const getTypeIcon = () => {
    switch (job.title.toLowerCase()) {
      case "validation":
        return Target
      case "solution":
        return Brain
      case "infrastructure":
        return Cog
      default:
        return Target
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-lime-400"
      case "ANALYZING":
        return "bg-yellow-400"
      case "PENDING":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-400"
    }
  }

  const TypeIcon = getTypeIcon()

  const handleRunJob = async () => {
    setIsRunning(true)

    const stages = [
      "INITIALIZING AI RESEARCH...",
      "ANALYZING MARKET DATA...",
      "EVALUATING COMPETITORS...",
      "GENERATING INSIGHTS...",
      "CALCULATING SUCCESS PROBABILITY...",
      "FINALIZING REPORT...",
    ]

    let currentProgress = 0
    let stageIndex = 0

    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5
      // Assuming a function to update job progress is available
      // updateJobProgress(job.id, currentProgress)

      if (currentProgress >= (stageIndex + 1) * 16.67 && stageIndex < stages.length - 1) {
        toast({
          title: stages[stageIndex],
          description: `RESEARCH PROGRESS: ${Math.round(currentProgress)}%`,
        })
        stageIndex++
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
        setIsRunning(false)

        // Assuming a function to complete job is available
        // completeJob(job.id)

        toast({
          title: "RESEARCH COMPLETE! 🎉",
          description: `${job.title} ANALYZED WITH ${job.successProbability}% SUCCESS PROBABILITY!`,
        })
      }
    }, 800)
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className={`brutalist-card ${className}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="brutalist-text-primary text-lg mb-2">
                {job.title}
              </CardTitle>
              <CardDescription className="brutalist-text-secondary">
                {job.description}
              </CardDescription>
            </div>
            <Badge className={`brutalist-badge ${getStatusColor(job.status)} ml-2`}>
              {job.status}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="brutalist-text-secondary text-sm">PROGRESS</span>
              <span className="brutalist-text-primary text-sm font-black">{job.progress}%</span>
            </div>
            <Progress value={job.progress} className="h-2" />
          </div>

          {/* Success Probability */}
          <div className="flex items-center justify-between">
            <span className="brutalist-text-secondary text-sm">SUCCESS PROBABILITY</span>
            <SuccessProbabilityGauge probability={job.successProbability} size="sm" />
          </div>

          {/* Market Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="brutalist-text-secondary text-xs">MARKET SIZE</span>
              <div className="brutalist-text-primary text-sm font-black">{job.marketSize}</div>
            </div>
            <div>
              <span className="brutalist-text-secondary text-xs">COMPETITION</span>
              <div className="brutalist-text-primary text-sm font-black">{job.competition}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t-2 border-black">
            <span className="brutalist-text-secondary text-xs">
              CREATED: {new Date(job.createdAt).toLocaleDateString()}
            </span>
            <div className="flex items-center space-x-2">
              {job.status === "PENDING" && (
                <Button
                  onClick={handleRunJob}
                  disabled={isRunning}
                  className="brutalist-button bg-red-400"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? "RESEARCHING..." : "START AI RESEARCH"}
                </Button>
              )}
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
