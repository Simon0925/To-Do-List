const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

router.get('/api/post', async (req, res) => {
    try {
      const data = await fs.readFile('./JSON/toDo.json', 'utf8');
      res.json(JSON.parse(data));
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching posts. Details: ' + error.message);
    }
});

module.exports = router;
