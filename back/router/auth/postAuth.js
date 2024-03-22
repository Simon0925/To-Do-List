const express = require('express');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const router = express.Router();

const TokenService = require('../../servise/token-service') ;


router.post('/api/auth', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await fs.readFile('./JSON/users.json', 'utf8');
        const users = JSON.parse(userData);

        const user = users.find(user => user.email === email);

  

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }

        
        const { accessToken, refreshToken } = await TokenService.generateTokens({ email: user.email, id:user.id });


        await TokenService.saveRefreshToken(user.id, refreshToken);

        const id = user.id

        return res.status(200).json({ success: true, message: 'Authentication successful', accessToken,id });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
