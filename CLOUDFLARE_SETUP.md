# Cloudflare Pages AI Binding Setup

Your Pages Function has been deployed, but it needs the AI binding to work.

## Option 1: Via Cloudflare Dashboard (Recommended)

1. Go to https://dash.cloudflare.com/
2. Navigate to **Workers & Pages** → **evala**
3. Click on **Settings** tab
4. Scroll to **Functions**
5. Under **AI Bindings**, click **Add binding**
   - Variable name: `AI`
   - Click **Save**
6. The binding will be automatically configured

## Option 2: Via Wrangler CLI

Run this command in your terminal:
```bash
npx wrangler pages deployment create --project-name=evala --branch=main
```

## Testing

After adding the binding, visit:
https://evala.pages.dev

Try creating an estimate - it should now work!

## Troubleshooting

If you still get errors:
1. Make sure the AI binding variable name is exactly: `AI`
2. Try redeploying: `npm run build && npx wrangler pages deploy . --project-name evala`
3. Check the Functions logs in the Cloudflare dashboard
