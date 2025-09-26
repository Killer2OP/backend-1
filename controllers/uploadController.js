const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Helper to generate file URL
const getFileUrl = (filename) => {
  return `${process.env.FRONTEND_URL || 'http://localhost:3000'}/uploads/${filename}`;
};

// Upload image handler
exports.uploadImageHandler = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        url: getFileUrl(req.file.filename),
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
  }
};

// Upload video handler
exports.uploadVideoHandler = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video file uploaded' });
    }

    res.json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        filename: req.file.filename,
        url: getFileUrl(req.file.filename),
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({ success: false, message: 'Video upload failed', error: error.message });
  }
};

// Upload info handler
exports.uploadInfo = (req, res) => {
  res.json({
    success: true,
    message: 'Upload endpoint is available',
    maxSize: '5MB for images, 100MB for videos',
    allowedTypes: [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/ogg'
    ]
  });
};
