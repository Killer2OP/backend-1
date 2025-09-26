require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Content = require('../models/Content');

async function simpleInit() {
  try {
    console.log('🔧 Simple Products Content Initialization');
    console.log('📁 Working directory:', __dirname);

    if (!process.env.MONGODB_URI) {
      console.log('❌ MONGODB_URI not found');
      return;
    }

    console.log('✅ Found MONGODB_URI');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Simple test - create a basic products listing
    const testContent = {
      section: 'products',
      pageType: 'listing',
      title: 'Products Listing',
      content: {
        products: [
          {
            slug: 'synthetic-fibre',
            name: 'Synthetic Fibre',
            description: 'High-quality synthetic fiber for construction',
            bgImage: '/images/synthetic-fiber.jpg'
          }
        ]
      },
      status: 'published'
    };

    // Try to create/update the content
    const result = await Content.findOneAndUpdate(
      { section: 'products', pageType: 'listing' },
      testContent,
      { new: true, upsert: true }
    );

    console.log('✅ Content created/updated successfully');
    console.log('📊 Content ID:', result._id);
    console.log('📊 Section:', result.section);
    console.log('📊 Page Type:', result.pageType);

    // Close connection
    await mongoose.connection.close();
    console.log('✅ Connection closed');

    console.log('🎉 Simple initialization completed!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

simpleInit();
