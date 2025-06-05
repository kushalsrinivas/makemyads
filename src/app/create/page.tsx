"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Upload,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

const themes = [
  {
    name: "Summer Vibes",
    description: "Bright, energetic, seasonal",
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "Minimal Aesthetic",
    description: "Clean, simple, elegant",
    color: "from-gray-400 to-gray-600",
  },
  {
    name: "Festive Launch",
    description: "Celebratory, exciting, special",
    color: "from-purple-400 to-pink-500",
  },
  {
    name: "Urban Style",
    description: "Modern, trendy, city-inspired",
    color: "from-blue-400 to-indigo-600",
  },
  {
    name: "Nature Inspired",
    description: "Organic, calming, natural",
    color: "from-green-400 to-teal-500",
  },
];

const tones = [
  {
    name: "Playful",
    description: "Fun and energetic",
    color: "from-pink-400 to-orange-400",
  },
  {
    name: "Premium",
    description: "Luxury and elegant",
    color: "from-purple-600 to-blue-800",
  },
  {
    name: "Bold",
    description: "Strong and confident",
    color: "from-red-500 to-purple-600",
  },
  {
    name: "Friendly",
    description: "Warm and approachable",
    color: "from-green-400 to-teal-500",
  },
  {
    name: "Informative",
    description: "Educational and helpful",
    color: "from-blue-500 to-cyan-600",
  },
];

const templates = [
  {
    name: "Carousel for Instagram",
    description: "Multi-image swipeable format",
    icon: "📱",
    gradient: "from-pink-400 to-purple-500",
  },
  {
    name: "Product Drop Announcement",
    description: "Build excitement for new products",
    icon: "🚀",
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    name: "Clearance Countdown",
    description: "Create urgency for limited-time offers",
    icon: "⏱️",
    gradient: "from-red-400 to-orange-500",
  },
  {
    name: "UGC-style Testimonial",
    description: "Authentic user-generated content style",
    icon: "👥",
    gradient: "from-green-400 to-teal-500",
  },
];

export default function CreatePage() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);

      // Simulate upload delay
      setTimeout(() => {
        const newImages = Array.from(e.target.files || []).map((file) =>
          URL.createObjectURL(file)
        );
        setUploadedImages((prev) => [...prev, ...newImages].slice(0, 3)); // Limit to 3 images
        setIsUploading(false);
      }, 1500);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const canProceed = () => {
    return (
      productName.trim() !== "" &&
      productDescription.trim() !== "" &&
      selectedTheme !== "" &&
      selectedTone !== "" &&
      selectedTemplate !== "" &&
      uploadedImages.length > 0
    );
  };

  const handleSubmit = () => {
    if (canProceed()) {
      // Navigate to generate page with all the data
      window.location.href = "/generate";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Make My Ads
            </span>
          </Link>
          <Link href="/library">
            <Button variant="outline" size="sm">
              My Library
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              Create Your Ad
            </h1>
            <p className="text-xl text-gray-600">
              Fill in the details below to generate your custom ad creative
            </p>
          </div>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {uploadedImages.length < 3 && (
                  <div className="w-full h-32">
                    <label className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 transition-colors">
                      {isUploading ? (
                        <Sparkles className="w-8 h-8 text-gray-400 animate-spin" />
                      ) : (
                        <>
                          <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">
                            Upload Image
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploading || uploadedImages.length >= 3}
                      />
                    </label>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Upload 1-3 product images (max 5MB each)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  placeholder="e.g., Summer Breeze Linen Shirt"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="productDescription">Product Description</Label>
                <Textarea
                  id="productDescription"
                  placeholder="Briefly describe your product, its key features, and benefits..."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="mt-2 resize-none"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
            <CardHeader>
              <CardTitle>Select Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.name}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedTheme === theme.name
                        ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                        : "bg-white/60 backdrop-blur-sm border border-white/20"
                    } rounded-lg p-4`}
                    onClick={() => setSelectedTheme(theme.name)}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${theme.color} rounded-lg mb-4`}
                    ></div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {theme.name}
                    </h4>
                    <p className="text-sm text-gray-600">{theme.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
            <CardHeader>
              <CardTitle>Select Tone of Voice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {tones.map((tone) => (
                  <div
                    key={tone.name}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedTone === tone.name
                        ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                        : "bg-white/60 backdrop-blur-sm border border-white/20"
                    } rounded-lg p-4`}
                    onClick={() => setSelectedTone(tone.name)}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${tone.color} rounded-lg mb-4`}
                    ></div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {tone.name}
                    </h4>
                    <p className="text-sm text-gray-600">{tone.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
            <CardHeader>
              <CardTitle>Select Ad Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.name}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedTemplate === template.name
                        ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                        : "bg-white/60 backdrop-blur-sm border border-white/20"
                    } rounded-lg p-4`}
                    onClick={() => setSelectedTemplate(template.name)}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${template.gradient} rounded-lg flex items-center justify-center text-2xl mb-4`}
                    >
                      {template.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {template.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {template.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <Link href="/">
              <Button variant="outline" className="px-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>

            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8"
            >
              Generate Ad
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
