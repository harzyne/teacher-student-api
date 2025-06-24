const request = require('supertest');
const express = require('express');
const commonStudentsRoute = require('../routes/commonStudentsRoute'); // Update the path if necessary
const app = express();

app.use(express.json());
app.use('/api', commonStudentsRoute);

describe('GET /api/commonstudents', () => {
  it('should return a list of common students for given teachers', async () => {
    const res = await request(app)
      .get('/api/commonstudents?teacher=teacherken@gmail.com&teacher=teacherjoe@gmail.com');

    // Check that the status is 200 and the students array contains the expected common students
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
      .get('/api/commonstudents?teacher=teacherken@gmail.com&teacher=teacherbob@gmail.com'); 

    // Check that the status is 200 and the students array is empty
    expect(res.statusCode).toBe(200);
    expect(res.body.students).toHaveLength(0);
  });

  it('should return 400 if one or more teachers are not found', async () => {
    const res = await request(app)
      .get('/api/commonstudents?teacher=teacherken@gmail.com&teacher=nonexistentteacher@gmail.com');

    // Check for 400 error and the appropriate message
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('One or more teachers not found');
  });

  it('should return 400 if no teachers are provided', async () => {
    const res = await request(app)
      .get('/api/commonstudents'); // No teachers provided

    // Check for 400 error and the appropriate message
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Missing teacher query param(s)');
  });
});
