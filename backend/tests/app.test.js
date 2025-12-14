const request = require('supertest');
const app = require('../src/app');

describe('Sweet Shop API', () => {
    it('GET / should return a welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Welcome to Grandma's Sweets API");
    });
});