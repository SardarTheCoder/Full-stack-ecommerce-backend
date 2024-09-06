const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        // text: true,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    },
    // men/cloths/kurta etc levels
    level: {
        type: Number,
        required: true,
    },
});
categorySchema.index({ name:"text" });
const Category = mongoose.model("categories", categorySchema);
module.exports = Category;  // Correct export statement
