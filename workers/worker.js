/**
 * Cloudflare Worker for Evala - Secure AI Estimation Backend
 * Uses Cloudflare Workers AI to generate cost estimates
 * The API key stays server-side for security
 */

const systemPrompt = `
You are Evala by Nestro, an expert in estimating jobs or works using the most current industry market for any type of industry, with a major focus on African industries and African market prices.
You provide realistic cost breakdowns for clients based on their answers.
Please return a clean, professional breakdown with: Summary, Estimated total cost, Category breakdown (labour, materials, logistics, marketing, etc.), and Additional notes/recommendations. Use Zambian Kwacha (ZMW) when country is Zambia and approximate local market rates.
`;

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    try {
      const { answers } = await request.json();

      if (!answers) {
        return new Response(
          JSON.stringify({ error: "Missing 'answers' in request body" }), 
          { status: 400, headers: corsHeaders }
        );
      }

      const userInput = `
Project Type: ${answers.type}
Industry: ${answers.industry}
Country: ${answers.country}
Scope: ${answers.scope}
Duration: ${answers.duration}
Details: ${answers.details}
      `;

      const fullPrompt = `${systemPrompt}\n\n${userInput}\n\nPlease provide a detailed, professional cost estimate with clear sections and pricing in local currency.`;

      // Use Cloudflare Workers AI
      const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
        prompt: fullPrompt,
      });

      return new Response(
        JSON.stringify({ estimate: aiResponse.response }), 
        { headers: corsHeaders }
      );

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ error: error.message }), 
        { status: 500, headers: corsHeaders }
      );
    }
  },
};

function handleOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
