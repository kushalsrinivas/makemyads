"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, CheckCircle } from "lucide-react";
import { api } from "@/trpc/react";

export default function TestAIPage() {
  const [copied, setCopied] = useState(false);

  // Example data from the user's requirements
  const exampleData = {
    productName: "Beachside Linen Shirt",
    productDescription:
      "A breathable, lightweight summer shirt made from organic linen. Perfect for coastal getaways.",
    theme: "Summer Vibes",
    tone: "Playful",
    template: "Carousel for Instagram",
    customTheme:
      "Use sun-soaked golden hour lighting with a beach boardwalk in the background",
    customTone:
      "Make it feel lighthearted and adventurous, like a summer memory",
    customTemplate:
      "Include first frame with product name, second frame with lifestyle shot, and third frame with bold CTA",
  };

  // Use the tRPC mutation
  const generatePrompt = api.ai.generatePrompt.useMutation();

  const handleGeneratePrompt = () => {
    generatePrompt.mutate(exampleData);
  };

  const handleCopyPrompt = async () => {
    if (generatePrompt.data?.finalPrompt) {
      await navigator.clipboard.writeText(generatePrompt.data.finalPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
              AI Prompt Generator Test
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              AI Prompt Generation Test
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Test the AI prompt generation API with example data
            </p>
          </div>

          {/* Input Data Display */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
            <CardHeader>
              <CardTitle>Input Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Product Details
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Name:</span>{" "}
                    {exampleData.productName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Description:</span>{" "}
                    {exampleData.productDescription}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Style & Format
                  </h4>
                  <div className="space-y-1">
                    <Badge variant="outline">{exampleData.theme}</Badge>
                    <Badge variant="outline">{exampleData.tone}</Badge>
                    <Badge variant="outline">{exampleData.template}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Custom Theme
                  </h4>
                  <p className="text-sm text-gray-600 italic">
                    {exampleData.customTheme}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Custom Tone
                  </h4>
                  <p className="text-sm text-gray-600 italic">
                    {exampleData.customTone}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Custom Template
                  </h4>
                  <p className="text-sm text-gray-600 italic">
                    {exampleData.customTemplate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="text-center mb-8">
            <Button
              onClick={handleGeneratePrompt}
              disabled={generatePrompt.isPending}
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-3"
            >
              {generatePrompt.isPending ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate AI Prompt
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Results */}
          {generatePrompt.data && (
            <div className="space-y-6">
              {/* Final Prompt */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Generated AI Prompt</CardTitle>
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
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatePrompt.data.finalPrompt}
                    readOnly
                    className="min-h-[200px] resize-none"
                  />
                </CardContent>
              </Card>

              {/* Prompt Breakdown */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Prompt Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Product:</span>{" "}
                        {generatePrompt.data.promptBreakdown.product}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Description:</span>{" "}
                        {generatePrompt.data.promptBreakdown.description}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Theme Used:</span>{" "}
                        {generatePrompt.data.promptBreakdown.themeUsed}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Tone Used:</span>{" "}
                        {generatePrompt.data.promptBreakdown.toneUsed}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Template Used:</span>{" "}
                        {generatePrompt.data.promptBreakdown.templateUsed}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Settings */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>AI Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Aspect Ratio
                      </p>
                      <p className="text-sm text-gray-600">
                        {generatePrompt.data.aiSettings.aspectRatio}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Style</p>
                      <p className="text-sm text-gray-600">
                        {generatePrompt.data.aiSettings.style}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Resolution
                      </p>
                      <p className="text-sm text-gray-600">
                        {generatePrompt.data.aiSettings.resolution}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Error Display */}
          {generatePrompt.error && (
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600">{generatePrompt.error.message}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
