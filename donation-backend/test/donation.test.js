const request = require('supertest');
const app = require('../server'); // Your Express app
const mongoose = require('mongoose');
const Donation = require('../models/Donation');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('should create a new donation', async () => {
  const response = await request(app)
    .post('/api/donations')
    .send({
      name: 'John Doe',
      amount: 100,
      message: 'Keep up the great work!'
    });
  
  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty('name', 'John Doe');
});

test('should get all donations', async () => {
  const response = await request(app).get('/api/donations');
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});

