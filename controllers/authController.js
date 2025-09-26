const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Generate JWT token
const generateToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Admin login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findByEmail(email);
    if (!admin) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
    }

    if (admin.isLocked) {
      return res.status(401).json({
        status: 'error',
        message: 'Account is temporarily locked due to multiple failed login attempts. Please try again later.',
      });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      await admin.incLoginAttempts();
      return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
    }

    await admin.resetLoginAttempts();
    await admin.updateLastLogin();

    const token = generateToken(admin._id);

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin,
        },
        token,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error during login' });
  }
};

// Admin logout
exports.logout = (req, res) => {
  res.status(200).json({ status: 'success', message: 'Logout successful' });
};

// Get current admin info
exports.getMe = async (req, res) => {
  try {
    const admin = req.admin; // populated by auth middleware
    res.status(200).json({
      status: 'success',
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin,
          createdAt: admin.createdAt,
        },
      },
    });
  } catch (error) {
    console.error('Get admin info error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const admin = req.admin;
    const { currentPassword, newPassword } = req.body;

    const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ status: 'error', message: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ status: 'success', message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Verify token
exports.verifyToken = (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ status: 'error', message: 'Token is required' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({
      status: 'success',
      message: 'Token is valid',
      data: { adminId: decoded.adminId, exp: decoded.exp },
    });
  } catch (error) {
    console.error('Token verification error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ status: 'error', message: 'Token expired' });
    }
    res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
};
