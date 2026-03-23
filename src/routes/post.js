const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET /posts
router.get('/', postController.getAllPosts);

// POST /posts
router.post('/', postController.createPost);

// GET /posts/:id
router.get('/:id', postController.getPostById);

// DELETE /posts/:id
router.delete('/:id', postController.deletePost);

module.exports = router;
