const mongoose = require('mongoose');
const Content = require('../models/Content');
require('dotenv').config();

const defaultContent = [
  {
    section: 'industries',
    pageType: 'home',
    title: 'Industries We Serve',
    content: 'We provide innovative solutions across various industries to help businesses thrive in the digital age. Our expertise spans multiple sectors, delivering tailored solutions that drive growth and efficiency.',
    metadata: {
      description: 'Explore the industries we serve with our cutting-edge solutions',
      keywords: 'industries, business sectors, solutions, technology',
    },
    images: [],
    status: 'published',
    order: 1
  },
  {
    section: 'products',
    pageType: 'home',
    title: 'Our Products',
    content: 'Discover our range of innovative products designed to transform your business operations. From enterprise solutions to specialized tools, we have what you need to succeed in today\'s competitive landscape.',
    metadata: {
      description: 'Explore our suite of products designed for business excellence',
      keywords: 'products, solutions, software, tools, business',
    },
    images: [],
    status: 'published',
    order: 2
  },
  {
    section: 'technology',
    pageType: 'home',
    title: 'Our Technology Stack',
    content: 'We leverage cutting-edge technologies to build robust, scalable, and secure solutions. Our tech stack is carefully chosen to deliver optimal performance and the best possible user experience.',
    metadata: {
      description: 'Learn about the technologies powering our solutions',
      keywords: 'technology, stack, development, programming, tools',
    },
    images: [],
    status: 'published',
    order: 3
  }
];

async function insertDefaultContent() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || '';
    console.log(`Connecting to MongoDB at: ${mongoUri.replace(/:[^:]*@/, ':***@')}`);
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Insert default content
    for (const content of defaultContent) {
      // Check if content already exists
      const existingContent = await Content.findOne({
        section: content.section,
        pageType: content.pageType
      });

      if (!existingContent) {
        const newContent = new Content(content);
        await newContent.save();
        console.log(`Added content for ${content.section}/${content.pageType}`);
      } else {
        console.log(`Content for ${content.section}/${content.pageType} already exists`);
      }
    }

    console.log('Default content insertion completed');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting default content:', error);
    process.exit(1);
  }
}

insertDefaultContent();
