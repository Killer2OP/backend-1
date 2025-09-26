const Blog = require('../models/Blog');

// Get all blogs with pagination
exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .sort({ publishDate: -1, createdAt: -1 });

    const total = await Blog.countDocuments();

    res.status(200).json({
      status: 'success',
      data: {
        blogs,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalBlogs: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Get featured blogs
exports.getFeaturedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findFeatured().limit(6);

    res.status(200).json({
      status: 'success',
      data: { blogs },
    });
  } catch (error) {
    console.error('Get featured blogs error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Get single blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findBySlug(slug);

    if (!blog) {
      return res.status(404).json({ status: 'error', message: 'Blog not found' });
    }

    res.status(200).json({ status: 'success', data: { blog } });
  } catch (error) {
    console.error('Get blog by slug error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Search blogs
exports.searchBlogs = async (req, res) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ status: 'error', message: 'Search query is required' });
    }

    const searchRegex = new RegExp(q.trim(), 'i');

    const blogs = await Blog.find({
      isPublished: true,
      $or: [
        { name: searchRegex },
        { overview: searchRegex },
        { description: searchRegex },
      ],
    })
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .sort({ publishDate: -1 });

    const total = await Blog.countDocuments({
      isPublished: true,
      $or: [
        { name: searchRegex },
        { overview: searchRegex },
        { description: searchRegex },
      ],
    });

    res.status(200).json({
      status: 'success',
      data: {
        blogs,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalBlogs: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
        query: q,
      },
    });
  } catch (error) {
    console.error('Search blogs error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Get blog categories (placeholder)
exports.getCategories = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        categories: [],
        message: 'Categories feature not implemented yet',
      },
    });
  } catch (error) {
    console.error('Get blog categories error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
