const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const { authMiddleware } = require('../middleware/auth');

// Get all content sections (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public route to get all content sections (no auth required)
router.get('/public', async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get content by section and pageType
router.get('/:section/:pageType', async (req, res) => {
  try {
    const content = await Content.findOne({
      section: req.params.section,
      pageType: req.params.pageType,
      status: { $ne: 'archived' },
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update content (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { section, pageType, content, title, metadata, images, status, order } = req.body;

    if (!section || !pageType || !content) {
      return res.status(400).json({ message: 'Section, pageType and content are required' });
    }

    // Update if exists, create if not
    const updatedContent = await Content.findOneAndUpdate(
      { section, pageType },
      {
        section,
        pageType,
        title: title || `${section}-${pageType}`,
        content,
        images: images || [],
        metadata: metadata || {},
        status: status || 'published',
        order: order || 0,
        updatedAt: Date.now(),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete content (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    await Content.deleteOne({ _id: req.params.id });
    res.json({ message: 'Content deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Products content routes
router.get('/products/listing', async (req, res) => {
  try {
    const content = await Content.findOne({
      section: 'products',
      pageType: 'listing',
      status: { $ne: 'archived' },
    });

    if (!content) {
      return res.status(404).json({ message: 'Products listing not found' });
    }

    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/products/home', async (req, res) => {
  try {
    const content = await Content.findOne({
      section: 'products',
      pageType: 'home',
      status: { $ne: 'archived' },
    });

    if (!content) {
      return res.status(404).json({ message: 'Home products not found' });
    }

    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/products/listing', authMiddleware, async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Products array is required' });
    }

    const updatedContent = await Content.findOneAndUpdate(
      { section: 'products', pageType: 'listing' },
      {
        section: 'products',
        pageType: 'listing',
        title: 'Products Listing',
        content: { products },
        status: 'published',
        updatedAt: Date.now(),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Contact page content routes
router.get('/contact/main', async (req, res) => {
  try {
    const content = await Content.findOne({
      section: 'contact',
      pageType: 'main',
      status: { $ne: 'archived' },
    });

    if (!content) {
      return res.status(404).json({ message: 'Contact page content not found' });
    }

    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/contact/main', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const updatedContent = await Content.findOneAndUpdate(
      { section: 'contact', pageType: 'main' },
      {
        section: 'contact',
        pageType: 'main',
        title: 'Contact Page Content',
        content,
        status: 'published',
        updatedAt: Date.now(),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;