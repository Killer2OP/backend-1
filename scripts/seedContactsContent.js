const mongoose = require('mongoose');
const Content = require('../models/Content');
require('dotenv').config();

const contactsContent = [
  {
    section: 'contacts',
    pageType: 'home',
    title: 'Our Address - Home Page',
    content: {
      address: "Shivananda Marketing Pvt. Ltd., NDG Cella, 11702/3,\nGT Road, Block 25, Shakti Nagar, Delhi - 110007\nDelhi, 110007",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.2159595874245!2d77.1969581!3d28.683185800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfda659f0c013%3A0x4e338402ca192f01!2sNDG%20Cella%20Corporate!5e0!3m2!1sen!2sin!4v1745326872870!5m2!1sen!2sin"
    },
    metadata: {
      description: 'Our office address and location',
      keywords: 'address, location, contact, office',
    },
    images: [],
    status: 'published',
    order: 4
  }
];

async function seedContactsContent() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || '';
    console.log(`Connecting to MongoDB at: ${mongoUri.replace(/:[^:]*@/, ':***@')}`);

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Insert contacts content
    for (const content of contactsContent) {
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

    console.log('Contacts content seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding contacts content:', error);
    process.exit(1);
  }
}

seedContactsContent();
