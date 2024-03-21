const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

router.delete('/api/post/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Deleting post with ID:", id);

    try {
        const data = await fs.readFile('./JSON/toDo.json', 'utf8');
        let json = JSON.parse(data);

        
        json[0].post = json[0].post.filter(post => post.id !== id);

        await fs.writeFile('./JSON/toDo.json', JSON.stringify(json, null, 2));
        res.status(200).send('Post deleted successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the post.');
    }
});

module.exports = router;
