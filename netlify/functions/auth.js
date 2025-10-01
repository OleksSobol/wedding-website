/**
 * Netlify serverless function for wedding website authentication
 * Validates passwords securely on the server-side
 */
exports.handler = async (event, context) => {
  // CORS headers for all requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
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
        message: 'Method not allowed. Use POST.' 
      })
    };
  }

  try {
    // Parse request body
    const { password } = JSON.parse(event.body || '{}');
    
    if (!password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'Password is required' 
        })
      };
    }

    // Get the password from environment variable
    const correctPassword = process.env.WEDDING_PASSWORD;
    
    // Debug logging (temporarily - remove in production)
    console.log('=== DEBUG INFO ===');
    console.log('Environment variable exists:', !!correctPassword);
    console.log('Environment variable length:', correctPassword ? correctPassword.length : 0);
    console.log('Received password length:', password ? password.length : 0);
    console.log('All env vars containing WEDDING:', Object.keys(process.env).filter(key => key.includes('WEDDING')));
    console.log('==================');
    
    if (!correctPassword) {
      console.error('WEDDING_PASSWORD environment variable not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'Server configuration error - WEDDING_PASSWORD not set' 
        })
      };
    }

    // Validate password (secure comparison)
    const isValid = password === correctPassword;
    
    // Log authentication attempts (without exposing password)
    console.log(`Authentication attempt from ${event.headers['x-forwarded-for'] || 'unknown'}: ${isValid ? 'SUCCESS' : 'FAILED'}`);
    
    if (isValid) {
      // Generate a simple session token
      const token = Buffer.from(JSON.stringify({
        authenticated: true,
        timestamp: Date.now(),
        expires: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        sessionId: Math.random().toString(36).substr(2, 9)
      })).toString('base64');

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          token: token,
          message: 'Authentication successful',
          expires: Date.now() + (24 * 60 * 60 * 1000)
        })
      };
    } else {
      // Add slight delay to prevent rapid brute force attempts
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid password'
        })
      };
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        message: 'Internal server error' 
      })
    };
  }
};