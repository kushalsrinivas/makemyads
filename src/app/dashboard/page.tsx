"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  Settings,
  User,
  Bell,
} from "lucide-react";
import Link from "next/link";

const recentCampaigns = [
  {
    name: "Summer Sneaker Sale",
    status: "Active",
    performance: "+24%",
    color: "green",
  },
  {
    name: "New Arrivals Push",
    status: "Draft",
    performance: "—",
    color: "gray",
  },
  {
    name: "Clearance Event",
    status: "Completed",
    performance: "+18%",
    color: "blue",
  },
];

const quickActions = [
  {
    title: "Promote Top Sellers",
    description: "Create ads for best-performing products",
    icon: "🏆",
  },
  {
    title: "Seasonal Campaign",
    description: "Generate timely promotional content",
    icon: "🌟",
  },
  {
    title: "New Product Launch",
    description: "Introduce new items with impact",
    icon: "🚀",
  },
  {
    title: "Inventory Clearance",
    description: "Move slow stock with compelling offers",
    icon: "📦",
  },
];

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      window.location.href = "/generate";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Make My Ads
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-900 font-medium">
              Dashboard
            </Link>
            <Link href="/library" className="text-gray-600 hover:text-gray-900">
              Library
            </Link>
            <Link
              href="/analytics"
              className="text-gray-600 hover:text-gray-900"
            >
              Analytics
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold text-gray-900 mb-6">
            What do you want to create today?
          </h1>

          {/* Command Input */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Input
                placeholder="e.g., Get top sellers ready for summer posts"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-16 text-lg px-6 pr-32 bg-white/80 backdrop-blur-sm border-white/20 shadow-lg"
                onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
              />
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="absolute right-2 top-2 h-12 px-8 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate
                    <Zap className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setPrompt(action.title)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{action.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Campaigns</p>
                  <p className="text-2xl font-semibold text-gray-900">24</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Ads</p>
                  <p className="text-2xl font-semibold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Performance</p>
                  <p className="text-2xl font-semibold text-green-600">+21%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Time Saved</p>
                  <p className="text-2xl font-semibold text-gray-900">48h</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Campaigns */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Campaigns
              </h2>
              <Link href="/library">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentCampaigns.map((campaign, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {campaign.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`mt-1 ${
                          campaign.status === "Active"
                            ? "border-green-200 text-green-700 bg-green-50"
                            : campaign.status === "Draft"
                            ? "border-gray-200 text-gray-700 bg-gray-50"
                            : "border-blue-200 text-blue-700 bg-blue-50"
                        }`}
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        campaign.color === "green"
                          ? "text-green-600"
                          : campaign.color === "blue"
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    >
                      {campaign.performance}
                    </p>
                    <p className="text-sm text-gray-500">Performance</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
