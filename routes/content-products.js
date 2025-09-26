const express = require('express');
const router = express.Router();
const Content = require('../../models/Content');
const { authMiddleware } = require('../../middleware/auth');

// Get all products for listing page
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

// Get products for home page (OurProject component)
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

// Create or update products listing
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

// Create or update home products
router.post('/products/home', authMiddleware, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Items array is required' });
    }

    const updatedContent = await Content.findOneAndUpdate(
      { section: 'products', pageType: 'home' },
      {
        section: 'products',
        pageType: 'home',
        title: 'Home Products',
        content: { items },
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

// Update home products (PUT method)
router.put('/products/home', authMiddleware, async (req, res) => {
  try {
    const content = req.body;

    const updatedContent = await Content.findOneAndUpdate(
      { section: 'products', pageType: 'home' },
      {
        ...content,
        section: 'products',
        pageType: 'home',
        status: 'published',
        updatedAt: Date.now(),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
