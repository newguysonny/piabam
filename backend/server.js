// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Environment variables
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
  FRONTEND_URL,
  SESSION_SECRET
} = process.env;

// In-memory session store (replace with Redis in production)
const sessions = {};

// PKCE Helpers
// Add these endpoints to your Express server

// PKCE helper functions
const generateRandomString = (length) => {
  return require('crypto').randomBytes(length)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, length);
};

// Login endpoint
app.get('/api/auth/login', (req, res) => {
  try {
    const isHost = req.query.isHost === 'true';
    const state = generateRandomString(16);
    const codeVerifier = generateRandomString(64);
    const codeChallenge = require('crypto')
      .createHash('sha256')
      .update(codeVerifier)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Store codeVerifier in session/database
    req.session.codeVerifier = codeVerifier;
    req.session.state = state;

    const scopes = [
      'streaming',
      'user-read-email',
      ...(isHost ? ['user-modify-playback-state'] : [])
    ].join(' ');

    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', process.env.SPOTIFY_CLIENT_ID);
    authUrl.searchParams.append('scope', scopes);
    authUrl.searchParams.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('code_challenge_method', 'S256');
    authUrl.searchParams.append('code_challenge', codeChallenge);

    res.json({ url: authUrl.toString() });
  } catch (error) {
    console.error('Login endpoint error:', error);
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
});

// Callback endpoint
app.get('/api/auth/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const codeVerifier = req.session.codeVerifier;

    if (!codeVerifier) {
      throw new Error('Missing code verifier');
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI);
    params.append('client_id', process.env.SPOTIFY_CLIENT_ID);
    params.append('code_verifier', codeVerifier);

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      throw new Error(errorData.error_description || 'Token exchange failed');
    }

    const tokenData = await tokenResponse.json();
    res.json({ access_token: tokenData.access_token });
  } catch (error) {
    console.error('Callback endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
