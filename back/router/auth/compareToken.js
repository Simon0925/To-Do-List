const jwt = require('jsonwebtoken');
const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

router.get('/api/verify-token', async (req, res) => {
    const accessToken = req.headers['authorization'];

    try {
     
        const refreshTokenData = await fs.readFile('./JSON/token.json', 'utf8');
        const refreshTokens = JSON.parse(refreshTokenData); 
        
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const userId = decodedAccessToken.id;

        const user = refreshTokens.find(tokenData => tokenData.userId === userId);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const refreshToken = user.token;

        const accessPayload = jwt.decode(accessToken);
        const refreshPayload = jwt.decode(refreshToken);

        
        const areEqual = accessPayload.email === refreshPayload.email && accessPayload.id === refreshPayload.id;

        const isAccessTokenValid = !decodedAccessToken.exp || Date.now() < decodedAccessToken.exp * 1000;

        
        if (areEqual && isAccessTokenValid) {
            return res.status(200).json({ success: true, message: 'Tokens are equal and access token is valid.',areEqual , userId});
        } else {
            return res.status(200).json({ success: true, message: 'Tokens are not equal or access token is invalid.' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;


