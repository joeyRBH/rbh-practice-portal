// Create this file: pages/api/auth/google/token.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, codeVerifier, redirectUri } = req.body;

  if (!code || !codeVerifier) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: '940233544658-rbhdvbt2l825ae83bagpiqn83c79e65c.apps.googleusercontent.com',
        code: code,
        code_verifier: codeVerifier,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return res.status(400).json({ error: 'Token exchange failed', details: errorData });
    }

    const tokenData = await tokenResponse.json();
    
    // Get user profile
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    let profile = null;
    if (profileResponse.ok) {
      profile = await profileResponse.json();
    }

    return res.status(200).json({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      profile: profile
    });

  } catch (error) {
    console.error('OAuth error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ---

// Update your pages/index.js - Replace the exchangeCodeForToken function:

// Exchange authorization code for access token (using server-side API)
const exchangeCodeForToken = async (authCode) => {
  try {
    const codeVerifier = sessionStorage.getItem('code_verifier');
    
    // Call our server-side API route instead of direct token exchange
    const response = await fetch('/api/auth/google/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: authCode,
        codeVerifier: codeVerifier,
        redirectUri: GOOGLE_REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to exchange code for token');
    }

    const data = await response.json();
    setAccessToken(data.access_token);
    
    // Set user profile if available
    if (data.profile) {
      setUserProfile(data.profile);
      if (data.profile.name) {
        setUserName(`Dr. ${data.profile.name}`);
      }
    }
    
    setGmailConnected(true);
    setEmailStatus('Connected');
    setIsTestingEmail(false);
    
    // Clean up URL and storage
    sessionStorage.removeItem('code_verifier');
    window.history.replaceState({}, document.title, window.location.pathname);
    
    alert('✅ Gmail API Connected Successfully!\n\nYou can now send automated appointment reminders.');
    
  } catch (error) {
    console.error('Token exchange error:', error);
    setEmailStatus('Connection Failed');
    setIsTestingEmail(false);
    alert(`❌ Failed to connect to Gmail: ${error.message}`);
  }
};
