const pool = require('../config/db');

exports.getCommonStudents = async (req, res) => {
  const teacherEmails = req.query.teacher;

  if (!teacherEmails) {
    return res.status(400).json({ message: 'Missing teacher query param(s)' });
  }

  const teachers = Array.isArray(teacherEmails) ? teacherEmails : [teacherEmails];

  try {
    const connection = await pool.getConnection();

    // Get teacher IDs based on email addresses
    const teacherIdsQuery = `
      SELECT id, email FROM teachers WHERE email IN (?)
    `;
    const [teacherRows] = await connection.query(teacherIdsQuery, [teachers]);

    if (teacherRows.length !== teachers.length) {
      return res.status(400).json({ message: 'One or more teachers not found' });
    }

    // Construct the query to find common students
    const commonQuery = `
      SELECT s.email
      FROM students s
      JOIN teacher_students ts ON ts.student_id = s.id
      WHERE ts.teacher_id IN (${teacherRows.map(() => '?').join(',')})
      GROUP BY s.id
      HAVING COUNT(DISTINCT ts.teacher_id) = ?
    `;

    const [commonStudents] = await connection.query(commonQuery, [
      ...teacherRows.map(t => t.id),
      teacherRows.length,
    ]);

    // If no common students found, return an empty list
    if (commonStudents.length === 0) {
      return res.status(200).json({ students: [] });
    }

    const emails = commonStudents.map(s => s.email);

    res.status(200).json({ students: emails });

    connection.release();
  } catch (err) {
    console.error('Error fetching common students:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
