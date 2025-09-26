const fs = require('fs');
const path = require('path');

// Test if uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log('✅ Uploads directory exists');
} else {
  console.log('❌ Uploads directory does not exist');
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
}

// Test multer import
try {
  const multer = require('multer');
  console.log('✅ Multer imported successfully');

  // Test storage configuration
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      const filename = 'test-' + uniqueSuffix + extension;
      cb(null, filename);
    }
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
  });

  console.log('✅ Multer storage configured successfully');
  console.log('📁 Uploads directory:', uploadsDir);
  console.log('✅ Upload system ready');

} catch (error) {
  console.error('❌ Error testing multer:', error.message);
}

module.exports = { uploadsDir };
