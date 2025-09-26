const mongoose = require('mongoose');
const Content = require('../models/Content');
require('dotenv').config();

const sampleData = {
  industries: {
    section: 'industries',
    pageType: 'home',
    title: 'Industries',
    content: {
      items: [
        {
          image: 'https://images.unsplash.com/photo-1690631058550-2524e7905d29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVpbGRpbmd8ZW58MHx8MHx8fDA%3D',
          title: 'Building',
          href: '/infrastructure'
        },
        {
          image: 'https://images.unsplash.com/photo-1708358131308-c2dad0046a73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEluZnJhc3RydWN0dXJlfGVufDB8fDB8fHww',
          title: 'Infrastructure',
          href: '/infrastructure'
        },
        {
          image: 'https://images.unsplash.com/photo-1638461800418-a54f284d72cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fENvYXRpbmclMjBhbmQlMjBNYXN0ZXJiYXRjaCUyMFNvbHV0aW9uc3xlbnwwfHwwfHx8MA%3D%3D',
          title: 'Coating and Masterbatch Solutions',
          href: '/Coating'
        },
        {
          image: 'https://images.unsplash.com/photo-1713433977943-882fae1862a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc5fHxQYXBlciUyMCUyNiUyMFBhY2thZ2luZ3xlbnwwfHwwfHx8MA%3D%3D',
          title: 'Paper & Packaging',
          href: 'https://indiapaper.com/'
        }
      ]
    }
  },
  products: {
    section: 'products',
    pageType: 'home',
    title: 'Products',
    content: {
      items: [
        {
          ProjectLink: '/Products/synthetic-fibre',
          ProjectImg: '/images/synthetic-fiber-p.png',
          ProjectTitle: 'Synthetic Fibre'
        },
        {
          ProjectLink: '/Products/cellulose-fiber-pellets',
          ProjectImg: '/images/cellulose-fiber-pellet-p.png',
          ProjectTitle: 'Cellulose Fibre Pellets'
        },
        {
          ProjectLink: '/Products/steel-fibre',
          ProjectImg: '/images/steel-1.jpg',
          ProjectTitle: 'Steel Fibre'
        },
        {
          ProjectLink: '/Products/silica-fume',
          ProjectImg: '/images/silica-fume.jpg',
          ProjectTitle: 'Silica Fume'
        },
        {
          ProjectLink: '/Products/anti-stripping-agent',
          ProjectImg: '/images/anti-stripping-agent-p.png',
          ProjectTitle: 'Anti Stripping Agent'
        }
      ]
    }
  },
  technology: {
    section: 'technology',
    pageType: 'home',
    title: 'Technology',
    content: {
      items: [
        {
          BlogLink: '/Blog/stone-matrix-asphalt',
          BlogImg: '/images/SMA-mix.jpg',
          BlogTitle: 'Stone Matrix Asphalt (SMA)',
          BlogDate: 'March 1, 2023',
          BlogDesc: 'Stone Matrix Asphalt (SMA) is a gap-graded mix that provides enhanced durability and rut resistance for high-traffic roads. Its stone-on-stone contact structure, held together by a rich mastic of bitumen and filler, offers superior performance against deformation, cracking, and weathering.',
          BlogBtn: 'Read More'
        },
        {
          BlogLink: '/Blog/silica-fume-concrete',
          BlogImg: '/images/silica-fume-img.png',
          BlogTitle: 'Silica Fume Concrete (SFC)',
          BlogDate: 'April 1, 2023',
          BlogDesc: 'Silica fume dramatically improves concrete\'s compressive strength and durability. As an ultrafine pozzolanic material, it fills microscopic voids and enhances the cement paste-aggregate bond. The result is significantly reduced permeability and superior resistance to chemical attack from chlorides and sulfates.',
          BlogBtn: 'Read More'
        },
        {
          BlogLink: '/Blog/steel-fibre-reinforced-concrete',
          BlogImg: '/images/steel-fiber-img.png',
          BlogTitle: 'Steel Fibre Reinforced Concrete (SFRC)',
          BlogDate: 'May 1, 2023',
          BlogDesc: 'Steel Fibre Reinforced Concrete (SFRC) incorporates high-tensile steel fibres to enhance flexural strength and crack resistance. These fibres distribute stresses uniformly throughout the concrete matrix, dramatically improving toughness, impact resistance, and fatigue performance in demanding infrastructure applications.',
          BlogBtn: 'Read More'
        }
      ]
    }
  }
};

async function insertSampleData() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || '';
    console.log(`Connecting to MongoDB at: ${mongoUri.replace(/:[^:]*@/, ':***@')}`);

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Insert sample data
    for (const [section, data] of Object.entries(sampleData)) {
      // Check if content already exists
      const existingContent = await Content.findOne({
        section: data.section,
        pageType: data.pageType
      });

      if (existingContent) {
        // Update existing content
        await Content.findOneAndUpdate(
          { section: data.section, pageType: data.pageType },
          {
            ...data,
            updatedAt: Date.now()
          },
          { new: true }
        );
        console.log(`Updated content for ${section}`);
      } else {
        // Create new content
        const newContent = new Content(data);
        await newContent.save();
        console.log(`Created content for ${section}`);
      }
    }

    console.log('Sample data insertion completed');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting sample data:', error);
    process.exit(1);
  }
}

insertSampleData();
