const Blog = require('../models/blogModels');


exports.getBlog =  async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.isLocked) {
        return res.status(400).json({ error: 'Blog is locked by another user' });
    }
    res.json(blog);
    blog.isLocked = true;
     await blog.save();
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
}

exports.editBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    // if (blog.isLocked) {
    //   return res.status(400).json({ error: 'Blog is locked by another user' });
    // }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.lastEditedBy = req.user.id;
    blog.isLocked = false;
    blog.lockedBy = req.user.id;
    blog.lockedAt = Date.now();

    await blog.save();
    res.json(blog);

    // blog.isLocked = false;
    // await blog.save();
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit blog' });
  }
}

exports.CreatePost = async (req, res) => {
    try {
      const { title, content } = req.body;
      console.log("xsnj")
      const blog = new Blog({
        title,
        content,
        author: req.user._id,
      });
      await blog.save();
      res.status(201).json(blog);
    } catch (err) {
      res.status(400).json({ error: 'Blog creation failed' });
    }
}
  