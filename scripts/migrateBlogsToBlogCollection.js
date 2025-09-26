const mongoose = require('mongoose');
const Content = require('../models/Content');
const Blog = require('../models/Blog');
require('dotenv').config();

async function migrateBlogsToBlogCollection() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || '';
    console.log(`Connecting to MongoDB at: ${mongoUri.replace(/:[^:]*@/, ':***@')}`);

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Get existing blog content from Content model
    const technologyContent = await Content.findOne({
      section: 'technology',
      pageType: 'home'
    });

    if (!technologyContent) {
      console.log('No technology content found to migrate');
      return;
    }

    const blogItems = technologyContent.content.items;
    console.log(`Found ${blogItems.length} blog items to migrate`);

    // Migrate each blog item to Blog collection
    for (const blogItem of blogItems) {
      try {
        // Check if blog already exists (by slug)
        const existingBlog = await Blog.findOne({ slug: blogItem.BlogLink.replace('/blog/', '') });

        if (existingBlog) {
          console.log(`Blog "${blogItem.BlogTitle}" already exists, skipping...`);
          continue;
        }

        // Create new blog document
        const newBlog = new Blog({
          name: blogItem.BlogTitle,
          slug: blogItem.BlogLink.replace('/blog/', ''),
          bgImage: blogItem.BlogImg,
          image: blogItem.BlogImg, // Use same image for both bgImage and image
          publishDate: blogItem.BlogDate,
          overview: blogItem.BlogDesc,
          description: blogItem.BlogDesc, // Use description as overview for now
          application: [], // Empty applications array
          challenges: [], // Empty challenges array
          applications: [], // Empty applications array
          specifications: [], // Empty specifications array
          images: [blogItem.BlogImg], // Add the blog image to images array
          totalUsers: 0,
          isPublished: true,
          featured: false,
          metaTitle: blogItem.BlogTitle,
          metaDescription: blogItem.BlogDesc.substring(0, 160) // First 160 chars for meta description
        });

        await newBlog.save();
        console.log(`Migrated blog: "${blogItem.BlogTitle}"`);
      } catch (error) {
        console.error(`Error migrating blog "${blogItem.BlogTitle}":`, error);
      }
    }

    console.log('Blog migration completed successfully');

    // Update the Content model to remove blog items (optional)
    // technologyContent.content.items = [];
    // await technologyContent.save();
    // console.log('Cleared blog items from Content model');

    process.exit(0);
  } catch (error) {
    console.error('Error during blog migration:', error);
    process.exit(1);
  }
}

migrateBlogsToBlogCollection();
