// Netlify Function - Mailchimp Subscribe Proxy
// Path: netlify/functions/subscribe.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Enable CORS
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

  try {
    // Parse request body
    const { email } = JSON.parse(event.body);

    // Validate email
    if (!email || !email.includes('@')) {
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
    const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX; // us17
    const LIST_ID = process.env.MAILCHIMP_LIST_ID; // 8457f8a68e

    // Validate environment variables
    if (!API_KEY || !SERVER_PREFIX || !LIST_ID) {
      console.error('Missing environment variables');
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

    // Subscribe user to Mailchimp
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email_address: email,
        status: 'pending', // Double opt-in (sends confirmation email)
        merge_fields: {
          SOURCE: 'Website'
        }
      })
    });

    const data = await response.json();

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
      console.error('Mailchimp error:', data);
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
    console.error('Function error:', error);
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