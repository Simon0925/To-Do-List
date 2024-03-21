const express = require('express');
const fs = require('fs').promises;
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


router.post('/api/post', async (req, res) => {
    try {
      console.log("Generated UUID:", uuidv4());
      const newPost = { ...req.body, id: uuidv4() };
      console.log("New Post:", newPost);
  
  
      const data = await fs.readFile('./JSON/toDo.json', 'utf8');
      
      const posts = JSON.parse(data);
  
  
      posts[0].post.push(newPost);
  
      await fs.writeFile('./JSON/toDo.json', JSON.stringify(posts, null, 2));
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while adding a new post.');
    }
  });

module.exports = router;
