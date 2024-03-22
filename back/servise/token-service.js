const jwt = require('jsonwebtoken');
const fs = require('fs').promises;

class TokenService {
    async generateTokens(payload) {
        try {
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30m' });

            return {
                accessToken,
                refreshToken
            };
        } catch (error) {
            console.error('Error generating tokens:', error);
            throw new Error('Token generation failed');
        }
    }
    
    async saveRefreshToken(userId, refreshToken) {
        try {
            let userRefreshTokens = await fs.readFile('./JSON/token.json', 'utf8');
            userRefreshTokens = JSON.parse(userRefreshTokens);

            const existingTokenIndex = userRefreshTokens.findIndex(tokenData => tokenData.userId === userId);

            if (existingTokenIndex !== -1) {
                userRefreshTokens[existingTokenIndex].token = refreshToken;
            } else {
                userRefreshTokens.push({ userId, token: refreshToken });
            }
            
            await fs.writeFile('./JSON/token.json', JSON.stringify(userRefreshTokens, null, 2));
            
            return refreshToken; 

        } catch (error) {
            console.error('Error saving refresh token:', error);
            throw new Error('Token save failed');
        }
    }
}

module.exports = new TokenService();