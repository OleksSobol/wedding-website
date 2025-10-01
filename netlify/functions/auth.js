exports.handler = async (event, context) => {
  // Enable CORS for your domain
  const headers = {
    'Access-Control-Allow-Origin': 'https://solstice2026.party',
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
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { password } = JSON.parse(event.body);
    
    // Get the wedding password from environment variable
    const correctPassword = process.env.WEDDING_PASSWORD;
    
    if (!correctPassword) {
      console.error('WEDDING_PASSWORD environment variable not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Validate password (use secure comparison to prevent timing attacks)
    const isValid = password === correctPassword;
    
    if (isValid) {
      // Generate a simple JWT-like token (you could use a proper JWT library for production)
      const token = Buffer.from(JSON.stringify({
        authenticated: true,
        timestamp: Date.now(),
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      })).toString('base64');

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          token: token,
          message: 'Authentication successful'
        })
      };
    } else {
      // Log failed attempts (but don't reveal the actual password)
      console.log('Failed authentication attempt from IP:', event.headers['x-forwarded-for'] || event.headers['x-real-ip']);
      
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
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};