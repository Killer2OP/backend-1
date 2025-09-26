require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Content = require('../models/Content');

async function manualInit() {
  try {
    console.log('🔧 Manual Products Content Setup');
    console.log('📁 Working directory:', __dirname);

    if (!process.env.MONGODB_URI) {
      console.log('❌ MONGODB_URI not found');
      console.log('Please check your .env file');
      return;
    }

    console.log('✅ Found MONGODB_URI');

    // Test connection first
    console.log('🔌 Testing connection...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check existing content
    const existingContent = await Content.find({ section: 'products' });
    console.log('📊 Existing products content:', existingContent.length);

    // Create basic products content
    const basicProducts = {
      section: 'products',
      pageType: 'listing',
      title: 'Products Listing',
      content: {
        products: [
          {
            slug: 'synthetic-fibre',
            name: 'Synthetic Fibre',
            description: 'High-quality synthetic fiber for construction',
            bgImage: '/images/synthetic-fiber.jpg',
            overview: 'Premium synthetic fibers for concrete reinforcement',
            specifications: [
              { title: 'Type', value: 'Polyester and Polypropylene' },
              { title: 'Length', value: '1mm, 3mm, 6mm, 12mm, 18mm' }
            ],
            application: ['Concrete reinforcement', 'Industrial flooring'],
            keyFeatures: ['High tensile strength', 'Crack resistance'],
            images: ['/images/synthetic-1.jpg']
          }
        ]
      },
      status: 'published'
    };

    const basicHomeProducts = {
      section: 'products',
      pageType: 'home',
      title: 'Home Products',
      content: {
        items: [
          {
            ProjectLink: '/Products/synthetic-fibre',
            ProjectImg: '/images/synthetic-fiber-p.png',
            ProjectTitle: 'Synthetic Fibre'
          }
        ]
      },
      status: 'published'
    };

    // Insert or update
    await Content.findOneAndUpdate(
      { section: 'products', pageType: 'listing' },
      basicProducts,
      { new: true, upsert: true }
    );

    await Content.findOneAndUpdate(
      { section: 'products', pageType: 'home' },
      basicHomeProducts,
      { new: true, upsert: true }
    );

    console.log('✅ Basic products content created successfully');

    // Verify
    const updatedContent = await Content.find({ section: 'products' });
    console.log('📊 Updated products content count:', updatedContent.length);

    await mongoose.connection.close();
    console.log('✅ Connection closed');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

console.log('🚀 Starting manual initialization...');
manualInit();
