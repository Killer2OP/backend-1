const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    enum: ['hero', 'about', 'products', 'blogs', 'clients', 'contact', 'contacts', 'industries', 'technology', 'other']
  },
  pageType: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    default: ''
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
contentSchema.index({ section: 1, pageType: 1 }, { unique: true });

module.exports = mongoose.model('Content', contentSchema);