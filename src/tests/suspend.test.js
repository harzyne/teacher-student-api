const request = require('supertest');
const express = require('express');
const suspendRoute = require('../routes/suspendRoute'); // Path to your suspend route
const app = express();

app.use(express.json());
app.use('/api', suspendRoute);

describe('POST /api/suspend', () => {
  it('should suspend a student successfully', async () => {
    const res = await request(app)
      .post('/api/suspend')
      .send({ student: 'studentmary@gmail.com' });  // Use the correct student email

    expect(res.statusCode).toBe(204);  // No content
  });

  it('should return 400 if student not found', async () => {
    const res = await request(app)
      .post('/api/suspend')
      .send({ student: 'nonexistentstudent@gmail.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Student not found');
  });

  it('should return 400 if no student is provided', async () => {
    const res = await request(app)
      .post('/api/suspend')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Student email is required');
  });
});
