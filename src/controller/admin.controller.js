// controllers/adminController.js
const adminService = require('../services/admin.service');

const adminController = {
    registerAdmin: async (req, res) => {
      try {
        const { email, username, phone, password } = req.body;
        const result = await adminService.registerAdmin(email, username, phone, password);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    loginAdmin: async (req, res) => {
      try {
        const { email, username, password } = req.body;
        const token = await adminService.loginAdmin(email, username, password);
        res.json({ token });
      } catch (error) {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    },
  };
  
  module.exports = adminController;
