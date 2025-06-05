"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  MousePointer,
  Users,
  ArrowLeft,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import Link from "next/link";

const performanceData = {
  overview: {
    totalSpend: 1247.5,
    totalRevenue: 4892.3,
    roas: 3.92,
    impressions: 127543,
    clicks: 3421,
    conversions: 89,
    ctr: 2.68,
    conversionRate: 2.6,
  },
  campaigns: [
    {
      id: 1,
      name: "Summer Sneaker Campaign",
      status: "Active",
      platform: "Meta Ads",
      spend: 425.8,
      revenue: 1847.2,
      roas: 4.34,
      impressions: 45231,
      clicks: 1247,
      conversions: 34,
      ctr: 2.76,
      conversionRate: 2.73,
      trend: "up",
    },
    {
      id: 2,
      name: "Athletic Shorts Push",
      status: "Active",
      platform: "TikTok Ads",
      spend: 312.4,
      revenue: 1156.8,
      roas: 3.7,
      impressions: 38942,
      clicks: 892,
      conversions: 21,
      ctr: 2.29,
      conversionRate: 2.35,
      trend: "up",
    },
    {
      id: 3,
      name: "Premium Sunglasses",
      status: "Completed",
      platform: "Google Ads",
      spend: 289.6,
      revenue: 1234.5,
      roas: 4.26,
      impressions: 28431,
      clicks: 743,
      conversions: 19,
      ctr: 2.61,
      conversionRate: 2.56,
      trend: "down",
    },
    {
      id: 4,
      name: "Clearance Event",
      status: "Completed",
      platform: "Meta Ads",
      spend: 219.7,
      revenue: 653.8,
      roas: 2.98,
      impressions: 14939,
      clicks: 539,
      conversions: 15,
      ctr: 3.61,
      conversionRate: 2.78,
      trend: "up",
    },
  ],
  timeSeriesData: [
    { date: "Jan 1", spend: 45, revenue: 178, impressions: 4200, clicks: 112 },
    { date: "Jan 2", spend: 52, revenue: 203, impressions: 4800, clicks: 128 },
    { date: "Jan 3", spend: 48, revenue: 189, impressions: 4500, clicks: 119 },
    { date: "Jan 4", spend: 61, revenue: 245, impressions: 5200, clicks: 142 },
    { date: "Jan 5", spend: 58, revenue: 231, impressions: 4900, clicks: 135 },
    { date: "Jan 6", spend: 67, revenue: 278, impressions: 5600, clicks: 156 },
    { date: "Jan 7", spend: 72, revenue: 298, impressions: 6100, clicks: 167 },
  ],
};

