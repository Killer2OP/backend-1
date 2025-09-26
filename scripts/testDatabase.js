const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const Admin = require('../models/Admin');
require('dotenv').config();

async function testDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || '';
    console.log(`Connecting to MongoDB...`);

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Check if there are any admins
    const adminCount = await Admin.countDocuments();
    console.log(`📊 Total admins: ${adminCount}`);

    if (adminCount === 0) {
      console.log('⚠️  No admins found. Creating a default admin...');
      const defaultAdmin = new Admin({
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        isActive: true
      });
      await defaultAdmin.save();
      console.log('✅ Default admin created: admin@example.com / admin123');
    }

    // Check blogs
    const blogCount = await Blog.countDocuments();
    console.log(`📝 Total blogs: ${blogCount}`);

    if (blogCount === 0) {
      console.log('⚠️  No blogs found. Let me check if migration ran...');
      // Try to create a sample blog
      const sampleBlog = new Blog({
        name: 'Sample Blog',
        slug: 'sample-blog',
        bgImage: 'https://via.placeholder.com/800x400',
        image: 'https://via.placeholder.com/400x300',
        publishDate: new Date().toISOString().split('T')[0],
        overview: 'This is a sample blog post for testing purposes.',
        description: 'This is a sample blog post for testing purposes.',
        application: [],
        challenges: [],
        applications: [],
        specifications: [],
        images: ['https://via.placeholder.com/400x300'],
        totalUsers: 0,
        isPublished: true,
        featured: false,
        metaTitle: 'Sample Blog',
        metaDescription: 'This is a sample blog post for testing purposes.'
      });
      await sampleBlog.save();
      console.log('✅ Sample blog created');
    }

    // List all blogs
    const blogs = await Blog.find().select('name slug isPublished createdAt');
    console.log('📋 Existing blogs:');
    blogs.forEach(blog => {
      console.log(`  - ${blog.name} (${blog.slug}) - ${blog.isPublished ? 'Published' : 'Draft'} - ${blog.createdAt.toDateString()}`);
    });

    console.log('✅ Database test completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error testing database:', error);
    process.exit(1);
  }
}

testDatabase();
