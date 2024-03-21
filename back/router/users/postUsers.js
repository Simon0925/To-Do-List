const express = require('express');
const fs = require('fs').promises;
const router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


const saltRounds = 10;

router.post('/api/add-new-user', async (req, res) => {
    const { name, email, password, repeatPassword } = req.body;
   
    if (!name || typeof name !== 'string' || name.length < 2) {
        return res.status(400).send('Name is required and must be a string with at least 2 characters');
    }
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Email is not in a valid format');
    }

    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (
        typeof password !== 'string' ||    
        !passwordRegex.test(password)     
    ) {
        return res.status(400).send('Password must be a string and start with a capital letter with at least 8 characters');
    }

    if (typeof repeatPassword !== 'string') {
        return res.status(400).send('Repeat password must be a string');
    }

    if (password !== repeatPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        const userData = await fs.readFile('./JSON/users.json', 'utf8');
        const users = JSON.parse(userData);

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).send('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userId = uuidv4();

        const newUser = { id: userId, name, email, password: hashedPassword };

        users.push(newUser);

        await fs.writeFile('./JSON/users.json', JSON.stringify(users, null, 2));

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});



module.exports = router;
