/**
 * API utility for Evala
 * Calls the Cloudflare Worker to get AI-powered cost estimates
 * The worker handles all AI interactions securely
 */

export async function getEstimate(answers) {
  try {
    // Use Cloudflare Pages Function (runs on the same domain)
    // This is much more reliable than calling an external worker
    const WORKER_URL = '/api/estimate';

    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // DEBUGGING: Log what we receive
    console.log('=== FRONTEND RECEIVED ===');
    console.log('Data keys:', Object.keys(data));
    console.log('Estimate length:', data.estimate?.length);
    console.log('Estimate first 500 chars:', data.estimate?.substring(0, 500));
    console.log('Estimate last 500 chars:', data.estimate?.substring(Math.max(0, (data.estimate?.length || 0) - 500)));
    console.log('Debug info:', data.debug);
    console.log('=== END FRONTEND DEBUG ===');
    
    if (!data.estimate) {
      throw new Error('No estimate returned from server');
    }

    return data.estimate;

  } catch (error) {
    console.error('Error calling worker:', error);
    throw new Error(`Failed to get estimate: ${error.message}`);
  }
}
