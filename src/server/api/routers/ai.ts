import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Input validation schema
const generatePromptInput = z.object({
  productName: z.string().min(1, "Product name is required"),
  productDescription: z.string().min(1, "Product description is required"),
  theme: z.string().min(1, "Theme is required"),
  tone: z.string().min(1, "Tone is required"),
  template: z.string().min(1, "Template is required"),
  customTheme: z.string().optional(),
  customTone: z.string().optional(),
  customTemplate: z.string().optional(),
});

// Theme descriptions for better prompt generation
const themeDescriptions = {
  "Summer Vibes": "bright, energetic, warm colors, sun-soaked lighting, beach or outdoor settings",
  "Minimal Aesthetic": "clean lines, simple composition, neutral colors, lots of white space, modern",
  "Festive Launch": "celebratory, exciting, vibrant colors, party elements, special occasion feel",
  "Urban Style": "modern, trendy, city-inspired, street style, contemporary architecture",
  "Nature Inspired": "organic, calming, natural colors, outdoor settings, eco-friendly feel",
};

// Tone descriptions for better prompt generation
const toneDescriptions = {
  "Playful": "fun, energetic, lighthearted, youthful, engaging",
  "Premium": "luxury, elegant, sophisticated, high-end, refined",
  "Bold": "strong, confident, impactful, attention-grabbing, powerful",
  "Friendly": "warm, approachable, welcoming, personable, inviting",
  "Informative": "educational, helpful, clear, trustworthy, professional",
};

// Template descriptions for better prompt generation
const templateDescriptions = {
  "Carousel for Instagram": "multi-frame Instagram carousel layout, swipeable format, mobile-optimized",
  "Product Drop Announcement": "product launch style, excitement-building, new arrival focus",
  "Clearance Countdown": "urgency-driven, limited-time offer, countdown elements, sale focus",
  "UGC-style Testimonial": "authentic user-generated content style, real person testimonial, genuine feel",
};

export const aiRouter = createTRPCRouter({
  generatePrompt: publicProcedure
    .input(generatePromptInput)
    .mutation(({ input }) => {
      // Determine which theme to use
      const themeUsed = input.theme === "Custom" && input.customTheme 
        ? `Custom: ${input.customTheme}`
        : input.theme;
      
      const themeDescription = input.theme === "Custom" && input.customTheme
        ? input.customTheme
        : themeDescriptions[input.theme as keyof typeof themeDescriptions] || input.theme;

      // Determine which tone to use
      const toneUsed = input.tone === "Custom" && input.customTone
        ? `Custom: ${input.customTone}`
        : input.tone;
      
      const toneDescription = input.tone === "Custom" && input.customTone
        ? input.customTone
        : toneDescriptions[input.tone as keyof typeof toneDescriptions] || input.tone;

      // Determine which template to use
      const templateUsed = input.template === "Custom" && input.customTemplate
        ? `Custom: ${input.customTemplate}`
        : input.template;
      
      const templateDescription = input.template === "Custom" && input.customTemplate
        ? input.customTemplate
        : templateDescriptions[input.template as keyof typeof templateDescriptions] || input.template;

      // Generate the comprehensive AI prompt
      const finalPrompt = `Create a ${toneDescription} advertisement featuring "${input.productName}" — ${input.productDescription}. 

Visual Style: ${themeDescription}. The overall aesthetic should be ${themeDescription.toLowerCase()}.

Tone & Messaging: The advertisement should feel ${toneDescription.toLowerCase()}. 

Format & Layout: ${templateDescription}. 

Key Requirements:
- Product name "${input.productName}" should be prominently featured
- Highlight the key benefits: ${input.productDescription}
- Maintain a ${toneDescription.toLowerCase()} tone throughout
- Use ${themeDescription.toLowerCase()} visual elements
- Optimize for ${templateDescription.toLowerCase()}
- Ensure the design is eye-catching and conversion-focused
- Include clear call-to-action elements
- Make it suitable for social media advertising

Style: photorealistic, high-quality, professional advertising photography, optimized for digital marketing.`;

      // Create prompt breakdown for transparency
      const promptBreakdown = {
        product: input.productName,
        description: input.productDescription,
        themeUsed,
        toneUsed,
        templateUsed,
      };

      // Default AI settings optimized for social media ads
      const aiSettings = {
        aspectRatio: "4:5", // Instagram/Facebook optimal ratio
        style: "photorealistic",
        resolution: "1024x1280",
        quality: "high",
        optimization: "social_media_ads",
      };

      return {
        finalPrompt,
        promptBreakdown,
        aiSettings,
      };
    }),
}); 