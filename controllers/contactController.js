const Contact = require('../models/Contact');

// Submit contact form
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent');

    const contactData = { name, email, phone, company, subject, message, source: 'website', ipAddress, userAgent };

    const contact = new Contact(contactData);
    await contact.save();

    res.status(201).json({
      status: 'success',
      message: 'Contact form submitted successfully. We will get back to you soon.',
      data: { contactId: contact._id },
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error. Please try again later.' });
  }
};

// Get contact stats
exports.getStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const statuses = ['new', 'in-progress', 'resolved', 'closed'];
    const priorities = ['low', 'medium', 'high', 'urgent'];

    const statusBreakdown = {};
    for (let status of statuses) {
      statusBreakdown[status] = await Contact.countDocuments({ status });
    }

    const priorityBreakdown = {};
    for (let priority of priorities) {
      priorityBreakdown[priority] = await Contact.countDocuments({ priority });
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentContacts = await Contact.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    res.status(200).json({ status: 'success', data: { totalContacts, statusBreakdown, priorityBreakdown, recentContacts } });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Get recent contacts with pagination
exports.getRecentContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .populate('assignedTo', 'email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .select('-__v');

    const total = await Contact.countDocuments();

    res.status(200).json({
      status: 'success',
      data: {
        contacts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalContacts: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error('Get recent contacts error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Get contacts by status with pagination
exports.getContactsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const validStatuses = ['new', 'in-progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ status: 'error', message: 'Invalid status' });
    }

    const contacts = await Contact.findByStatus(status)
      .populate('assignedTo', 'email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .select('-__v');

    const total = await Contact.countDocuments({ status });

    res.status(200).json({
      status: 'success',
      data: {
        contacts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalContacts: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
        status,
      },
    });
  } catch (error) {
    console.error('Get contacts by status error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
