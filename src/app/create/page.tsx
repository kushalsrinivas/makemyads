"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
  Palette,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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

const steps = [
  { id: 1, title: "Product Details", icon: Upload },
  { id: 2, title: "Visual Theme", icon: Palette },
  { id: 3, title: "Tone of Voice", icon: MessageSquare },
  { id: 4, title: "Ad Template", icon: ImageIcon },
  { id: 5, title: "Review", icon: CheckCircle },
];

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [customTheme, setCustomTheme] = useState("");
  const [customTone, setCustomTone] = useState("");
  const [customTemplate, setCustomTemplate] = useState("");
  const [uploadedImages, setUploadedImages] = useState<
    { url: string; timestamp: number }[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("adCreationData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setProductName(data.productName || "");
      setProductDescription(data.productDescription || "");
      setSelectedTheme(data.selectedTheme || "");
      setSelectedTone(data.selectedTone || "");
      setSelectedTemplate(data.selectedTemplate || "");
      setCustomTheme(data.customTheme || "");
      setCustomTone(data.customTone || "");
      setCustomTemplate(data.customTemplate || "");
      setUploadedImages(data.uploadedImages || []);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const data = {
      productName,
      productDescription,
      selectedTheme,
      selectedTone,
      selectedTemplate,
      customTheme,
      customTone,
      customTemplate,
      uploadedImages: uploadedImages.map((image) => image.url),
    };
    localStorage.setItem("adCreationData", JSON.stringify(data));
  }, [
    productName,
    productDescription,
    selectedTheme,
    selectedTone,
    selectedTemplate,
    customTheme,
    customTone,
    customTemplate,
    uploadedImages,
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);

      // Simulate upload delay
      setTimeout(() => {
        const newImages = Array.from(e.target.files || []).map((file) => ({
          url: URL.createObjectURL(file),
          timestamp: Date.now() + Math.random(), // Ensure uniqueness
        }));
        setUploadedImages((prev) => [...prev, ...newImages].slice(0, 3)); // Limit to 3 images
        setIsUploading(false);
      }, 1500);
    }
  };

  const removeImage = (timestamp: number) => {
    setUploadedImages((prev) =>
      prev.filter((image) => image.timestamp !== timestamp)
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          productName.trim() !== "" &&
          productDescription.trim() !== "" &&
          uploadedImages.length > 0
        );
      case 2:
        return (
          selectedTheme !== "" &&
          (selectedTheme !== "Custom" || customTheme.trim() !== "")
        );
      case 3:
        return (
          selectedTone !== "" &&
          (selectedTone !== "Custom" || customTone.trim() !== "")
        );
      case 4:
        return (
          selectedTemplate !== "" &&
          (selectedTemplate !== "Custom" || customTemplate.trim() !== "")
        );
      case 5:
        return true; // Review step is always proceedable
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to generate page with all the data
      window.location.href = "/generate";
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / steps.length) * 100;

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
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-20 h-1 mx-4 ${
                      currentStep > step.id
                        ? "bg-gradient-to-r from-orange-500 to-purple-600"
                        : "bg-gray-200"
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
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                Product Details
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Tell us about your product and upload some images
              </p>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Product Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {uploadedImages.map((image) => (
                      <div
                        key={`image-${image.timestamp}`}
                        className="relative"
                      >
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt="Product"
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.timestamp)}
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
                    <Label htmlFor="productDescription">
                      Product Description
                    </Label>
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
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                Visual Theme
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Choose the visual style for your ad
              </p>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
                <CardHeader>
                  <CardTitle>Select Theme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        type="button"
                        className={`w-full text-left cursor-pointer transition-all hover:shadow-lg ${
                          selectedTheme === theme.name
                            ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                            : "bg-white/60 backdrop-blur-sm border border-white/20"
                        } rounded-lg p-4`}
                        onClick={() => setSelectedTheme(theme.name)}
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${theme.color} rounded-lg mb-4`}
                        />
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {theme.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {theme.description}
                        </p>
                      </button>
                    ))}
                    <button
                      type="button"
                      className={`w-full text-left cursor-pointer transition-all hover:shadow-lg ${
                        selectedTheme === "Custom"
                          ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                          : "bg-white/60 backdrop-blur-sm border border-white/20"
                      } rounded-lg p-4`}
                      onClick={() => setSelectedTheme("Custom")}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg mb-4 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        Custom Theme
                      </h4>
                      <p className="text-sm text-gray-600">
                        Create your own unique style
                      </p>
                    </button>
                  </div>
                  {selectedTheme === "Custom" && (
                    <div className="mt-6">
                      <Textarea
                        placeholder="Describe your custom theme (e.g., 'mid-century minimalist with Gen Z color palette')..."
                        value={customTheme}
                        onChange={(e) => setCustomTheme(e.target.value)}
                        className="resize-none min-h-[100px]"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                Tone of Voice
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Choose the tone for your ad
              </p>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
                <CardHeader>
                  <CardTitle>Select Tone of Voice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {tones.map((tone) => (
                      <button
                        key={tone.name}
                        type="button"
                        className={`w-full text-left cursor-pointer transition-all hover:shadow-lg ${
                          selectedTone === tone.name
                            ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                            : "bg-white/60 backdrop-blur-sm border border-white/20"
                        } rounded-lg p-4`}
                        onClick={() => setSelectedTone(tone.name)}
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${tone.color} rounded-lg mb-4`}
                        />
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {tone.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {tone.description}
                        </p>
                      </button>
                    ))}
                    <button
                      type="button"
                      className={`w-full text-left cursor-pointer transition-all hover:shadow-lg ${
                        selectedTone === "Custom"
                          ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                          : "bg-white/60 backdrop-blur-sm border border-white/20"
                      } rounded-lg p-4`}
                      onClick={() => setSelectedTone("Custom")}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg mb-4 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        Custom Tone
                      </h4>
                      <p className="text-sm text-gray-600">
                        Define your own unique voice
                      </p>
                    </button>
                  </div>
                  {selectedTone === "Custom" && (
                    <div className="mt-6">
                      <Textarea
                        placeholder="Describe your custom tone (e.g., 'inspirational but grounded')..."
                        value={customTone}
                        onChange={(e) => setCustomTone(e.target.value)}
                        className="resize-none min-h-[100px]"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                Ad Template
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Choose a template that best fits your campaign
              </p>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
                <CardHeader>
                  <CardTitle>Select Ad Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <button
                        key={template.name}
                        type="button"
                        className={`w-full text-left cursor-pointer transition-all hover:shadow-lg ${
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
                      </button>
                    ))}
                    <button
                      type="button"
                      className={`w-full text-left cursor-pointer transition-all hover:shadow-lg ${
                        selectedTemplate === "Custom"
                          ? "ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-purple-50"
                          : "bg-white/60 backdrop-blur-sm border border-white/20"
                      } rounded-lg p-4`}
                      onClick={() => setSelectedTemplate("Custom")}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg mb-4 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        Custom Template
                      </h4>
                      <p className="text-sm text-gray-600">
                        Create your own unique format
                      </p>
                    </button>
                  </div>
                  {selectedTemplate === "Custom" && (
                    <div className="mt-6">
                      <Textarea
                        placeholder="Describe your custom template (e.g., 'influencer-style reel script')..."
                        value={customTemplate}
                        onChange={(e) => setCustomTemplate(e.target.value)}
                        className="resize-none min-h-[100px]"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                Review Your Ad
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Review your selections before generating the ad
              </p>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Product Details
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {uploadedImages.map((image) => (
                        <img
                          key={`review-image-${image.timestamp}`}
                          src={image.url}
                          alt="Product"
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Name:</span> {productName}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Description:</span>{" "}
                        {productDescription}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Style & Voice
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Theme:</span>{" "}
                        {selectedTheme === "Custom" ? (
                          <>
                            Custom:{" "}
                            <span className="italic">{customTheme}</span>
                          </>
                        ) : (
                          selectedTheme
                        )}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Tone:</span>{" "}
                        {selectedTone === "Custom" ? (
                          <>
                            Custom: <span className="italic">{customTone}</span>
                          </>
                        ) : (
                          selectedTone
                        )}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Template
                    </h3>
                    <p className="text-gray-600">
                      {selectedTemplate === "Custom" ? (
                        <>
                          Custom:{" "}
                          <span className="italic">{customTemplate}</span>
                        </>
                      ) : (
                        selectedTemplate
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6"
            >
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
                  Generate Ad
                  <ArrowRight className="ml-2 w-4 h-4" />
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
  );
}
