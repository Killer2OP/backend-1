require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

async function testMongoDBConnection() {
  try {
    console.log('🧪 Testing MongoDB Connection...');
    console.log('📁 Working directory:', __dirname);
    console.log('🔍 .env file path:', require('path').join(__dirname, '..', '.env'));

    // Check if MONGODB_URI is loaded
    console.log('🔑 MONGODB_URI loaded:', !!process.env.MONGODB_URI);
    console.log('🔑 MONGODB_URI length:', process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0);

    if (!process.env.MONGODB_URI) {
      console.log('❌ MONGODB_URI not found in environment variables');
      console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('MONGO')));
      return;
    }

    // Hide sensitive parts of the connection string
    const uri = process.env.MONGODB_URI;
    const hiddenUri = uri.replace(/:([^:@]{4})[^:@]*@/, ':$1****@');
    console.log('🔗 MongoDB URI (hidden):', hiddenUri);

    console.log('🔌 Attempting to connect...');

    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log('✅ Successfully connected to MongoDB!');

    // Test basic operations
    console.log('📊 Database name:', mongoose.connection.name);
    console.log('📊 Collections:', await mongoose.connection.db.listCollections().toArray().then(cols => cols.map(c => c.name)));

    // Close connection
    await mongoose.connection.close();
    console.log('✅ Connection closed successfully');

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('Full error:', error);

    // Provide helpful debugging info
    if (error.message.includes('authentication failed')) {
      console.log('💡 Authentication issue - check username/password in connection string');
    } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
      console.log('💡 DNS issue - check cluster URL in connection string');
    } else if (error.message.includes('connection timed out')) {
      console.log('💡 Connection timeout - check network/firewall settings');
    }
  }
}

testMongoDBConnection();
