# AI Prompt Generation API

This API endpoint generates comprehensive AI prompts for image generation models (DALL·E, Midjourney, Stability AI) by combining product details, visual themes, tones, and templates into optimized creative briefs.

## Endpoint

**tRPC Procedure:** `ai.generatePrompt`  
**Type:** Mutation  
**Access:** Public (no authentication required)

## Input Schema

```typescript
{
  productName: string;           // Required: Name of the product
  productDescription: string;    // Required: Description of the product
  theme: string;                // Required: Visual theme selection
  tone: string;                 // Required: Tone of voice selection
  template: string;             // Required: Ad template selection
  customTheme?: string;         // Optional: Custom theme description (when theme = "Custom")
  customTone?: string;          // Optional: Custom tone description (when tone = "Custom")
  customTemplate?: string;      // Optional: Custom template description (when template = "Custom")
}
```

## Available Themes

- **Summer Vibes**: Bright, energetic, warm colors, sun-soaked lighting
- **Minimal Aesthetic**: Clean lines, simple composition, neutral colors
- **Festive Launch**: Celebratory, exciting, vibrant colors, party elements
- **Urban Style**: Modern, trendy, city-inspired, street style
- **Nature Inspired**: Organic, calming, natural colors, outdoor settings
- **Custom**: User-defined theme (requires `customTheme` field)

## Available Tones

- **Playful**: Fun, energetic, lighthearted, youthful
- **Premium**: Luxury, elegant, sophisticated, high-end
- **Bold**: Strong, confident, impactful, attention-grabbing
- **Friendly**: Warm, approachable, welcoming, personable
- **Informative**: Educational, helpful, clear, trustworthy
- **Custom**: User-defined tone (requires `customTone` field)

## Available Templates

- **Carousel for Instagram**: Multi-frame Instagram carousel layout
- **Product Drop Announcement**: Product launch style, excitement-building
- **Clearance Countdown**: Urgency-driven, limited-time offer focus
- **UGC-style Testimonial**: Authentic user-generated content style
- **Custom**: User-defined template (requires `customTemplate` field)

## Response Schema

```typescript
{
  finalPrompt: string; // Complete AI prompt ready for image generation
  promptBreakdown: {
    // Breakdown of how the prompt was composed
    product: string;
    description: string;
    themeUsed: string;
    toneUsed: string;
    templateUsed: string;
  }
  aiSettings: {
    // Recommended AI generation settings
    aspectRatio: string; // "4:5" (Instagram/Facebook optimal)
    style: string; // "photorealistic"
    resolution: string; // "1024x1280"
    quality: string; // "high"
    optimization: string; // "social_media_ads"
  }
}
```

## Example Usage

### Input

```json
{
  "productName": "Beachside Linen Shirt",
  "productDescription": "A breathable, lightweight summer shirt made from organic linen. Perfect for coastal getaways.",
  "theme": "Summer Vibes",
  "tone": "Playful",
  "template": "Carousel for Instagram",
  "customTheme": "Use sun-soaked golden hour lighting with a beach boardwalk in the background",
  "customTone": "Make it feel lighthearted and adventurous, like a summer memory",
  "customTemplate": "Include first frame with product name, second frame with lifestyle shot, and third frame with bold CTA"
}
```

### Output

```json
{
  "finalPrompt": "Create a fun, energetic, lighthearted, youthful, engaging advertisement featuring \"Beachside Linen Shirt\" — A breathable, lightweight summer shirt made from organic linen. Perfect for coastal getaways. \n\nVisual Style: Use sun-soaked golden hour lighting with a beach boardwalk in the background. The overall aesthetic should be use sun-soaked golden hour lighting with a beach boardwalk in the background.\n\nTone & Messaging: The advertisement should feel make it feel lighthearted and adventurous, like a summer memory. \n\nFormat & Layout: Include first frame with product name, second frame with lifestyle shot, and third frame with bold CTA. \n\nKey Requirements:\n- Product name \"Beachside Linen Shirt\" should be prominently featured\n- Highlight the key benefits: A breathable, lightweight summer shirt made from organic linen. Perfect for coastal getaways.\n- Maintain a make it feel lighthearted and adventurous, like a summer memory tone throughout\n- Use use sun-soaked golden hour lighting with a beach boardwalk in the background visual elements\n- Optimize for include first frame with product name, second frame with lifestyle shot, and third frame with bold cta\n- Ensure the design is eye-catching and conversion-focused\n- Include clear call-to-action elements\n- Make it suitable for social media advertising\n\nStyle: photorealistic, high-quality, professional advertising photography, optimized for digital marketing.",
  "promptBreakdown": {
    "product": "Beachside Linen Shirt",
    "description": "A breathable, lightweight summer shirt made from organic linen. Perfect for coastal getaways.",
    "themeUsed": "Custom: Use sun-soaked golden hour lighting with a beach boardwalk in the background",
    "toneUsed": "Custom: Make it feel lighthearted and adventurous, like a summer memory",
    "templateUsed": "Custom: Include first frame with product name, second frame with lifestyle shot, and third frame with bold CTA"
  },
  "aiSettings": {
    "aspectRatio": "4:5",
    "style": "photorealistic",
    "resolution": "1024x1280",
    "quality": "high",
    "optimization": "social_media_ads"
  }
}
```

## Frontend Integration

### React/tRPC Usage

```typescript
import { api } from "@/trpc/react";

const generatePrompt = api.ai.generatePrompt.useMutation({
  onSuccess: (data) => {
    console.log("Generated prompt:", data.finalPrompt);
    // Use data.finalPrompt with your AI image generation service
  },
  onError: (error) => {
    console.error("Failed to generate prompt:", error);
  },
});

// Call the API
generatePrompt.mutate({
  productName: "Your Product",
  productDescription: "Product description...",
  theme: "Summer Vibes",
  tone: "Playful",
  template: "Carousel for Instagram",
});
```

## Test Page

Visit `/test-ai` to see a working example with the provided sample data.

## Features

- ✅ **Smart Prompt Composition**: Combines all inputs into coherent creative briefs
- ✅ **Custom Override Support**: Handles custom themes, tones, and templates
- ✅ **Validation**: Input validation with helpful error messages
- ✅ **Optimized for AI Models**: Prompts structured for best results with image generation APIs
- ✅ **Social Media Ready**: Default settings optimized for social media advertising
- ✅ **Transparent Breakdown**: Shows how each component contributes to the final prompt

## Integration with AI Image Services

The generated `finalPrompt` can be used directly with:

- **DALL·E 3**: OpenAI's image generation API
- **Midjourney**: Via Discord bot or API
- **Stability AI**: Stable Diffusion API
- **Adobe Firefly**: Creative Cloud APIs
- **Any other text-to-image service**

Use the `aiSettings` object to configure generation parameters specific to your chosen service.
