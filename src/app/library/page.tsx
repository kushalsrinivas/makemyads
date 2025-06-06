"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Search,
  Grid3X3,
  List,
  Edit,
  Copy,
  Trash2,
  ArrowLeft,
  Plus,
} from "lucide-react";
import Link from "next/link";

const savedCreatives = [
  {
    id: 1,
    title: "Summer Breeze Linen Shirt",
    template: "Carousel for Instagram",
    theme: "Summer Vibes",
    tone: "Playful",
    thumbnail: "👕",
    dateCreated: "2024-01-15",
    hook: "☀️ Summer Essential Alert!",
    copy: "Ultra-lightweight linen that keeps you cool even on the hottest days.",
  },
  {
    id: 2,
    title: "Minimalist Watch Collection",
    template: "Product Drop Announcement",
    theme: "Minimal Aesthetic",
    tone: "Premium",
    thumbnail: "⌚",
    dateCreated: "2024-01-14",
    hook: "Timeless Design. Unparalleled Craftsmanship.",
    copy: "Introducing our new collection of minimalist watches designed for the modern individual.",
  },
  {
    id: 3,
    title: "Organic Skincare Set",
    template: "UGC-style Testimonial",
    theme: "Nature Inspired",
    tone: "Friendly",
    thumbnail: "🧴",
    dateCreated: "2024-01-13",
    hook: "My skin has never felt better! ✨",
    copy: "I've been using this organic skincare set for just 2 weeks and the difference is incredible!",
  },
  {
    id: 4,
    title: "Winter Collection Clearance",
    template: "Clearance Countdown",
    theme: "Festive Launch",
    tone: "Bold",
    thumbnail: "🧥",
    dateCreated: "2024-01-12",
    hook: "FINAL 48 HOURS: UP TO 70% OFF!",
    copy: "Last chance to grab our premium winter collection at unbelievable prices. When it's gone, it's gone!",
  },
];

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [creatives, setCreatives] = useState(savedCreatives);

  const filteredCreatives = creatives.filter((creative) => {
    return (
      creative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creative.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creative.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creative.tone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this creative?")) {
      setCreatives(creatives.filter((creative) => creative.id !== id));
    }
  };

  const handleDuplicate = (id: number) => {
    const creativeToDuplicate = creatives.find(
      (creative) => creative.id === id
    );
    if (creativeToDuplicate) {
      const newCreative = {
        ...creativeToDuplicate,
        id: Math.max(...creatives.map((c) => c.id)) + 1,
        title: `${creativeToDuplicate.title} (Copy)`,
        dateCreated: new Date().toISOString().split("T")[0],
      } as typeof creativeToDuplicate;
      setCreatives([...creatives, newCreative]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                My Ad Library
              </span>
            </div>
          </div>

          <Link href="/create">
            <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create New Ad
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search creatives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/60 backdrop-blur-sm border-white/20"
            />
          </div>

          <div className="flex items-center bg-white/60 backdrop-blur-sm border border-white/20 rounded-md p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredCreatives.length}{" "}
            {filteredCreatives.length === 1 ? "creative" : "creatives"} in your
            library
          </p>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreatives.map((creative) => (
              <Card
                key={creative.id}
                className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all group"
              >
                <CardContent className="p-6">
                  {/* Thumbnail */}
                  <div className="bg-gradient-to-br from-orange-100 to-purple-100 rounded-lg p-6 mb-4 text-center">
                    <div className="text-4xl mb-2">{creative.thumbnail}</div>
                    <p className="text-sm text-gray-600">{creative.template}</p>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {creative.title}
                      </h3>
                      <Badge className="text-xs bg-gradient-to-r from-orange-100 to-purple-100 text-gray-700 border-0">
                        {creative.tone}
                      </Badge>
                    </div>

                    <p className="text-sm font-medium text-gray-800">
                      {creative.hook}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {creative.copy}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <Badge variant="outline" className="text-xs bg-white/50">
                        {creative.theme}
                      </Badge>
                      <span>{creative.dateCreated}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDuplicate(creative.id)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(creative.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Link href={`/generate?id=${creative.id}`}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-orange-500 to-purple-600 text-white h-8 px-3"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {filteredCreatives.map((creative) => (
                  <div
                    key={creative.id}
                    className="p-6 hover:bg-white/30 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{creative.thumbnail}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {creative.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {creative.template} • {creative.theme}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="text-xs bg-gradient-to-r from-orange-100 to-purple-100 text-gray-700 border-0">
                              {creative.tone}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {creative.dateCreated}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDuplicate(creative.id)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Link href={`/generate?id=${creative.id}`}>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-orange-500 to-purple-600 text-white"
                          >
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(creative.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {filteredCreatives.length === 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No creatives found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? "Try adjusting your search terms to find what you're looking for."
                  : "Create your first ad to get started."}
              </p>
              <Link href="/create">
                <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Ad
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
