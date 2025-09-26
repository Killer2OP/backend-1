require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Content = require('../models/Content');
const fs = require('fs');
const path = require('path');

async function initializeProductsContent() {
  try {
    // Check if MongoDB URI is available
    if (!process.env.MONGODB_URI) {
      console.log('❌ MONGODB_URI not found in environment variables');
      console.log('Current working directory:', process.cwd());
      console.log('Environment variables loaded:', Object.keys(process.env).filter(key => key.includes('MONGO')));
      console.log('Please make sure your .env file contains MONGODB_URI');
      console.log('And that dotenv is properly configured');
      return;
    }

    console.log('✅ Found MONGODB_URI');
    console.log('🔗 Connecting to MongoDB...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');

    // Read the generated content files
    const productsListingPath = path.join(__dirname, 'products-listing-content.json');
    const homeProductsPath = path.join(__dirname, 'home-products-content.json');

    if (!fs.existsSync(productsListingPath)) {
      console.log('❌ Products listing content file not found');
      console.log('Please run: node scripts/generate-products-content.js first');
      return;
    }

    if (!fs.existsSync(homeProductsPath)) {
      console.log('❌ Home products content file not found');
      console.log('Please run: node scripts/generate-products-content.js first');
      return;
    }

    const productsListing = JSON.parse(fs.readFileSync(productsListingPath, 'utf-8'));
    const homeProducts = JSON.parse(fs.readFileSync(homeProductsPath, 'utf-8'));

    console.log('✅ Loaded content files');
    console.log(`📊 Products listing: ${productsListing.products.length} products`);
    console.log(`📊 Home products: ${homeProducts.items.length} items`);

    // Initialize products listing content
    const listingResult = await Content.findOneAndUpdate(
      { section: 'products', pageType: 'listing' },
      {
        section: 'products',
        pageType: 'listing',
        title: 'Products Listing',
        content: productsListing,
        status: 'published',
        updatedAt: Date.now(),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log('✅ Products listing content initialized');

    // Initialize home products content
    const homeResult = await Content.findOneAndUpdate(
      { section: 'products', pageType: 'home' },
      {
        section: 'products',
        pageType: 'home',
        title: 'Home Products',
        content: homeProducts,
        status: 'published',
        updatedAt: Date.now(),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log('✅ Home products content initialized');

    console.log('🎉 Products content initialization completed successfully!');
    console.log(`📊 Products listing: ${productsListing.products.length} products`);
    console.log(`📊 Home products: ${homeProducts.items.length} items`);

    // Close connection
    await mongoose.connection.close();
    console.log('✅ Database connection closed');

  } catch (error) {
    console.error('❌ Error initializing products content:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

console.log('🚀 Starting Products Content Initialization...');
console.log('📁 Working directory:', __dirname);
console.log('🔍 Looking for .env file at:', path.join(__dirname, '..', '.env'));

initializeProductsContent();
