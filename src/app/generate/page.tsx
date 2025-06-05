"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  RefreshCw,
  Heart,
  Share,
  Download,
  ArrowLeft,
  ImageIcon,
  Zap,
} from "lucide-react";
import Link from "next/link";

const generatedCreatives = [
  {
    id: 1,
    product: "Summer Sneakers",
    hook: "🔥 Summer's Hottest Drop!",
    headline: "Limited Edition Sneakers - 25% Off",
    body: "Step into summer with our bestselling sneakers. Lightweight, breathable, and perfect for any adventure. Limited time offer!",
    cta: "Shop Now - Free Shipping",
    tags: ["Top Seller", "Summer Promo", "Limited Time"],
    performance: "High",
    thumbnail: "👟",
  },
  {
    id: 2,
    product: "Athletic Shorts",
    hook: "Beat the Heat 🌞",
    headline: "Ultra-Light Athletic Shorts",
    body: "Stay cool and comfortable with our moisture-wicking athletic shorts. Perfect for workouts or casual wear.",
    cta: "Get Yours Today",
    tags: ["New Arrival", "Athletic", "Summer"],
    performance: "Medium",
    thumbnail: "🩳",
  },
  {
    id: 3,
    product: "Sunglasses",
    hook: "Protect Your Vision ☀️",
    headline: "Premium UV Protection Sunglasses",
    body: "Style meets function with our designer sunglasses. 100% UV protection with a look that turns heads.",
    cta: "See the Difference",
    tags: ["Premium", "Protection", "Style"],
    performance: "High",
    thumbnail: "🕶️",
  },
];

export default function GeneratePage() {
  const [selectedCreative, setSelectedCreative] = useState(
    generatedCreatives[0]
  );
  const [isGenerating, setIsGenerating] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [toneSlider, setToneSlider] = useState([50]);
  const [focusSlider, setFocusSlider] = useState([50]);
  const [styleSlider, setStyleSlider] = useState([50]);

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

  const handleSaveDraft = () => {
    // Save to library
    alert("Creative saved to your library!");
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
              Creating Your Ads...
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                Analyzing your top products
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                Generating compelling visuals
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Creative Preview
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Link href="/publish">
              <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
                Publish Ads
                <Zap className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Creative List */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Generated Creatives
              </h2>
              <Button variant="outline" size="sm" onClick={handleRegenerate}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>

            <div className="space-y-4">
              {generatedCreatives.map((creative) => (
                <Card
                  key={creative.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedCreative?.id === creative.id
                      ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                      : "bg-white/60 backdrop-blur-sm border-white/20"
                  }`}
                  onClick={() => setSelectedCreative(creative)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">
                        <ImageIcon />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {creative.product}
                        </h3>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {creative.hook}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              creative.performance === "High"
                                ? "border-green-200 text-green-700 bg-green-50"
                                : "border-yellow-200 text-yellow-700 bg-yellow-50"
                            }`}
                          >
                            {creative.performance} Performance
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Feedback Section */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  What to improve?
                </h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Tone</span>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>🔵 Softer</span>
                        <span>🔴 Bolder</span>
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
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Focus</span>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>📦 Product</span>
                        <span>📣 Offer</span>
                      </div>
                    </div>
                    <Slider
                      value={focusSlider}
                      onValueChange={setFocusSlider}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Style</span>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>🖼️ Visual</span>
                        <span>📝 Text</span>
                      </div>
                    </div>
                    <Slider
                      value={styleSlider}
                      onValueChange={setStyleSlider}
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
                      className="bg-white/50"
                    />
                  </div>

                  <Button
                    onClick={handleRegenerate}
                    className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white"
                  >
                    Refine Again
                    <Sparkles className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Selected Creative */}
          <div className="lg:col-span-2">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
              <CardContent className="p-8">
                {selectedCreative ? (
                  <>
                    {/* Visual Preview */}
                    <div className="bg-gradient-to-br from-orange-100 to-purple-100 rounded-xl p-8 mb-6 text-center">
                      <div className="text-6xl mb-4">
                        <ImageIcon />
                      </div>
                      <div className="text-lg font-medium text-gray-700">
                        AI-Generated Visual
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        High-quality creative optimized for{" "}
                        {selectedCreative.product}
                      </p>
                    </div>

                    {/* Copy Preview */}
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Hook
                        </label>
                        <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
                          <p className="text-lg font-semibold text-gray-900">
                            {selectedCreative.hook}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Headline
                        </label>
                        <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
                          <p className="text-base font-medium text-gray-900">
                            {selectedCreative.headline}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Body
                        </label>
                        <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
                          <p className="text-gray-700">
                            {selectedCreative.body}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Call to Action
                        </label>
                        <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
                          <Button className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                            {selectedCreative.cta}
                          </Button>
                        </div>
                      </div>

                      {/* Tags */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedCreative.tags.map((tag, index) => (
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

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4 mr-2" />
                            Like
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        <Badge
                          className={`${
                            selectedCreative.performance === "High"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {selectedCreative.performance} Performance Predicted
                        </Badge>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">
                      <ImageIcon />
                    </div>
                    <p className="text-gray-500">
                      Select a creative to preview
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
