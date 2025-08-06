"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Bell,
  User,
  GripVertical,
  Upload,
  Rocket,
  Target,
  Brain,
  Cog,
  CheckCircle,
  FileText,
  Lightbulb,
} from "lucide-react"
import { motion } from "framer-motion"

interface WorkflowStep {
  id: string
  title: string
  description: string
  requiresReview: boolean
}

export function ProjectCreationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [ideaDescription, setIdeaDescription] = useState("")
  const [frequency, setFrequency] = useState("weekly")
  const [researchDepth, setResearchDepth] = useState([50])
  const [selectedModules, setSelectedModules] = useState({
    validation: true,
    solutions: true,
    infrastructure: false,
  })
  const [additionalContext, setAdditionalContext] = useState("")
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: "1",
      title: "Idea Validation",
      description: "User Review Required",
      requiresReview: true,
    },
    {
      id: "2",
      title: "Solution Exploration",
      description: "User Review Required",
      requiresReview: true,
    },
    {
      id: "3",
      title: "Infrastructure Planning",
      description: "Automated Step",
      requiresReview: false,
    },
  ])

  const getDepthLabel = (value: number) => {
    if (value < 33) return "Quick"
    if (value < 67) return "Deep"
    return "Expert"
  }

  const handleModuleChange = (module: keyof typeof selectedModules) => {
    setSelectedModules((prev) => ({
      ...prev,
      [module]: !prev[module],
    }))
  }

  const handleWorkflowToggle = (stepId: string) => {
    setWorkflowSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, requiresReview: !step.requiresReview } : step)),
    )
  }

  const handleSubmit = () => {
    console.log("Project submitted:", {
      ideaDescription,
      frequency,
      researchDepth: researchDepth[0],
      selectedModules,
      workflowSteps,
      additionalContext,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Rocket className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">VentureForge</h1>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Dashboard
              </a>
              <a href="#" className="text-sm font-medium text-blue-600">
                Projects
              </a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Templates
              </a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Community
              </a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Help
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Progress Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Step 1 of 4</p>
              <Progress value={25} className="mt-2 h-2" />
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900">Launch Your Next Big Idea</h2>
            <p className="text-lg text-gray-600">Let's start by defining your concept. What problem are you solving?</p>
          </motion.div>

          {/* Main Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-8">
              <div className="space-y-8">
                {/* 1. Describe Your Idea */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold flex items-center">
                    <Lightbulb className="h-6 w-6 mr-2 text-yellow-500" />
                    1. Describe Your Idea
                  </h3>
                  <Textarea
                    value={ideaDescription}
                    onChange={(e) => setIdeaDescription(e.target.value)}
                    placeholder="e.g., A platform that connects local artists with businesses for mural projects."
                    className="min-h-[120px] text-base"
                  />
                </div>

                {/* 2. Research Parameters */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold flex items-center">
                    <Target className="h-6 w-6 mr-2 text-blue-500" />
                    2. Research Parameters
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Frequency */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Frequency</Label>
                      <RadioGroup
                        value={frequency}
                        onValueChange={setFrequency}
                        className="flex bg-gray-100 rounded-md p-1"
                      >
                        <div className="flex-1">
                          <RadioGroupItem value="daily" id="daily" className="sr-only" />
                          <Label
                            htmlFor="daily"
                            className={`flex h-8 items-center justify-center rounded-md px-2 text-sm font-medium cursor-pointer transition-all ${
                              frequency === "daily" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500"
                            }`}
                          >
                            Daily
                          </Label>
                        </div>
                        <div className="flex-1">
                          <RadioGroupItem value="weekly" id="weekly" className="sr-only" />
                          <Label
                            htmlFor="weekly"
                            className={`flex h-8 items-center justify-center rounded-md px-2 text-sm font-medium cursor-pointer transition-all ${
                              frequency === "weekly" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500"
                            }`}
                          >
                            Weekly
                          </Label>
                        </div>
                        <div className="flex-1">
                          <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
                          <Label
                            htmlFor="monthly"
                            className={`flex h-8 items-center justify-center rounded-md px-2 text-sm font-medium cursor-pointer transition-all ${
                              frequency === "monthly" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500"
                            }`}
                          >
                            Monthly
                          </Label>
                        </div>
                        <div className="flex-1">
                          <RadioGroupItem value="one-off" id="one-off" className="sr-only" />
                          <Label
                            htmlFor="one-off"
                            className={`flex h-8 items-center justify-center rounded-md px-2 text-sm font-medium cursor-pointer transition-all ${
                              frequency === "one-off" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500"
                            }`}
                          >
                            One-off
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Research Depth */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Research Depth:{" "}
                        <span className="font-semibold text-blue-600">{getDepthLabel(researchDepth[0])}</span>
                      </Label>
                      <Slider
                        value={researchDepth}
                        onValueChange={setResearchDepth}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Quick</span>
                        <span>Deep</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Scope Modules */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold flex items-center">
                    <Brain className="h-6 w-6 mr-2 text-purple-500" />
                    3. Scope Modules
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card
                      className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${selectedModules.validation ? "ring-2 ring-blue-500" : ""}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedModules.validation}
                          onCheckedChange={() => handleModuleChange("validation")}
                        />
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Validation</span>
                        </div>
                      </div>
                    </Card>
                    <Card
                      className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${selectedModules.solutions ? "ring-2 ring-blue-500" : ""}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedModules.solutions}
                          onCheckedChange={() => handleModuleChange("solutions")}
                        />
                        <div className="flex items-center space-x-2">
                          <Lightbulb className="h-5 w-5 text-yellow-500" />
                          <span className="font-medium">Solutions</span>
                        </div>
                      </div>
                    </Card>
                    <Card
                      className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${selectedModules.infrastructure ? "ring-2 ring-blue-500" : ""}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedModules.infrastructure}
                          onCheckedChange={() => handleModuleChange("infrastructure")}
                        />
                        <div className="flex items-center space-x-2">
                          <Cog className="h-5 w-5 text-gray-500" />
                          <span className="font-medium">Infrastructure</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* 4. Workflow Stitching */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-indigo-500" />
                    4. Workflow Stitching
                  </h3>
                  <p className="text-gray-600">
                    Drag and drop to reorder steps. Toggle to require manual review before proceeding.
                  </p>
                  <div className="space-y-3">
                    {workflowSteps.map((step, index) => (
                      <Card key={step.id} className="p-4 cursor-grab active:cursor-grabbing">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <GripVertical className="h-6 w-6 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">
                                Step {index + 1}: {step.title}
                              </p>
                              <p className="text-sm text-gray-500">{step.description}</p>
                            </div>
                          </div>
                          <Switch checked={step.requiresReview} onCheckedChange={() => handleWorkflowToggle(step.id)} />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Additional Context */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Additional Context</h3>
                  <Textarea
                    value={additionalContext}
                    onChange={(e) => setAdditionalContext(e.target.value)}
                    placeholder="Add any custom notes, links, or instructions here."
                    className="min-h-[120px] text-base"
                  />

                  {/* File Upload */}
                  <div className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-10 text-center hover:bg-gray-100 transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm font-semibold text-gray-600">
                      Drag and drop files, or <span className="font-bold text-blue-600">browse</span>
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Summary Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="https://sjc.microlink.io/BRDWQxAPcLLqRBTJhPk3g5e3EGmiad8VkF7USacmRoW_A-rj3ENu3wGKV4CL0Wzd3hbQrvB-uj4HacINW3fngg.jpeg"
              alt="Summary background"
              className="h-60 w-full object-cover"
            />
            <div className="absolute bottom-0 w-full p-6 z-20">
              <h3 className="text-2xl font-bold text-white">Summary</h3>
              <p className="text-base font-medium text-white">
                Estimated Completion: <span className="font-bold">2-3 days</span>
              </p>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-end"
          >
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-bold"
            >
              <span>Submit Project</span>
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
