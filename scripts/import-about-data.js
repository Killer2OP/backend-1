const mongoose = require('mongoose');
const Content = require('../models/Content');
require('dotenv').config();

const aboutData = [
  {
    section: 'about-us-hero',
    pageType: 'about',
    title: 'About Hero',
    content: {
      title: "About Us",
      subtitle: "Narsingh Dass Group is a multifarious trading group, renowned and much admired in the paper industry.",
      description: "With a corporate philosophy based on Knowledge Partnership, Narsingh Dass Group follows a guiding principle of Customers Grow, We Grow. With this belief, the group has enjoyed consistent growth and expansion over the years and has transformed itself from a trading company to a complete Solution Marketing Group.",
      heroImage: "/images/about-hero.png"
    },
    status: 'published'
  },
  {
    section: 'about-us-stats',
    pageType: 'about',
    title: 'About Stats',
    content: {
      stats: [
        { id: 'years', number: '35+', label: 'Years of Excellence', icon: 'Trophy' },
        { id: 'projects', number: '250+', label: 'Projects Delivered', icon: 'Building2' },
        { id: 'clients', number: '98%', label: 'Client Retention', icon: 'Users' }
      ]
    },
    status: 'published'
  },
  {
    section: 'about-us-vision',
    pageType: 'about',
    title: 'About Vision',
    content: {
      visionTitle: "Our Vision & Core Principles",
      visionDescription: "We are committed to pushing the boundaries of excellence while maintaining unwavering dedication to sustainability and innovation. Our approach combines cutting-edge technology with time-tested craftsmanship.",
      corePrinciples: ['Trust', 'Togetherness', 'Excellence', 'Compassion']
    },
    status: 'published'
  },
  {
    section: 'about-us-logo',
    pageType: 'about',
    title: 'About Logo',
    content: {
      logoDescription: {
        represents: "Represents a Paper Fan which denotes the different group activities",
        wings: "The wings, unattached, converge to one focal point, the Consumer!",
        colors: "The changing colors and the circular movement of the fan reflect the dynamism and continuous growth of the group."
      }
    },
    status: 'published'
  },
  {
    section: 'about-us-contact',
    pageType: 'about',
    title: 'About Contact',
    content: {
      contactInfo: {
        title: 'Get in Touch',
        subtitle: 'Contact us today and let\'s bring it to life.',
        phone1: '+91 9873173214',
        phone2: '+91 9205992676',
        email1: 'material@narsinghdass.com',
        email2: 'smpl@narsinghdass.com'
      }
    },
    status: 'published'
  }
];

async function importAboutData() {
  try {

    // Get MongoDB URI from environment
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error(' MONGODB_URI not found in environment variables');
      console.log('Please check your .env file');
      return;
    }

    console.log(' Connecting to:', mongoUri.replace(/:[^:]+@/, ':****:****@')); // Hide password

    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(' Connected to MongoDB successfully!');

    // Clear existing About Us content (including any with null pageType)
    console.log(' Clearing existing About Us content...');
    const deleteResult = await mongoose.connection.db.collection('contents').deleteMany({
      $or: [
        { pageType: { $in: ['about', 'about-stats', 'about-vision', 'about-logo', 'about-contact'] } },
        { pageType: null, section: 'hero' },
        { pageType: null, section: 'about' }
      ]
    });
    console.log(` Cleared ${deleteResult.deletedCount} existing About Us documents`);

    // Insert new content
    console.log(' Inserting new About Us content...');
    const result = await mongoose.connection.db.collection('contents').insertMany(aboutData);
    console.log(` Successfully imported ${result.insertedCount} About Us content sections`);

    // Display what was imported
    console.log('\n Imported sections:');
    result.ops.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.section} - ${item.title} (${item.pageType})`);
    });

    console.log('\n About Us data import completed successfully!');
    console.log(' You can now edit the About Us content through the admin panel at /dashboard/about');
    console.log(' No more 404 errors - all API endpoints will return data');

  } catch (error) {
    console.error(' Error importing About Us data:', error.message);

    if (error.message.includes('authentication failed')) {
      console.log('\n Possible solutions:');
      console.log('1. Check your MongoDB username and password in .env file');
      console.log('2. Verify your MongoDB connection string format');
      console.log('3. Make sure your IP address is whitelisted in MongoDB Atlas');
    }

    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log(' Database connection closed');
  }
}

// Run the import
if (require.main === module) {
  importAboutData();
}

module.exports = { importAboutData };
