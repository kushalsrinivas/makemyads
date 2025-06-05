import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Play,
  Sparkles,
  TrendingUp,
  Zap,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Make My Ads
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#examples"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Examples
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-gradient-to-r from-orange-100 to-purple-100 text-gray-700 border-0">
          <Zap className="w-4 h-4 mr-1" />
          AI-Powered Ad Creation
        </Badge>

        <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
          Create High-Converting Ads
          <br />
          <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
            In Seconds
          </span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Transform your product catalog into stunning ad creatives with AI.
          Connect your store, describe your goal, and watch magic happen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/onboarding">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Try It Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        {/* Auto-play Demo Preview */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Live Demo</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500">Generating...</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-1/2"></div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-100 to-purple-100 rounded-lg h-32 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-gray-400 animate-spin" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                "Generate summer campaign for top-selling sneakers" → AI creates
                visuals + copy in 3 seconds
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Everything You Need to Scale Your Ads
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From product catalog to published ads in minutes, not hours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Creative Generation
              </h3>
              <p className="text-gray-600">
                Generate stunning visuals and compelling copy tailored to your
                brand and products automatically.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Performance Optimization
              </h3>
              <p className="text-gray-600">
                Learn from your best-performing ads to create even better
                creatives that convert.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                One-Click Publishing
              </h3>
              <p className="text-gray-600">
                Push directly to Meta, TikTok, and Google Ads with optimized
                targeting and budgets.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Before & After Examples
          </h2>
          <p className="text-xl text-gray-600">
            See how AI transforms ordinary product listings into high-converting
            ads
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              Before: Manual Creation
            </h3>
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-6">
                <div className="bg-white rounded-lg p-4 mb-4 h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-gray-400">Basic Product Photo</span>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">Generic product title</p>
                  <p className="text-gray-500 text-xs">
                    Standard description text...
                  </p>
                  <p className="text-gray-400 text-xs">
                    ⏱️ 2-3 hours to create
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              After: AI-Generated
            </h3>
            <Card className="bg-gradient-to-br from-orange-50 to-purple-50 border-orange-200">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-orange-100 to-purple-100 rounded-lg p-4 mb-4 h-48 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    Stunning AI Creative
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-900 font-medium text-sm">
                    🔥 Summer's Hottest Sneaker Drop!
                  </p>
                  <p className="text-gray-700 text-xs">
                    Limited time: Get 25% off + free shipping on our
                    bestselling...
                  </p>
                  <p className="text-green-600 text-xs font-medium">
                    ⚡ Generated in 3 seconds
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-semibold text-gray-900 mb-6">
            Ready to Transform Your Ad Creation?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses already using AI to create better ads
            faster.
          </p>
          <Link href="/onboarding">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-12 py-4 text-xl"
            >
              Generate Your First Ad
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-purple-500 rounded-md flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Make My Ads</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2024 Make My Ads. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
