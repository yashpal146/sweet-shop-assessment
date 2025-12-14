const Sweet = require('../models/sweetModel');

// 1. Get All Sweets
const getSweets = async (req, res) => {
    const sweets = await Sweet.find({});
    res.json(sweets);
};

// 2. Create a Sweet
const createSweet = async (req, res) => {
    const { name, category, price, countInStock, description } = req.body;

    if (!name || !category || !price) {
        return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const sweet = await Sweet.create({
        name,
        category,
        price,
        countInStock,
        description
    });

    res.status(201).json(sweet);
};

// 3. Purchase a Sweet (New Logic)
const purchaseSweet = async (req, res) => {
    const sweet = await Sweet.findById(req.params.id);
    const { quantity } = req.body;

    if (sweet) {
        if (sweet.countInStock >= quantity) {
            sweet.countInStock = sweet.countInStock - quantity;
            await sweet.save();
            res.json({ message: 'Purchase successful', updatedStock: sweet.countInStock });
        } else {
            res.status(400).json({ message: 'Not enough stock' });
        }
    } else {
        res.status(404).json({ message: 'Sweet not found' });
    }
};

module.exports = { getSweets, createSweet, purchaseSweet };