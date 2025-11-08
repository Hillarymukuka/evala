// Test script to call the Cloudflare AI API directly
const CF_API_TOKEN = 'U67g_WCZk-h6QgC1pst3BB-BpUXmY6O9hxAVa551';
const CF_ACCOUNT_ID = 'b5c09dd43a24e9b610b32fcfc548d442';

async function testAIAPI() {
  console.log('🧪 Testing Cloudflare AI API...\n');

  const systemPrompt = `You are Evala by Nestro, an expert cost estimator specializing in African markets, particularly Zambia.

CRITICAL: All calculations MUST be mathematically accurate. Total cost MUST equal sum of all breakdowns.

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

  const userInput = `
Project Type: Design
Industry: Marketing
Country: Zambia
Scope: Full logo design in all formats, social media branding, visual identity
Duration: 2 weeks
Details: Brand identity for a financial institution
  `;

  const aiApiUrl = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-70b-instruct`;

  try {
    console.log('📡 Calling Cloudflare AI API...');
    const startTime = Date.now();

    const response = await fetch(aiApiUrl, {
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
        max_tokens: 8192,
        temperature: 0.7,
        stream: false,
        top_p: 0.9
      }),
    });

    const endTime = Date.now();
    console.log(`⏱️  Request took: ${(endTime - startTime) / 1000} seconds\n`);

    const result = await response.json();

    console.log('=== FULL API RESPONSE ===');
    console.log(JSON.stringify(result, null, 2));
    console.log('\n=== RESPONSE ANALYSIS ===');

    if (result.result?.response) {
      const text = result.result.response;
      console.log(`✅ Response found in: result.result.response`);
      console.log(`📏 Total length: ${text.length} characters`);
      console.log(`📊 Estimated tokens: ~${Math.ceil(text.length / 4)}`);
      console.log(`\n📝 First 300 characters:`);
      console.log(text.substring(0, 300));
      console.log(`\n📝 Last 300 characters:`);
      console.log(text.substring(Math.max(0, text.length - 300)));
      
      // Check if it seems truncated
      const lastChar = text.trim().slice(-1);
      const seemsTruncated = !['!', '.', '?'].includes(lastChar) && !text.endsWith('```');
      console.log(`\n⚠️  Seems truncated: ${seemsTruncated ? 'YES - ends with: "' + text.slice(-50) + '"' : 'NO'}`);
    } else {
      console.log(`❌ No response found in expected path`);
      console.log(`Available keys:`, Object.keys(result));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  }
}

testAIAPI();
