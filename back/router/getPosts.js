const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

router.get('/api/post', async (req, res) => {
  const data = req
  const id = data.query.userId
    try {
      
      const data = await fs.readFile('./JSON/posts.json', 'utf8');
      const posts = JSON.parse(data).find(elem => elem.userId === id).posts;
      
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching posts. Details: ' + error.message);
    }
});

module.exports = router;
