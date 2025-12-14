const mongoose = require('mongoose');

const sweetSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Sweet', sweetSchema);