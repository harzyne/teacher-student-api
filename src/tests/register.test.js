const request = require('supertest');
const express = require('express');
const registerRoute = require('../routes/registerRoute');
const app = express();

app.use(express.json());
app.use('/api', registerRoute);

describe('POST /api/register', () => {
  it('should register students successfully', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        teacher: 'teacherken@gmail.com',
        students: ['studentjon@gmail.com', 'studenthon@gmail.com'],
      });

    expect(res.statusCode).toBe(204);
  });

  it('should return 400 if no teacher is provided', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        students: ['studentjon@gmail.com'],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Teacher is required');
  });

  it('should return 400 if no students are provided', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        teacher: 'teacherken@gmail.com',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('At least one student is required');
  });
});
