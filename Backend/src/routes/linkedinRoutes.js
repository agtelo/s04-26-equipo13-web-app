const express = require('express');
const axios = require('axios');
const router = express.Router();

// Store LinkedIn tokens in memory (in production, use database)
const linkedinTokens = new Map();

const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';
const LINKEDIN_API_URL = 'https://api.linkedin.com/v2/me';

// Ruta 1: Iniciar login - redirige a LinkedIn
router.get('/auth/linkedin', (req, res) => {
  console.log('🔵 Starting LinkedIn OAuth flow');

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    scope: 'w_member_social',
    state: Math.random().toString(36).substring(7) // Simple state token
  });

  const linkedinAuthUrl = `${LINKEDIN_AUTH_URL}?${params.toString()}`;
  console.log('🔗 Redirecting to:', linkedinAuthUrl);

  res.redirect(linkedinAuthUrl);
});

// Ruta 2: Callback - LinkedIn redirige aquí con el authorization code
router.get('/auth/linkedin/callback', async (req, res) => {
  try {
    const { code, error, error_description } = req.query;

    console.log('🔵 LinkedIn callback received');
    console.log('Code:', code);
    console.log('Error:', error, error_description);

    if (error) {
      return res.status(400).json({
        error: error,
        details: error_description || 'LinkedIn authorization failed'
      });
    }

    if (!code) {
      return res.status(400).json({ error: 'No authorization code received' });
    }

    // Exchange authorization code for access token
    console.log('🔄 Exchanging code for access token...');

    const tokenResponse = await axios.post(LINKEDIN_TOKEN_URL, null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token, expires_in } = tokenResponse.data;

    console.log('✅ Access token received, expires in:', expires_in);

    // Use personId from .env (we don't have profile scope)
    const personId = process.env.LINKEDIN_USER_ID;

    const userData = {
      linkedinId: personId,
      accessToken: access_token,
      expiresAt: new Date(Date.now() + expires_in * 1000),
      authenticatedAt: new Date()
    };

    console.log('✅ User authenticated, token stored for personId:', personId);
    console.log('✅ Token expires at:', userData.expiresAt);

    // Store token using personId as key
    linkedinTokens.set('current', userData);

    // Redirect to frontend with success
    res.redirect(
      `http://localhost:3000/dashboard?linkedin_authenticated=true`
    );
  } catch (error) {
    console.error('❌ OAuth error:', error.response?.data || error.message);

    const errorMessage = error.response?.data?.error_description || error.message;
    res.status(500).json({
      error: 'Authentication failed',
      details: errorMessage
    });
  }
});

// Auto-detect LinkedIn personId using token introspection
router.get('/linkedin/me', async (req, res) => {
  try {
    const tokenData = linkedinTokens.get('current');

    if (!tokenData) {
      return res.status(401).json({ error: 'No LinkedIn token found. Authenticate first at /api/auth/linkedin' });
    }

    // Use token introspection to get personId (works with any scope)
    const response = await axios.post(
      'https://www.linkedin.com/oauth/v2/introspectToken',
      new URLSearchParams({
        token: tokenData.accessToken,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { sub, active, scope } = response.data;

    if (!active) {
      return res.status(401).json({ error: 'Token is no longer active. Re-authenticate.' });
    }

    console.log('✅ LinkedIn personId found:', sub);
    console.log('✅ Active scopes:', scope);

    res.json({
      personId: sub,
      active,
      scope,
      message: `Add this to your .env: LINKEDIN_USER_ID=${sub}`
    });
  } catch (error) {
    console.error('❌ Introspection error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// Get stored token for a user
router.get('/linkedin/token/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const tokenData = linkedinTokens.get(userId);

    if (!tokenData) {
      return res.status(404).json({ error: 'LinkedIn credentials not found' });
    }

    // Check if token is expired
    if (tokenData.expiresAt < new Date()) {
      linkedinTokens.delete(userId);
      return res.status(401).json({ error: 'LinkedIn token expired. Please authenticate again.' });
    }

    res.json({
      accessToken: tokenData.accessToken,
      linkedinId: tokenData.linkedinId,
      expiresAt: tokenData.expiresAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
module.exports.getLinkedInToken = (userId) => linkedinTokens.get(userId);
