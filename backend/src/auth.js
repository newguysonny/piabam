const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;
    
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    res.redirect(`/room?token=${response.data.access_token}`);
  } catch (error) {
    console.error('Spotify token error:', error.response.data);
    res.status(500).send('Authentication failed');
  }
});

module.exports = router;
