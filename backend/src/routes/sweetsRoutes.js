const express = require('express');
const router = express.Router();
const { getSweets, createSweet, purchaseSweet } = require('../controllers/sweetsController');

router.get('/', getSweets);
router.post('/', createSweet);
router.post('/:id/purchase', purchaseSweet); // New Route

module.exports = router;