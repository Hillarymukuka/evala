const API_TOKEN = 'U67g_WCZk-h6QgC1pst3BB-BpUXmY6O9hxAVa551';
const ACCOUNT_ID = 'b5c09dd43a24e9b610b32fcfc548d442';
const PROJECT_NAME = 'evala';

async function configureAIBinding() {
  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}`;
  
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      deployment_configs: {
        production: {
          ai_bindings: {
            AI: {}
          }
        },
        preview: {
          ai_bindings: {
            AI: {}
          }
        }
      }
    })
  });

  const result = await response.json();
  console.log('Response:', JSON.stringify(result, null, 2));
}

configureAIBinding();
