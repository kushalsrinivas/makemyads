"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Sparkles, ShoppingBag, Palette, Target, Upload, CheckCircle, Zap } from "lucide-react"
import Link from "next/link"

const steps = [
  { id: 1, title: "Connect Your Store", icon: ShoppingBag },
  { id: 2, title: "Choose Brand Style", icon: Palette },
  { id: 3, title: "Goal Selection", icon: Target },
]

const integrations = [
  { name: "Shopify", logo: "🛍️", popular: true },
  { name: "WooCommerce", logo: "🛒", popular: true },
  { name: "BigCommerce", logo: "🏪", popular: false },
  { name: "Custom API", logo: "⚡", popular: false },
]

const brandTones = [
  { name: "Playful", description: "Fun and energetic", color: "from-pink-400 to-orange-400" },
  { name: "Bold", description: "Strong and confident", color: "from-red-500 to-purple-600" },
  { name: "Minimalist", description: "Clean and simple", color: "from-gray-400 to-gray-600" },
  { name: "Premium", description: "Luxury and elegant", color: "from-purple-600 to-blue-800" },
  { name: "Professional", description: "Trustworthy and reliable", color: "from-blue-500 to-teal-600" },
]

const campaignGoals = [
  {
    title: "Generate Summer Campaign",
    description: "Create seasonal promotional content",
    icon: "☀️",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    title: "Push Top Sellers",
    description: "Promote your best-performing products",
    icon: "🏆",
    gradient: "from-green-400 to-blue-500",
  },
  {
    title: "Clear Old Inventory",
    description: "Move slow-moving stock with compelling offers",
    icon: "📦",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    title: "Promote New Product",
    description: "Launch new items with impact",
    icon: "🚀",
    gradient: "from-blue-400 to-purple-600",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedIntegration, setSelectedIntegration] = useState("")
  const [selectedTone, setSelectedTone] = useState("")
  const [selectedGoal, setSelectedGoal] = useState("")
  const [brandAssets, setBrandAssets] = useState({
    logo: null,
    colors: "",
    fonts: "",
  })

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      window.location.href = "/dashboard"
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedIntegration !== ""
      case 2:
        return selectedTone !== ""
      case 3:
        return selectedGoal !== ""
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Make My Ads</span>
          </Link>
          <Badge variant="outline" className="bg-white/60">
            Step {currentStep} of {steps.length}
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.id
                      ? "bg-gradient-to-r from-orange-500 to-purple-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-20 h-1 mx-4 ${
                      currentStep > step.id ? "bg-gradient-to-r from-orange-500 to-purple-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">Connect Your Store</h1>
              <p className="text-xl text-gray-600 mb-12">
                Link your product catalog to get started with AI-powered ad creation
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {integrations.map((integration) => (
                  <Card
                    key={integration.name}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedIntegration === integration.name
                        ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                        : "bg-white/60 backdrop-blur-sm border-white/20"
                    }`}
                    onClick={() => setSelectedIntegration(integration.name)}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="text-4xl mb-4">{integration.logo}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{integration.name}</h3>
                      {integration.popular && (
                        <Badge className="bg-gradient-to-r from-orange-100 to-purple-100 text-gray-700 border-0">
                          Popular
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">Choose Your Brand Style</h1>
              <p className="text-xl text-gray-600 mb-12">
                Help AI understand your brand personality and visual identity
              </p>

              {/* Brand Assets Upload */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Brand Assets (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="logo">Logo</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload logo</p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="colors">Brand Colors</Label>
                      <Input
                        id="colors"
                        placeholder="#FF6B35, #7B68EE"
                        className="mt-2"
                        value={brandAssets.colors}
                        onChange={(e) => setBrandAssets({ ...brandAssets, colors: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fonts">Preferred Fonts</Label>
                      <Input
                        id="fonts"
                        placeholder="Inter, Roboto"
                        className="mt-2"
                        value={brandAssets.fonts}
                        onChange={(e) => setBrandAssets({ ...brandAssets, fonts: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Brand Tone Selection */}
              <div className="text-left">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Select Your Brand Tone</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {brandTones.map((tone) => (
                    <Card
                      key={tone.name}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedTone === tone.name
                          ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                          : "bg-white/60 backdrop-blur-sm border-white/20"
                      }`}
                      onClick={() => setSelectedTone(tone.name)}
                    >
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 bg-gradient-to-r ${tone.color} rounded-lg mb-4`}></div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{tone.name}</h4>
                        <p className="text-sm text-gray-600">{tone.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">What's Your Goal?</h1>
              <p className="text-xl text-gray-600 mb-12">Choose your primary campaign objective to get started</p>

              <div className="grid md:grid-cols-2 gap-6">
                {campaignGoals.map((goal) => (
                  <Card
                    key={goal.title}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedGoal === goal.title
                        ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                        : "bg-white/60 backdrop-blur-sm border-white/20"
                    }`}
                    onClick={() => setSelectedGoal(goal.title)}
                  >
                    <CardContent className="p-8">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${goal.gradient} rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto`}
                      >
                        {goal.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{goal.title}</h3>
                      <p className="text-gray-600">{goal.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="px-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8"
            >
              {currentStep === steps.length ? (
                <>
                  Complete Setup
                  <Zap className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