const platformBreakdown = [
  {
    platform: "Meta Ads",
    spend: 645.5,
    revenue: 2501.0,
    percentage: 51.7,
    color: "from-blue-400 to-blue-600",
  },
  {
    platform: "TikTok Ads",
    spend: 312.4,
    revenue: 1156.8,
    percentage: 25.0,
    color: "from-pink-400 to-pink-600",
  },
  {
    platform: "Google Ads",
    spend: 289.6,
    revenue: 1234.5,
    percentage: 23.3,
    color: "from-green-400 to-green-600",
  },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(2)}%`;
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
                Analytics
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-md text-gray-700"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Spend</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(performanceData.overview.totalSpend)}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12.5%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(performanceData.overview.totalRevenue)}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+18.3%</span>
                  </div>
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
                  <p className="text-sm text-gray-600 mb-1">ROAS</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {performanceData.overview.roas.toFixed(2)}x
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+5.7%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Conversions</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatNumber(performanceData.overview.conversions)}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+22.1%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/60 backdrop-blur-sm border-white/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Performance Chart */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <LineChart className="w-5 h-5 mr-2" />
                    Performance Trends
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={
                        selectedMetric === "revenue" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedMetric("revenue")}
                    >
                      Revenue
                    </Button>
                    <Button
                      variant={
                        selectedMetric === "spend" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedMetric("spend")}
                    >
                      Spend
                    </Button>
                    <Button
                      variant={
                        selectedMetric === "impressions" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedMetric("impressions")}
                    >
                      Impressions
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Interactive chart showing {selectedMetric} trends
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {selectedMetric === "revenue" &&
                        "Revenue has increased 18.3% over the selected period"}
                      {selectedMetric === "spend" &&
                        "Ad spend has increased 12.5% over the selected period"}
                      {selectedMetric === "impressions" &&
                        "Impressions have grown 25.7% over the selected period"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-2xl font-semibold text-gray-900 mb-1">
                    {formatNumber(performanceData.overview.impressions)}
                  </p>
                  <p className="text-sm text-gray-600">Total Impressions</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+25.7%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <MousePointer className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <p className="text-2xl font-semibold text-gray-900 mb-1">
                    {formatNumber(performanceData.overview.clicks)}
                  </p>
                  <p className="text-sm text-gray-600">Total Clicks</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+19.2%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                  <p className="text-2xl font-semibold text-gray-900 mb-1">
                    {formatPercentage(performanceData.overview.ctr)}
                  </p>
                  <p className="text-sm text-gray-600">Click-Through Rate</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-sm text-red-600">-2.1%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <p className="text-2xl font-semibold text-gray-900 mb-1">
                    {formatPercentage(performanceData.overview.conversionRate)}
                  </p>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+8.4%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="p-4 bg-white/50 rounded-lg border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-gray-900">
                            {campaign.name}
                          </h3>
                          <Badge
                            className={`${
                              campaign.status === "Active"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-blue-100 text-blue-800 border-blue-200"
                            }`}
                          >
                            {campaign.status}
                          </Badge>
                          <Badge variant="outline" className="bg-white/50">
                            {campaign.platform}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          {campaign.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            {campaign.roas.toFixed(2)}x ROAS
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-6 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Spend</p>
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(campaign.spend)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Revenue</p>
                          <p className="font-semibold text-green-600">
                            {formatCurrency(campaign.revenue)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Impressions</p>
                          <p className="font-semibold text-gray-900">
                            {formatNumber(campaign.impressions)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Clicks</p>
                          <p className="font-semibold text-gray-900">
                            {formatNumber(campaign.clicks)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">CTR</p>
                          <p className="font-semibold text-gray-900">
                            {formatPercentage(campaign.ctr)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Conv. Rate</p>
                          <p className="font-semibold text-gray-900">
                            {formatPercentage(campaign.conversionRate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Platform Breakdown Chart */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Platform Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformBreakdown.map((platform, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            {platform.platform}
                          </span>
                          <span className="text-sm text-gray-600">
                            {platform.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${platform.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${platform.percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Spend: {formatCurrency(platform.spend)}</span>
                          <span>
                            Revenue: {formatCurrency(platform.revenue)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Platform Performance */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {platformBreakdown.map((platform, index) => (
                      <div key={index} className="p-4 bg-white/50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">
                            {platform.platform}
                          </h3>
                          <Badge className="bg-gradient-to-r from-orange-100 to-purple-100 text-gray-700 border-0">
                            {(platform.revenue / platform.spend).toFixed(2)}x
                            ROAS
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Total Spend</p>
                            <p className="font-semibold text-gray-900">
                              {formatCurrency(platform.spend)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Revenue</p>
                            <p className="font-semibold text-green-600">
                              {formatCurrency(platform.revenue)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Performance Insights */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-green-700">
                    🎯 Top Performing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">
                      Summer Sneaker Campaign
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-green-700">ROAS: 4.34x</p>
                        <p className="text-green-600">
                          Revenue: {formatCurrency(1847.2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-green-700">CTR: 2.76%</p>
                        <p className="text-green-600">Conv. Rate: 2.73%</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Premium Sunglasses
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-blue-700">ROAS: 4.26x</p>
                        <p className="text-blue-600">
                          Revenue: {formatCurrency(1234.5)}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-700">CTR: 2.61%</p>
                        <p className="text-blue-600">Conv. Rate: 2.56%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-orange-700">
                    📈 Optimization Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">
                      Clearance Event
                    </h4>
                    <p className="text-sm text-orange-700 mb-2">
                      ROAS below target (2.98x vs 3.5x goal)
                    </p>
                    <p className="text-xs text-orange-600">
                      💡 Consider adjusting targeting or creative to improve
                      performance
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">
                      TikTok Ads Platform
                    </h4>
                    <p className="text-sm text-purple-700 mb-2">
                      Lower CTR compared to other platforms
                    </p>
                    <p className="text-xs text-purple-600">
                      💡 Test more video-focused creatives for better engagement
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Overall Performance
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Strong ROAS across all campaigns
                    </p>
                    <p className="text-xs text-gray-600">
                      💡 Consider scaling successful campaigns with increased
                      budgets
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
