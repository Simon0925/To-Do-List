const express = require('express');
const cors = require('cors');
require('dotenv').config();


const getPost = require('./router/getPosts.js')
const postPost = require('./router/postPost.js')
const putPost = require('./router/putPost.js')
const deletePost = require('./router/deletePost.js')

const addUser = require('./router/users/postUsers.js')
const auth = require('./router/auth/postAuth.js')

const compare = require('./router/auth/compareToken.js')

const app = express();
app.use(cors());
app.use(express.json()); // Middleware for parsing JSON bodies
app.use(getPost);
app.use(postPost);
app.use(putPost);
app.use(deletePost);

app.use(addUser)
app.use(auth)
app.use(compare)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} `);
});
