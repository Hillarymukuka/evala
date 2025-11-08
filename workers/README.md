# Evala Cloudflare Worker

This worker handles all AI estimation requests securely using Cloudflare Workers AI.

## Setup

1. Your API key is already configured in the `start-server.bat` file
2. The worker uses Cloudflare's built-in AI models (Llama 3)

## Development

Run the worker locally:
```bash
npm run dev
```

The worker will be available at `http://localhost:8787`

## Deployment

Deploy to Cloudflare:
```bash
npm run deploy
```

After deployment, update the `VITE_WORKER_URL` in your main `.env` file to point to your deployed worker URL.

## API Endpoint

**POST /**

Request body:
```json
{
  "answers": {
    "type": "string",
    "industry": "string",
    "country": "string",
    "scope": "string",
    "duration": "string",
    "details": "string"
  }
}
```

Response:
```json
{
  "estimate": "string"
}
```

## Security

- The worker runs on Cloudflare's edge network
- No API keys are exposed to the frontend
- CORS is configured to accept requests from any origin (restrict in production)
