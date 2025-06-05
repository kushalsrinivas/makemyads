"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Sparkles,
  Calendar,
  Target,
  DollarSign,
  ArrowLeft,
  Rocket,
  CheckCircle,
  Clock,
  Globe,
} from "lucide-react";
import Link from "next/link";

const platforms = [
  { name: "Meta Ads", logo: "📘", connected: true, audience: "2.8B users" },
  { name: "TikTok Ads", logo: "🎵", connected: true, audience: "1.7B users" },
  { name: "Google Ads", logo: "🔍", connected: false, audience: "4.3B users" },
];

const audienceTargets = [
  {
    name: "Lookalike Audience",
    description: "Similar to your best customers",
    recommended: true,
  },
  {
    name: "Interest-Based",
    description: "Based on interests and behaviors",
    recommended: false,
  },
  {
    name: "Retargeting",
    description: "Previous website visitors",
    recommended: true,
  },
  {
    name: "Custom Audience",
    description: "Upload your own customer list",
    recommended: false,
  },
];

export default function PublishPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState([
    "Meta Ads",
    "TikTok Ads",
  ]);
  const [scheduleNow, setScheduleNow] = useState(true);
  const [budget, setBudget] = useState("50");
  const [duration, setDuration] = useState("7");
  const [selectedAudience, setSelectedAudience] =
    useState("Lookalike Audience");
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublished(true);
    }, 3000);
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  if (published) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Ads Published Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your campaigns are now live on {selectedPlatforms.join(" and ")}.
              You'll receive performance updates in your dashboard.
            </p>
            <div className="space-y-3">
              <Link href="/dashboard">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                  View Dashboard
                </Button>
              </Link>
              <Link href="/library">
                <Button variant="outline" className="w-full">
                  Back to Library
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isPublishing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-8 h-8 text-white animate-bounce" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Publishing Your Ads...
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                Uploading creatives to ad platforms
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                Setting up targeting and budgets
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                Launching campaigns
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/generate">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Preview
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Publish Ads
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">
              Ready to Launch Your Campaign?
            </h1>
            <p className="text-lg text-gray-600">
              Configure your targeting, budget, and schedule to maximize
              performance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Platform Selection */}
            <div className="space-y-6">
              {/* Platform Selection */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Select Platforms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {platforms.map((platform) => (
                    <div
                      key={platform.name}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPlatforms.includes(platform.name)
                          ? "border-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                          : "border-gray-200 bg-white/50"
                      } ${!platform.connected ? "opacity-50" : ""}`}
                      onClick={() =>
                        platform.connected && togglePlatform(platform.name)
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{platform.logo}</div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {platform.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {platform.audience}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {platform.connected ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              Connected
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-500">
                              Connect
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Audience Targeting */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Audience Targeting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {audienceTargets.map((audience) => (
                    <div
                      key={audience.name}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAudience === audience.name
                          ? "border-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                          : "border-gray-200 bg-white/50"
                      }`}
                      onClick={() => setSelectedAudience(audience.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {audience.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {audience.description}
                          </p>
                        </div>
                        {audience.recommended && (
                          <Badge className="bg-gradient-to-r from-orange-100 to-purple-100 text-gray-700 border-0">
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Budget & Schedule */}
            <div className="space-y-6">
              {/* Budget Settings */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Budget & Duration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label
                      htmlFor="budget"
                      className="text-sm font-medium text-gray-700"
                    >
                      Daily Budget (USD)
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="mt-2 bg-white/50"
                      placeholder="50"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: $30-100 for optimal performance
                    </p>
                  </div>

                  <div>
                    <Label
                      htmlFor="duration"
                      className="text-sm font-medium text-gray-700"
                    >
                      Campaign Duration (days)
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="mt-2 bg-white/50"
                      placeholder="7"
                    />
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Estimated Reach
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Daily Reach</p>
                        <p className="font-semibold text-gray-900">
                          2,500 - 6,700
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Budget</p>
                        <p className="font-semibold text-gray-900">
                          ${Number.parseInt(budget) * Number.parseInt(duration)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Settings */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Start Campaign Now
                      </Label>
                      <p className="text-xs text-gray-500">
                        Campaign will begin immediately after approval
                      </p>
                    </div>
                    <Switch
                      checked={scheduleNow}
                      onCheckedChange={setScheduleNow}
                    />
                  </div>

                  {!scheduleNow && (
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="startDate"
                          className="text-sm font-medium text-gray-700"
                        >
                          Start Date
                        </Label>
                        <Input
                          id="startDate"
                          type="datetime-local"
                          className="mt-2 bg-white/50"
                        />
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <h4 className="font-medium text-gray-900">
                        Campaign Timeline
                      </h4>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-600">
                        • Review & approval: 15-30 minutes
                      </p>
                      <p className="text-gray-600">
                        • Campaign goes live:{" "}
                        {scheduleNow ? "Immediately" : "At scheduled time"}
                      </p>
                      <p className="text-gray-600">
                        • Duration: {duration} days
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Publish Button */}
              <Button
                onClick={handlePublish}
                disabled={selectedPlatforms.length === 0}
                className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Push to Ads Manager
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By publishing, you agree to our Terms of Service and Privacy
                Policy. Campaigns are subject to platform approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
