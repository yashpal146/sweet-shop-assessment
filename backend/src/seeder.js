const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sweet = require('./models/sweetModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Sweet.deleteMany(); // Clear old data

        const sweets = [
            {
                name: 'Gulab Jamun',
                category: 'Traditional',
                price: 50,
                countInStock: 100,
                description: 'Soft and juicy milk solids balls dipped in syrup'
            },
            {
                name: 'Kaju Katli',
                category: 'Premium',
                price: 15,
                countInStock: 50,
                description: 'Diamond shaped cashew fudge'
            },
            {
                name: 'Chocolate Bar',
                category: 'Candy',
                price: 5,
                countInStock: 200,
                description: 'Rich dark chocolate'
            }
        ];

        await Sweet.insertMany(sweets);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();