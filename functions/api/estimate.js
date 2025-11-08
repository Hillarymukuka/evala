/**
 * Cloudflare Pages Function for Evala
 * Uses direct API access to Cloudflare AI with API token from environment
 */

const systemPrompt = `
You are Evala by Nestro, an expert in estimating jobs or works using the most current industry market for any type of industry, with a major focus on African industries and African market prices.
You provide realistic cost breakdowns for clients based on their answers.

CRITICAL REQUIREMENTS:
1. **Mathematical Accuracy is MANDATORY**: All numbers MUST add up correctly. The total estimate MUST equal the sum of all category breakdowns.
2. **Double-check all calculations**: Before providing the final response, verify that all subtotals and totals are mathematically correct.
3. **Show your work**: Break down calculations clearly so the math can be verified.
4. **Use realistic market rates**: Base estimates on current African market prices, especially for Zambian markets when applicable.

FORMAT YOUR RESPONSE AS FOLLOWS:

## Executive Summary
[Brief overview of the project and what the estimate covers]

## Total Estimated Cost
**ZMW [TOTAL_AMOUNT]** (or appropriate currency)

## Breakdown:
### 1. Labour - ZMW [subtotal]
- [items with costs]

### 2. Materials - ZMW [subtotal]
- [items with costs]

### 3. Logistics - ZMW [subtotal]
- [items with costs]

### 4. Marketing (if applicable) - ZMW [subtotal]
- [items with costs]

### 5. Contingency - ZMW [subtotal]
- [items with costs]

## Verification
Total = [show addition of all subtotals]

## Additional Notes & Recommendations
[Professional advice, risk factors, ways to optimize costs, etc.]

Ensure complete response with all sections filled.`;

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

    // Call Cloudflare AI API directly with increased timeout
    const aiApiUrl = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-70b-instruct`;
    
    // Create an abort controller for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 second timeout
    
    try {
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
          max_tokens: 8192, // Maximum token limit for complete responses
          temperature: 0.7,
          stream: false,
          top_p: 0.9
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const aiResult = await aiResponse.json();

      if (!aiResponse.ok) {
        console.error('AI API Error:', aiResult);
        return new Response(
          JSON.stringify({ error: 'Failed to generate estimate from AI' }), 
          { status: 500, headers: corsHeaders }
        );
      }

      // Extract the response text
      const estimateText = aiResult.result?.response || aiResult.response || 'Unable to generate estimate';
      
      // Log for debugging
      console.log('AI Response length:', estimateText.length);
      console.log('Full AI Result:', JSON.stringify(aiResult).substring(0, 500));

      return new Response(
        JSON.stringify({ estimate: estimateText }), 
        { headers: corsHeaders }
      );
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        return new Response(
          JSON.stringify({ error: 'Request timed out. The AI is taking longer than expected. Please try again.' }), 
          { status: 504, headers: corsHeaders }
        );
      }
      throw fetchError;
    }

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
