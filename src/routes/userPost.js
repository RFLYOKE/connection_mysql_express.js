const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET /userposts/:id
router.get('/:id', postController.getPostsByUserId);

module.exports = router;
