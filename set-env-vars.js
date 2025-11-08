const API_TOKEN = 'U67g_WCZk-h6QgC1pst3BB-BpUXmY6O9hxAVa551';
const ACCOUNT_ID = 'b5c09dd43a24e9b610b32fcfc548d442';
const PROJECT_NAME = 'evala';

async function setEnvironmentVariables() {
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
          env_vars: {
            CF_API_TOKEN: {
              type: 'secret_text',
              value: API_TOKEN
            },
            CF_ACCOUNT_ID: {
              type: 'plain_text',
              value: ACCOUNT_ID
            }
          }
        },
        preview: {
          env_vars: {
            CF_API_TOKEN: {
              type: 'secret_text',
              value: API_TOKEN
            },
            CF_ACCOUNT_ID: {
              type: 'plain_text',
              value: ACCOUNT_ID
            }
          }
        }
      }
    })
  });

  const result = await response.json();
  console.log('Response:', JSON.stringify(result, null, 2));
  
  if (result.success) {
    console.log('\n✅ Environment variables set successfully!');
    console.log('Your app should now work at: https://evala.pages.dev');
  } else {
    console.log('\n❌ Failed to set environment variables');
    console.log('Please set them manually in the Cloudflare dashboard');
  }
}

setEnvironmentVariables();
