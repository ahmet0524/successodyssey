// Netlify Function - Mailchimp Subscribe (ES Modules)
// Path: netlify/functions/subscribe.js

export const handler = async (event, context) => {
  // Enable CORS for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Method Not Allowed'
      })
    };
  }

  try {
    // Parse request body
    const { email } = JSON.parse(event.body);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      console.log('[Mailchimp] Invalid email:', email);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Please enter a valid email address.'
        })
      };
    }

    // Get environment variables
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
    const LIST_ID = process.env.MAILCHIMP_LIST_ID;

    // Validate environment variables
    if (!API_KEY || !SERVER_PREFIX || !LIST_ID) {
      console.error('[Mailchimp] Missing environment variables:', {
        hasApiKey: !!API_KEY,
        hasServerPrefix: !!SERVER_PREFIX,
        hasListId: !!LIST_ID
      });
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Server configuration error. Please contact support.'
        })
      };
    }

    // Mailchimp API endpoint
    const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

    console.log('[Mailchimp] Attempting subscription:', {
      email: email.substring(0, 3) + '***',
      endpoint: url.replace(API_KEY, '***')
    });

    // Subscribe user to Mailchimp
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email_address: email,
        status: 'pending', // Double opt-in
        merge_fields: {
          SOURCE: 'Website'
        },
        tags: ['Website Signup']
      })
    });

    const data = await response.json();

    console.log('[Mailchimp] Response:', {
      status: response.status,
      ok: response.ok,
      title: data.title
    });

    // Handle Mailchimp response
    if (response.ok) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: '🎉 Almost there! Please check your email to confirm your subscription.'
        })
      };
    } else if (data.title === 'Member Exists') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'You are already subscribed! Check your inbox for our latest updates.'
        })
      };
    } else {
      console.error('[Mailchimp] API error:', {
        status: data.status,
        title: data.title,
        detail: data.detail
      });

      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: data.detail || 'An error occurred. Please try again.'
        })
      };
    }

  } catch (error) {
    console.error('[Mailchimp] Function error:', {
      message: error.message,
      stack: error.stack
    });

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Something went wrong. Please try again later.'
      })
    };
  }
};