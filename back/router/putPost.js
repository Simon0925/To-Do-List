const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const router = express.Router();
router.use(cors());
router.use(express.json());

router.put('/api/post/:id', async (req, res) => {
    const { id } = req.params;
    const updatedPostData = req.body;

    const userId = req.query.userId;

    
    try {
        const data = await fs.readFile('./JSON/posts.json', 'utf8');

        const postsContainer = JSON.parse(data); 

        const posts = postsContainer.find(elem => elem.userId === userId); 

        const postIndex = posts.posts.findIndex(post => post.id === id);

        if (postIndex !== -1) {
            posts.posts[postIndex] = { ...posts.posts[postIndex], ...updatedPostData };
            await fs.writeFile('./JSON/posts.json', JSON.stringify(postsContainer, null, 2)); 
            res.json(posts.posts[postIndex]);
        } else {
            res.status(404).send('Post not found.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the post.');
    }
});

module.exports = router;
