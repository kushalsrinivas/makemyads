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
  Rocket,
  Copy,
  Trash2,
  ArrowLeft,
  Plus,
} from "lucide-react";
import Link from "next/link";

const draftCreatives = [
  {
    id: 1,
    title: "Summer Sneaker Campaign",
    product: "Athletic Sneakers",
    thumbnail: "👟",
    status: "Published",
    campaign: "Summer Sale",
    dateCreated: "2024-01-15",
    performance: "+24%",
    tags: ["Top Seller", "Summer", "Athletic"],
  },
  {
    id: 2,
    title: "New Arrivals Push",
    product: "Athletic Shorts",
    thumbnail: "🩳",
    status: "Draft",
    campaign: "New Products",
    dateCreated: "2024-01-14",
    performance: "—",
    tags: ["New Arrival", "Athletic"],
  },
  {
    id: 3,
    title: "Premium Sunglasses Ad",
    product: "Designer Sunglasses",
    thumbnail: "🕶️",
    status: "Published",
    campaign: "Premium Collection",
    dateCreated: "2024-01-13",
    performance: "+18%",
    tags: ["Premium", "Accessories"],
  },
  {
    id: 4,
    title: "Clearance Event",
    product: "Winter Jackets",
    thumbnail: "🧥",
    status: "Completed",
    campaign: "Inventory Clear",
    dateCreated: "2024-01-12",
    performance: "+31%",
    tags: ["Clearance", "Winter"],
  },
  {
    id: 5,
    title: "Back to School",
    product: "Backpacks",
    thumbnail: "🎒",
    status: "Draft",
    campaign: "Education",
    dateCreated: "2024-01-11",
    performance: "—",
    tags: ["Seasonal", "Education"],
  },
  {
    id: 6,
    title: "Fitness Gear Promo",
    product: "Workout Equipment",
    thumbnail: "🏋️",
    status: "Published",
    campaign: "Fitness Focus",
    dateCreated: "2024-01-10",
    performance: "+15%",
    tags: ["Fitness", "Equipment"],
  },
];

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCreatives = draftCreatives.filter((creative) => {
    const matchesSearch =
      creative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creative.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || creative.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800 border-green-200";
      case "Draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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
                Creative Library
              </span>
            </div>
          </div>

          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create New
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

          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-md text-gray-700"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="completed">Completed</option>
            </select>

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
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCreatives.length} of {draftCreatives.length}{" "}
            creatives
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
                    <p className="text-sm text-gray-600">{creative.product}</p>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {creative.title}
                      </h3>
                      <Badge
                        className={`text-xs ${getStatusColor(creative.status)}`}
                      >
                        {creative.status}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {creative.tags.slice(0, 2).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-white/50"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {creative.tags.length > 2 && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-white/50"
                        >
                          +{creative.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{creative.dateCreated}</span>
                      <span
                        className={
                          creative.performance !== "—"
                            ? "text-green-600 font-medium"
                            : ""
                        }
                      >
                        {creative.performance}
                      </span>
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
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      {creative.status === "Draft" && (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-orange-500 to-purple-600 text-white h-8 px-3"
                        >
                          <Rocket className="w-3 h-3 mr-1" />
                          Publish
                        </Button>
                      )}
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
                            {creative.product} • {creative.campaign}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            {creative.tags.slice(0, 3).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-white/50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <Badge
                            className={`${getStatusColor(
                              creative.status
                            )} text-xs`}
                          >
                            {creative.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {creative.dateCreated}
                          </p>
                        </div>

                        <div className="text-right">
                          <p
                            className={`text-sm font-medium ${
                              creative.performance !== "—"
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            {creative.performance}
                          </p>
                          <p className="text-xs text-gray-500">Performance</p>
                        </div>

                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="w-4 h-4" />
                          </Button>
                          {creative.status === "Draft" && (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-orange-500 to-purple-600 text-white"
                            >
                              <Rocket className="w-4 h-4 mr-1" />
                              Publish
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Creative
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
