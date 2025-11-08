# Cloudflare Pages Environment Variables Setup

Your Pages Function is deployed and needs environment variables to access the Cloudflare AI API.

## 🔧 Set Environment Variables (Required)

1. Go to https://dash.cloudflare.com/
2. Navigate to **Workers & Pages** → **evala**
3. Click on **Settings** tab
4. Scroll to **Environment variables** section
5. Click **Add variable** (do this twice for both variables)

### Variable 1:
- **Variable name**: `CF_API_TOKEN`
- **Value**: `U67g_WCZk-h6QgC1pst3BB-BpUXmY6O9hxAVa551`
- **Environment**: Production (and Preview if you want)
- Click **Save**

### Variable 2:
- **Variable name**: `CF_ACCOUNT_ID`
- **Value**: `b5c09dd43a24e9b610b32fcfc548d442`
- **Environment**: Production (and Preview if you want)
- Click **Save**

## ✅ After Adding Variables:

**IMPORTANT**: You need to redeploy for the variables to take effect!

Run:
```bash
npx wrangler pages deploy . --project-name evala
```

Or simply push a new commit to trigger an automatic deployment.

## 🌐 Testing

After redeploying, visit: **https://evala.pages.dev**

Try creating an estimate - it should work perfectly!

## How It Works

1. Your frontend calls `/api/estimate` (a Cloudflare Pages Function)
2. The function uses your API token to call Cloudflare AI API
3. Llama 3.1 70B generates a detailed cost estimate
4. The result is returned to your app

No CORS issues, no external workers, everything on the same domain! 🚀
