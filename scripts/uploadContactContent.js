const mongoose = require('mongoose');
const path = require('path');

// Add the parent directory to the module path so we can require models
require.main.paths.push(path.join(__dirname, '..'));

const Content = require('../models/Content');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/freelancing-project');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Default contact content
const defaultContactContent = {
  section: 'contact',
  pageType: 'main',
  title: 'Contact Page Content',
  content: {
    heading: "Get in touch with us",
    intro: "Please fill in your details and our dedicated team will reach out to you within 24 hours. Looking forward to discussing opportunities with you and your team.",
    phones: ["+91 9873173214", "+91 9205992676"],
    emails: ["smpl@narsinghdass.com", "material@narsinghdass.com"],
    address: "Shop No, 1170/23, 3rd Floor, GT Rd, Block 25, Shakti Nagar, Delhi, 110007",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.2159595874245!2d77.1969581!3d28.683185800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfda659f0c013%3A0x4e338402ca192f01!2sNDG%20Cella%20Corporate!5e0!3m2!1sen!2sin!4v1745326872870!5m2!1sen!2sin"
  },
  status: 'published',
  updatedAt: new Date()
};

// Upload contact content
const uploadContactContent = async () => {
  try {
    console.log('Uploading contact page content...');

    // Check if contact content already exists
    const existingContent = await Content.findOne({
      section: 'contact',
      pageType: 'main'
    });

    if (existingContent) {
      console.log('Contact content already exists. Updating...');
      existingContent.content = defaultContactContent.content;
      existingContent.updatedAt = new Date();
      await existingContent.save();
      console.log('Contact content updated successfully');
    } else {
      console.log('Creating new contact content...');
      const contactContent = new Content(defaultContactContent);
      await contactContent.save();
      console.log('Contact content created successfully');
    }

    console.log('Contact content upload completed successfully');
  } catch (error) {
    console.error('Error uploading contact content:', error);
  }
};

// Main execution
const main = async () => {
  await connectDB();
  await uploadContactContent();
  await mongoose.connection.close();
  console.log('Database connection closed');
};

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { uploadContactContent };
