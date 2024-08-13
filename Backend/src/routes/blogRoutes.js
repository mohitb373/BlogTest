

const express = require('express');
const { getBlog,getSingleBlog,editBlog,CreatePost} = require('../controllers/blogController');
const router = express.Router();
const authUser = require('../utils/utils');
router.get('/getBlog', getBlog);
router.get('/getBlog/:id', getSingleBlog);
router.put('/editBlog/:id',authUser, editBlog);
router.post('/createPost',authUser,CreatePost)


module.exports = router;
