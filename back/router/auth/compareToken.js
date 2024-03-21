const jwt = require('jsonwebtoken');
const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

router.get('/api/verify-token', async (req, res) => {
    const accessToken = req.headers['authorization'];

    try {
        // Read refresh tokens from file
        const refreshTokenData = await fs.readFile('./JSON/token.json', 'utf8');
        const refreshTokens = JSON.parse(refreshTokenData); 
        
        // Decode access token to extract user ID
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const userId = decodedAccessToken.id;

        // Find the user's refresh token from the database
        const user = refreshTokens.find(tokenData => tokenData.userId === userId);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Extract the refresh token
        const refreshToken = user.token;

        // Decode both access and refresh tokens
        const accessPayload = jwt.decode(accessToken);
        const refreshPayload = jwt.decode(refreshToken);

        console.log('Access Token Payload:', accessPayload);
        console.log('Refresh Token Payload:', refreshPayload);

        // Check if the email and user ID are the same in both tokens
        const areEqual = accessPayload.email === refreshPayload.email && accessPayload.id === refreshPayload.id;

        // Check if the access token is still valid (not expired)
        const isAccessTokenValid = !decodedAccessToken.exp || Date.now() < decodedAccessToken.exp * 1000;

        console.log('areEqual:', areEqual);
        console.log('isAccessTokenValid:', isAccessTokenValid);

        if (areEqual && isAccessTokenValid) {
            return res.status(200).json({ success: true, message: 'Tokens are equal and access token is valid.',areEqual });
        } else {
            return res.status(200).json({ success: true, message: 'Tokens are not equal or access token is invalid.' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;


