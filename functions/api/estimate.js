/**
 * Cloudflare Pages Function for Evala
 * Uses direct API access to Cloudflare AI with API token from environment
 */

const systemPrompt = `You are Evala by Nestro, an expert cost estimator specializing in African markets, particularly Zambia.

CRITICAL: All calculations MUST be mathematically accurate. Total cost MUST equal sum of all breakdowns.

PRICING GUIDELINES:
- **SME/Small Business**: Use competitive, budget-friendly rates suitable for startups, freelancers, and small to medium enterprises
- **Corporate/Large Company**: Use premium rates reflecting enterprise-level service quality, established vendor pricing, and corporate standards

FORMAT:
## Executive Summary
[Brief project overview]

## Total Cost: ZMW [AMOUNT]

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

## Recommendations
[Professional advice and cost optimization tips]

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
Business Type: ${answers.businessType === 'sme' ? 'SME/Small Business' : 'Corporate/Large Company'}
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

      // DEBUGGING: Log the complete AI response structure
      console.log('=== AI API RESPONSE DEBUG ===');
      console.log('Full AI Result:', JSON.stringify(aiResult, null, 2));
      console.log('Response path 1 (result.response):', aiResult.result?.response?.substring(0, 200));
      console.log('Response path 2 (response):', aiResult.response?.substring(0, 200));
      console.log('All keys in result:', Object.keys(aiResult));
      if (aiResult.result) {
        console.log('All keys in result.result:', Object.keys(aiResult.result));
      }

      // Extract the response text
      const estimateText = aiResult.result?.response || aiResult.response || 'Unable to generate estimate';
      
      // Log final response details
      console.log('Final estimate length:', estimateText.length);
      console.log('Final estimate (first 500 chars):', estimateText.substring(0, 500));
      console.log('Final estimate (last 500 chars):', estimateText.substring(Math.max(0, estimateText.length - 500)));
      console.log('=== END DEBUG ===');

      return new Response(
        JSON.stringify({ 
          estimate: estimateText,
          debug: {
            length: estimateText.length,
            truncated: estimateText.length >= 8000 // Flag if it might be truncated
          }
        }), 
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
