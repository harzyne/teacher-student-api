const request = require('supertest');
const express = require('express');
const notificationRoute = require('../routes/notificationRoute');
const app = express();

app.use(express.json());
app.use('/api', notificationRoute);

describe('POST /api/retrievefornotifications', () => {
  it('should return the correct recipients based on teacher and notification mentions', async () => {
    const res = await request(app)
      .post('/api/retrievefornotifications')
      .send({
        teacher: 'teacherken@gmail.com',
        notification: 'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.recipients).toEqual(
      expect.arrayContaining([
        'studentbob@gmail.com',
        'studentagnes@gmail.com',
        'studentmiche@gmail.com',
      ])
    );
  });

  it('should return 400 if no teacher or notification is provided', async () => {
    const res = await request(app)
      .post('/api/retrievefornotifications')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Teacher and notification are required');
  });
});
