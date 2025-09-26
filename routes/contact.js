const express = require('express');
const { validateContact, validatePagination } = require('../middleware/validation');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.post('/', validateContact, contactController.submitContact);
router.get('/stats', contactController.getStats);
router.get('/recent', validatePagination, contactController.getRecentContacts);
router.get('/status/:status', validatePagination, contactController.getContactsByStatus);

module.exports = router;
