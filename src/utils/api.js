/**
 * API utility for Evala
 * Calls the Cloudflare Worker to get AI-powered cost estimates
 * The worker handles all AI interactions securely
 */

export async function getEstimate(answers) {
  try {
    // For development, use the local Wrangler dev server
    // For production, use the deployed worker URL
    const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'https://evala-ai-worker.hillarymukuka.workers.dev';

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
    
    if (!data.estimate) {
      throw new Error('No estimate returned from server');
    }

    return data.estimate;

  } catch (error) {
    console.error('Error calling worker:', error);
    throw new Error(`Failed to get estimate: ${error.message}`);
  }
}
