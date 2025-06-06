# Gemini API Setup Guide

This guide will help you set up Google's Gemini API for **real AI image generation** in your MakeMyAds application.

## 🚀 Quick Setup (Recommended)

### Step 1: Get Your API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated API key (starts with `AIza...`)

### Step 2: Add API Key to Your Project

Create a `.env.local` file in your project root:

```env
GOOGLE_GEMINI_API_KEY=AIzaSyC-your-actual-api-key-here
```

**Important:** Replace `AIzaSyC-your-actual-api-key-here` with your actual API key!

### Step 3: Restart Your Development Server

```bash
npm run dev
```

## ✅ How to Test

1. Go to `/create` and generate a prompt
2. Navigate to `/generate`
3. Wait for images to generate
4. Look for **"AI Generated"** green badges instead of **"Demo"** yellow badges

## 🔍 Troubleshooting

### Still Seeing Demo Images?

**Check these common issues:**

1. **API Key Missing**: Make sure `.env.local` exists with your API key
2. **Wrong API Key**: Ensure it starts with `AIza` and is from Google AI Studio
3. **Server Not Restarted**: Restart your dev server after adding the API key
4. **Quota Exceeded**: Check your [Google AI Studio usage](https://aistudio.google.com/app/apikey)

### Error Messages

- **"GOOGLE_GEMINI_API_KEY not configured"**: Add your API key to `.env.local`
- **"Gemini API request failed: 403"**: Check your API key is valid and has quota
- **"No images were generated"**: Your prompt may have been filtered for safety

## 💡 Features

### Real vs Demo Images

- **🟢 AI Generated**: Real images from Gemini Imagen API
- **🟡 Demo**: Placeholder images when API isn't configured

### Image Generation Details

- **Model**: Imagen 3.0 (Google's latest)
- **Quality**: High-resolution (1024x1280)
- **Safety**: Built-in content filtering
- **Speed**: ~10-30 seconds per batch

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Keep your API key private
- Monitor your usage in Google AI Studio
- Set up billing alerts if needed

## 📊 Usage Limits

Google AI Studio free tier includes:

- 15 requests per minute
- 1,500 requests per day
- Rate limits may apply

For production use, consider upgrading to a paid plan.

## 🆘 Need Help?

1. Check the browser console for error messages
2. Verify your API key in [Google AI Studio](https://aistudio.google.com/app/apikey)
3. Test with a simple prompt first
4. Check your internet connection

---

**Ready to create amazing AI-generated ads!** 🎨✨
