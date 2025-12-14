require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Sweet = require('../src/models/sweetModel');

describe('Sweets API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterEach(async () => {
        await Sweet.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Test 1: GET (Get all sweets)
    it('GET /api/sweets should return all sweets', async () => {
        await Sweet.create({
            name: 'Gulab Jamun',
            category: 'Traditional',
            price: 10,
            countInStock: 20
        });

        const res = await request(app).get('/api/sweets');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].name).toEqual('Gulab Jamun');
    });

    // Test 2: POST (Add a new sweet) - Now it is outside the previous block!
    it('POST /api/sweets should create a new sweet', async () => {
        const res = await request(app)
            .post('/api/sweets')
            .send({
                name: 'Chocolate Bar',
                category: 'Candy',
                price: 5,
                countInStock: 100
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('Chocolate Bar');
    });
    // Test 3: Purchase (Buy a sweet)
    it('POST /api/sweets/:id/purchase should decrease stock', async () => {
        // 1. Create a sweet with 10 items
        const sweet = await Sweet.create({
            name: 'Kaju Katli',
            category: 'Premium',
            price: 20,
            countInStock: 10
        });

        // 2. Buy 1 item (sending quantity: 1)
        const res = await request(app)
            .post(`/api/sweets/${sweet._id}/purchase`)
            .send({ quantity: 1 });

        // 3. Check if success
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Purchase successful');
        
        // 4. Check database to ensure stock is now 9
        const updatedSweet = await Sweet.findById(sweet._id);
        expect(updatedSweet.countInStock).toEqual(9);
    });
});