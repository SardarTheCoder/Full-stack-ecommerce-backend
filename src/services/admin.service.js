// services/adminService.js
const bcrypt = require('bcrypt');
const { generateToken } = require('../config/adminjwt'); 

const AdminModel = require('../models/admin.model');

const adminService = {
    registerAdmin: async (email, username, phone, password) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new AdminModel({ email, username, phone, password: hashedPassword });
        await admin.save();
        return { message: 'Admin registered successfully' };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  
    loginAdmin: async (email, username, password) => {
      try {
        const admin = await AdminModel.findOne({ email, username });
        if (!admin) {
          throw new Error('Admin not found');
        }
  
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
  
        // Using your existing generateToken function
        const token = generateToken(admin._id);
        return token;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  };
  
  module.exports = adminService;
