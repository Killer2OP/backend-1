const Admin = require('../models/Admin');

const initAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log("\x1b[36m%s\x1b[0m", '-------- ✅ Admin user already exists --------'); // Cyan
      return;
    }

    // Create initial admin user
    const adminData = {
      email: process.env.ADMIN_EMAIL || 'admin@shivananda.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      role: 'admin',
      isActive: true,
    };

    const admin = new Admin(adminData);
    await admin.save();

    console.log("\x1b[32m%s\x1b[0m", '-------- ✅ Initial admin user created successfully --------'); // Green
    console.log("\x1b[33m%s\x1b[0m", `📧 Email: ${admin.email}`); // Yellow
    console.log("\x1b[35m%s\x1b[0m", '🔐 Please change the default password after first login'); // Magenta
    
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", '-------- ❌ Error creating initial admin user --------'); // Red
    console.error("\x1b[33m%s\x1b[0m", error.message); // Yellow
  }
};

module.exports = initAdmin;