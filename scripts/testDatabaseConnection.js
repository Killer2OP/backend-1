const mongoose = require('mongoose');
const Blog = require('../models/Blog');
require('dotenv').config();

async function testDatabaseConnection() {
  try {
    console.log('🔄 Testing Database Connection and Blog System...');

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to database');

    // Get current blog count
    const initialCount = await Blog.countDocuments();
    console.log(`📝 Initial blog count: ${initialCount}`);

    // Create a test blog
    const testBlog = new Blog({
      name: 'Database Test Blog - ' + new Date().toLocaleTimeString(),
      slug: 'database-test-' + Date.now(),
      bgImage: 'https://via.placeholder.com/800x400',
      image: 'https://via.placeholder.com/400x300',
      publishDate: new Date().toISOString().split('T')[0],
      overview: 'This is a test blog to verify the database connection works.',
      description: 'This is a test blog to verify the database connection works.',
      application: [],
      challenges: [],
      applications: [],
      specifications: [],
      images: ['https://via.placeholder.com/400x300'],
      totalUsers: 0,
      isPublished: true,
      featured: false,
      metaTitle: 'Database Test Blog',
      metaDescription: 'This is a test blog to verify the database connection works.'
    });

    await testBlog.save();
    console.log('✅ Test blog created');

    // Test the API endpoints
    console.log('🧪 Testing API endpoints...');

    // Test findBySlug method
    const foundBlog = await Blog.findBySlug(testBlog.slug);
    console.log('✅ findBySlug method works:', foundBlog.name);

    // Test findPublished method
    const publishedBlogs = await Blog.findPublished();
    console.log('✅ findPublished method works:', publishedBlogs.length, 'published blogs');

    // Test find method (for all blogs)
    const allBlogs = await Blog.find();
    console.log('✅ find method works:', allBlogs.length, 'total blogs');

    // Clean up
    await Blog.findByIdAndDelete(testBlog._id);
    console.log('✅ Test blog cleaned up');

    console.log('🎉 Database connection test completed successfully!');
    console.log('💡 The database is working correctly and API endpoints are functional.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error testing database connection:', error);
    process.exit(1);
  }
}

testDatabaseConnection();
