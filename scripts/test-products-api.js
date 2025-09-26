const axios = require('axios');

async function testProductsAPI() {
  const baseURL = 'http://localhost:5000';

  try {
    console.log('🧪 Testing Products Content API Endpoints...');
    console.log('');

    // Test 1: Products listing endpoint
    console.log('1. Testing /api/content/products/listing');
    try {
      const response = await axios.get(`${baseURL}/api/content/products/listing`);
      if (response.status === 200) {
        console.log('   ✅ Endpoint working');
        console.log(`   📊 Found ${response.data?.content?.products?.length || 0} products`);
      } else {
        console.log(`   ❌ Status: ${response.status}`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.status || error.message}`);
      console.log('   💡 Make sure backend server is running on port 5000');
    }

    console.log('');

    // Test 2: Home products endpoint
    console.log('2. Testing /api/content/products/home');
    try {
      const response = await axios.get(`${baseURL}/api/content/products/home`);
      if (response.status === 200) {
        console.log('   ✅ Endpoint working');
        console.log(`   📊 Found ${response.data?.content?.items?.length || 0} home products`);
      } else {
        console.log(`   ❌ Status: ${response.status}`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.status || error.message}`);
    }

    console.log('');

    // Test 3: Frontend API routes
    console.log('3. Testing Frontend API Routes...');
    console.log('   💡 Start your frontend server (npm run dev) and test:');
    console.log('   - http://localhost:3000/api/content/products/listing');
    console.log('   - http://localhost:3000/api/content/products/home');

    console.log('');

    // Test 4: Admin interface
    console.log('4. Testing Admin Interface...');
    console.log('   💡 Visit these URLs in your browser:');
    console.log('   - http://localhost:3000/dashboard/products');
    console.log('   - http://localhost:3000/Products (main products page)');

    console.log('');
    console.log('🎯 API Test Complete!');
    console.log('');
    console.log('📋 Next Steps:');
    console.log('1. Start backend server: npm start (in backend directory)');
    console.log('2. Start frontend server: npm run dev (in frontend directory)');
    console.log('3. Initialize database content using admin panel');
    console.log('4. Test all functionality');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testProductsAPI();
