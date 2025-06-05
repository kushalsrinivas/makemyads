"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Sparkles,
  RefreshCw,
  Heart,
  Download,
  ArrowLeft,
  ImageIcon,
  Check,
} from "lucide-react";
import Link from "next/link";

// Mock data for the generated creative
const mockCreative = {
  template: "Carousel for Instagram",
  theme: "Summer Vibes",
  tone: "Playful",
  productName: "Breeze Linen Shirt",
  hook: "☀️ Summer Essential Alert!",
  headline: "Meet Your New Favorite Shirt",
  body: "Ultra-lightweight linen that keeps you cool even on the hottest days. Perfect for beach days, city strolls, or evening gatherings.",
  cta: "Shop Now • Free Shipping",
  tags: ["Summer Collection", "Limited Edition", "Bestseller"],
};

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [toneSlider, setToneSlider] = useState([50]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Simulate generation time
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    setIsSaved(true);
    // In a real app, this would save to a database
    setTimeout(() => {
      window.location.href = "/library";
    }, 1500);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Creating Your Ad...
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                Analyzing your product images
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                Generating creative concept
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                Crafting persuasive copy
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSaved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Ad Saved Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your ad creative has been saved to your library.
            </p>
            <Link href="/library">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                View in Library
              </Button>
            </Link>
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
            <Link href="/create">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Creator
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Generated Ad
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleRegenerate}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white"
            >
              <Heart className="w-4 h-4 mr-2" />
              Save to Library
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Panel - Creative Preview */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
              <CardContent className="p-8">
                {/* Template & Style Info */}
                <div className="flex items-center justify-between mb-6">
                  <Badge className="bg-gradient-to-r from-orange-100 to-purple-100 text-gray-700 border-0">
                    {mockCreative.template}
                  </Badge>
                  <div className="flex space-x-2">
                    <Badge variant="outline">{mockCreative.theme}</Badge>
                    <Badge variant="outline">{mockCreative.tone}</Badge>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="bg-gradient-to-br from-orange-100 to-purple-100 rounded-xl p-8 mb-6 text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-white/30 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-500" />
                    </div>
                    <div className="w-16 h-16 bg-white/50 rounded-lg flex items-center justify-center border-2 border-orange-300">
                      <ImageIcon className="w-8 h-8 text-gray-700" />
                    </div>
                    <div className="w-16 h-16 bg-white/30 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-500" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    AI-enhanced product visualization based on your uploaded
                    images
                  </p>
                </div>

                {/* Copy Preview */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Hook
                    </p>
                    <p className="text-xl font-semibold text-gray-900">
                      {mockCreative.hook}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Headline
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      {mockCreative.headline}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Body
                    </p>
                    <p className="text-gray-700">{mockCreative.body}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Call to Action
                    </p>
                    <Button className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                      {mockCreative.cta}
                    </Button>
                  </div>

                  {/* Tags */}
                  <div className="pt-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mockCreative.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-white/50"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <Button variant="outline" className="w-full mt-6">
                  <Download className="w-4 h-4 mr-2" />
                  Download Creative
                </Button>
              </CardContent>
            </Card>

            {/* Right Panel - Feedback */}
            <div className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    What do you think?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Provide feedback or request changes to refine your ad
                    creative
                  </p>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Tone Adjustment
                        </span>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>Softer</span>
                          <span>Bolder</span>
                        </div>
                      </div>
                      <Slider
                        value={toneSlider}
                        onValueChange={setToneSlider}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">
                        Additional feedback
                      </label>
                      <Textarea
                        placeholder="Any specific changes you'd like to see?"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="bg-white/50 resize-none"
                        rows={4}
                      />
                    </div>

                    <Button
                      onClick={handleRegenerate}
                      className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white"
                    >
                      Regenerate with Changes
                      <Sparkles className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    AI Insights
                  </h3>

                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">💡 Tip:</span> This
                        template performs best with bright, lifestyle-focused
                        imagery.
                      </p>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">✅ Strength:</span> Your
                        product description provided excellent details for
                        compelling copy.
                      </p>
                    </div>

                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <p className="text-sm text-orange-800">
                        <span className="font-medium">🔍 Suggestion:</span>{" "}
                        Consider adding a limited-time offer to increase
                        conversion.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
