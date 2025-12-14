require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/userModel');

describe('Auth API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterEach(async () => {
        await User.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('POST /api/auth/register should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', 'Test User');
        expect(res.body).toHaveProperty('token');
    });
    it('POST /api/auth/login should authenticate a user', async () => {
        // First, create a user manually
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Login User',
                email: 'login@example.com',
                password: 'password123'
            });

        // Now try to login with that user
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'login@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual('login@example.com');
        expect(res.body).toHaveProperty('token');
    });
});