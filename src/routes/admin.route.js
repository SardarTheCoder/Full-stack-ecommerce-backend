// routes/adminRoutes.js
const express = require('express');
const adminController = require('../controller/admin.controller');

const router = express.Router();

// Register Admin
router.post('/register', adminController.registerAdmin);

// Login Admin
router.post('/login', adminController.loginAdmin);

module.exports = router;
