/**
 * Cloudflare Pages Function for Evala
 * Uses direct API access to Cloudflare AI with API token from environment
 */

const systemPrompt = `
You are Evala by Nestro, an expert in estimating jobs or works using the most current industry market for any type of industry, with a major focus on African industries and African market prices.
You provide realistic cost breakdowns for clients based on their answers.
Please return a clean, professional breakdown with: Summary, Estimated total cost, Category breakdown (labour, materials, logistics, marketing, etc.), and Additional notes/recommendations. Use Zambian Kwacha (ZMW) when country is Zambia and approximate local market rates.
`;

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const { answers } = await context.request.json();

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

    // Get credentials from environment variables
    const CF_API_TOKEN = context.env.CF_API_TOKEN;
    const CF_ACCOUNT_ID = context.env.CF_ACCOUNT_ID;

    if (!CF_API_TOKEN || !CF_ACCOUNT_ID) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error: Missing API credentials' }), 
        { status: 500, headers: corsHeaders }
      );
    }

    // Call Cloudflare AI API directly
    const aiApiUrl = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-70b-instruct`;
    
    const aiResponse = await fetch(aiApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `${userInput}\n\nPlease provide a detailed, professional cost estimate with clear sections and pricing in local currency.` }
        ],
      }),
    });

    const aiResult = await aiResponse.json();

    if (!aiResponse.ok) {
      console.error('AI API Error:', aiResult);
      return new Response(
        JSON.stringify({ error: 'Failed to generate estimate from AI' }), 
        { status: 500, headers: corsHeaders }
      );
    }

    // Extract the response text
    const estimateText = aiResult.result?.response || 'Unable to generate estimate';

    return new Response(
      JSON.stringify({ estimate: estimateText }), 
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
