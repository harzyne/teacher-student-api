const request = require('supertest');
const express = require('express');
const commonStudentsRoute = require('../routes/commonStudentsRoute');
const app = express();

app.use(express.json());
app.use('/api', commonStudentsRoute);

describe('GET /api/commonstudents', () => {
  it('should return a list of common students for given teachers', async () => {
    const res = await request(app)
      .get('/api/commonstudents?teacher=teacherken@gmail.com&teacher=teacherjoe@gmail.com');

    expect(res.statusCode).toBe(200);
    expect(res.body.students).toEqual(
      expect.arrayContaining([
        'commonstudent1@gmail.com',
        'commonstudent2@gmail.com',
      ])
    );
  });

  it('should return an empty list if no common students exist', async () => {
    const res = await request(app)
      .get('/api/commonstudents?teacher=teacherken@gmail.com&teacher=teacherjoe@gmail.com');

    expect(res.statusCode).toBe(200);
    expect(res.body.students).toHaveLength(0);
  });
});
