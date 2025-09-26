const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const prefix = file.mimetype.startsWith('video/') ? 'video-' : 'image-';
    cb(null, prefix + uniqueSuffix + extension);
  }
});

// Multer upload configs
const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    cb(file.mimetype.startsWith('image/') ? null : new Error('Only image files allowed'), true);
  }
});

const uploadVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    cb(file.mimetype.startsWith('video/') ? null : new Error('Only video files allowed'), true);
  }
});

// Routes
router.post('/upload', uploadImage.single('image'), uploadController.uploadImageHandler);
router.post('/upload/video', uploadVideo.single('video'), uploadController.uploadVideoHandler);
router.get('/upload-info', uploadController.uploadInfo);

module.exports = router;
