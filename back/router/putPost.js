const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const router = express.Router();
router.use(cors());
router.use(express.json());

router.put('/api/post/:id', async (req, res) => {
    const { id } = req.params;
    const updatedPostData = req.body;
    
    try {
        const data = await fs.readFile('./JSON/toDo.json', 'utf8');
        const postsContainer = JSON.parse(data); 
        const posts = postsContainer[0].post; 

        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex !== -1) {
            posts[postIndex] = { ...posts[postIndex], ...updatedPostData };
            await fs.writeFile('./JSON/toDo.json', JSON.stringify(postsContainer, null, 2)); 
            res.json(posts[postIndex]);
        } else {
            res.status(404).send('Post not found.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the post.');
    }
});

module.exports = router;
