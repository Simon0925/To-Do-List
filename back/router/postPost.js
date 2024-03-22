const express = require('express');
const fs = require('fs').promises;
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


router.post('/api/post', async (req, res) => {

    let id = req.query.userId
  
    try {
      
      const newPost = { ...req.body, id: uuidv4() };
      
      const data = await fs.readFile('./JSON/posts.json', 'utf8');

      const jsonData = JSON.parse(data);

      const userPosts = jsonData.find((user) => user.userId === id);
      
      userPosts.posts.push(newPost);

      await fs.writeFile('./JSON/posts.json', JSON.stringify(jsonData, null, 2));
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while adding a new post.');
    }
  });

module.exports = router;
