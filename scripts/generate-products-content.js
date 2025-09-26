const fs = require('fs');
const path = require('path');

// Read the existing projects.json file
const projectsPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'projects.json');

console.log('Looking for projects.json at:', projectsPath);

try {
  const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
  console.log('Successfully read projects.json with', projectsData.length, 'products');

  // Transform the data for products listing
  const productsListing = {
    products: projectsData.map(project => ({
      slug: project.slug,
      name: project.name,
      bgImage: project.bgImage,
      description: project.description,
      extraLine: project.extraLine,
      logoImg: project.logoImg || [],
      image: project.image || project.bgImage,
      overview: project.overview,
      specifications: project.specifications || [],
      application: project.application || [],
      advantages: project.advantages || [],
      keyFeatures: project.keyFeatures || [],
      images: project.images || [],
      pdfURL: project.pdfURL,
      storage: project.storage
    }))
  };

  // Transform data for home products (OurProject component)
  const homeProducts = {
    items: projectsData.slice(0, 5).map(project => ({
      ProjectLink: `/Products/${project.slug}`,
      ProjectImg: project.image || project.bgImage,
      ProjectTitle: project.name
    }))
  };

  // Write the products listing content
  const productsListingPath = path.join(__dirname, 'products-listing-content.json');
  fs.writeFileSync(productsListingPath, JSON.stringify(productsListing, null, 2));

  console.log('Products listing content generated successfully!');

  // Write the home products content
  const homeProductsPath = path.join(__dirname, 'home-products-content.json');
  fs.writeFileSync(homeProductsPath, JSON.stringify(homeProducts, null, 2));

  console.log('Home products content generated successfully!');

  console.log('\nTo initialize the database with this content, run:');
  console.log('1. Start your backend server');
  console.log('2. Use the admin panel to upload this content, or');
  console.log('3. Create a database initialization script');

} catch (error) {
  console.error('Error:', error.message);
  console.log('Make sure the projects.json file exists at the expected location');
}
