const express = require('express');
const { validateAdminLogin, validatePasswordChange } = require('../middleware/validation');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/login', validateAdminLogin, authController.login);
router.post('/logout', authMiddleware, authController.logout);
router.get('/me', authMiddleware, authController.getMe);
router.put('/change-password', authMiddleware, validatePasswordChange, authController.changePassword);
router.post('/verify-token', authController.verifyToken);

module.exports = router;