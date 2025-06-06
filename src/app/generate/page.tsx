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
  Copy,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { api } from "@/trpc/react";
import Image from "next/image";

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
  const [generatedPromptData, setGeneratedPromptData] = useState<{
    finalPrompt: string;
    promptBreakdown: {
      product: string;
      description: string;
      themeUsed: string;
      toneUsed: string;
      templateUsed: string;
    };
    aiSettings: {
      aspectRatio: string;
      style: string;
      resolution: string;
      quality: string;
      optimization: string;
    };
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<
    Array<{
      id: string;
      url: string;
      prompt: string;
      aspectRatio: string;
      generatedAt: string;
      isMock?: boolean;
      isReal?: boolean;
    }>
  >([]);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);

  // Image generation mutation
  const generateImages = api.ai.generateImage.useMutation({
    onSuccess: (data) => {
      setGeneratedImages(data.images);
      setIsGeneratingImages(false);
    },
    onError: (error) => {
      console.error("Failed to generate images:", error);
      setIsGeneratingImages(false);
    },
  });

  useEffect(() => {
    // Load generated prompt data from localStorage
    const promptData = localStorage.getItem("generatedPrompt");
    if (promptData) {
      try {
        const parsedData = JSON.parse(promptData);
        setGeneratedPromptData(parsedData);

        // Start generating images with the prompt
        if (parsedData.finalPrompt) {
          setIsGeneratingImages(true);
          generateImages.mutate({
            prompt: parsedData.finalPrompt,
            aspectRatio: parsedData.aiSettings?.aspectRatio || "4:5",
            numberOfImages: 3,
          });
        }
      } catch (error) {
        console.error("Failed to parse generated prompt data:", error);
      }
    }

    // Simulate generation time
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [generateImages.mutate]);

  const handleCopyPrompt = async () => {
    if (generatedPromptData?.finalPrompt) {
      try {
        await navigator.clipboard.writeText(generatedPromptData.finalPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy prompt:", error);
      }
    }
  };

  const handleRegenerate = () => {
    if (generatedPromptData?.finalPrompt) {
      setIsGeneratingImages(true);
      generateImages.mutate({
        prompt: generatedPromptData.finalPrompt,
        aspectRatio: generatedPromptData.aiSettings?.aspectRatio || "4:5",
        numberOfImages: 3,
      });
    }
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
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
                Analyzing your product details
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
                Generating creative concept
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse" />
                Creating visual assets
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
            <Button
              variant="outline"
              onClick={handleRegenerate}
              disabled={isGeneratingImages}
            >
              {isGeneratingImages ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
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
                    {generatedPromptData?.promptBreakdown?.templateUsed ||
                      mockCreative.template}
                  </Badge>
                  <div className="flex space-x-2">
                    <Badge variant="outline">
                      {generatedPromptData?.promptBreakdown?.themeUsed ||
                        mockCreative.theme}
                    </Badge>
                    <Badge variant="outline">
                      {generatedPromptData?.promptBreakdown?.toneUsed ||
                        mockCreative.tone}
                    </Badge>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="bg-gradient-to-br from-orange-100 to-purple-100 rounded-xl p-6 mb-6">
                  {isGeneratingImages ? (
                    <div className="text-center py-8">
                      <Loader2 className="w-8 h-8 text-gray-500 animate-spin mx-auto mb-4" />
                      <p className="text-sm text-gray-600">
                        Generating images with Gemini AI...
                      </p>
                    </div>
                  ) : generatedImages.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {generatedImages.map((image, index) => (
                        <div
                          key={image.id}
                          className="relative aspect-square rounded-lg overflow-hidden bg-white/50"
                        >
                          <Image
                            src={image.url}
                            alt={`Generated ad image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {image.isMock ? (
                            <div className="absolute top-2 right-2">
                              <Badge variant="secondary" className="text-xs">
                                Demo
                              </Badge>
                            </div>
                          ) : image.isReal ? (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-green-500 text-white text-xs">
                                AI Generated
                              </Badge>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="flex items-center justify-center space-x-4 mb-4">
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
                      <p className="text-sm text-gray-600">
                        AI-generated product visuals will appear here
                      </p>
                    </div>
                  )}
                </div>

                {/* Copy Preview */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Product
                    </p>
                    <p className="text-xl font-semibold text-gray-900">
                      {generatedPromptData?.promptBreakdown?.product ||
                        mockCreative.productName}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Description
                    </p>
                    <p className="text-gray-700">
                      {generatedPromptData?.promptBreakdown?.description ||
                        mockCreative.body}
                    </p>
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
                      Style
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-white/50">
                        {generatedPromptData?.aiSettings?.style ||
                          "Photorealistic"}
                      </Badge>
                      <Badge variant="outline" className="bg-white/50">
                        {generatedPromptData?.aiSettings?.quality ||
                          "High Quality"}
                      </Badge>
                      <Badge variant="outline" className="bg-white/50">
                        {generatedPromptData?.aiSettings?.optimization ||
                          "Social Media"}
                      </Badge>
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

            {/* Prompt Used Section */}
            {generatedPromptData?.finalPrompt && (
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      AI Prompt Used
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyPrompt}
                      className="flex items-center space-x-2"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 border">
                    <Textarea
                      value={generatedPromptData.finalPrompt}
                      readOnly
                      className="min-h-[150px] resize-none bg-transparent border-0 font-mono text-sm leading-relaxed focus:ring-0 focus:outline-none p-0"
                      style={{
                        fontFamily:
                          'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    This is the exact prompt used to generate your ad creative.
                    You can copy it to use with other AI tools like Midjourney,
                    DALL-E, or other image generators.
                  </p>
                </CardContent>
              </Card>
            )}

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
                      <label
                        htmlFor="feedback-textarea"
                        className="text-sm text-gray-600 mb-2 block"
                      >
                        Additional feedback
                      </label>
                      <Textarea
                        id="feedback-textarea"
                        placeholder="Any specific changes you'd like to see?"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="bg-white/50 resize-none"
                        rows={4}
                      />
                    </div>

                    <Button
                      onClick={handleRegenerate}
                      disabled={isGeneratingImages}
                      className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white"
                    >
                      {isGeneratingImages ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          Regenerate with Changes
                          <Sparkles className="ml-2 w-4 h-4" />
                        </>
                      )}
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

                    {generatedImages.some((img) => img.isMock) && (
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                        <p className="text-sm text-yellow-800">
                          <span className="font-medium">⚠️ Note:</span> Using
                          demo images. Configure Google Cloud credentials for
                          actual AI-generated images.
                        </p>
                      </div>
                    )}
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
