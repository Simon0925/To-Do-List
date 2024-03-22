const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

router.delete('/api/post/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Deleting post with ID:", id);

    const userId = req.query.userId;

    try {
        const data = await fs.readFile('./JSON/posts.json', 'utf8');

        let json = JSON.parse(data);

        const userPostsIndex = json.findIndex(elem => elem.userId === userId);

        if (userPostsIndex === -1) {
            return res.status(404).send('No posts found for the user.');
        }

        const userPosts = json[userPostsIndex];

        let posts = userPosts.posts;

        posts = posts.filter(post => post.id !== id);

        json[userPostsIndex].posts = posts;

        await fs.writeFile('./JSON/posts.json', JSON.stringify(json, null, 2));

        res.status(200).send('Post deleted successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the post.');
    }
});

module.exports = router;
