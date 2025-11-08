/**
 * Cloudflare Pages Function for Evala
 * This runs directly on Cloudflare Pages and uses Workers AI
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

    // Use Cloudflare AI binding from Pages
    const aiResponse = await context.env.AI.run('@cf/meta/llama-3.1-70b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `${userInput}\n\nPlease provide a detailed, professional cost estimate with clear sections and pricing in local currency.` }
      ],
    });

    // Extract the response text
    const estimateText = aiResponse.response || aiResponse.result?.response || 'Unable to generate estimate';

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
