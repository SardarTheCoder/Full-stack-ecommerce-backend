// models/adminModel.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const AdminModel = mongoose.model("Admin", adminSchema);

module.exports = AdminModel;
