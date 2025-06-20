const pool = require('../config/db');

exports.registerStudents = async (req, res) => {
  const { teacher, students } = req.body;
  
  if (!teacher) {
    return res.status(400).json({ message: 'Teacher is required' });
  }

  if (!Array.isArray(students) || students.length === 0) {
    return res.status(400).json({ message: 'At least one student is required' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert teacher if not exists
    const [teacherResult] = await connection.query(
      'INSERT IGNORE INTO teachers (email) VALUES (?)',
      [teacher]
    );

    // Get teacher ID
    const [teacherRow] = await connection.query(
      'SELECT id FROM teachers WHERE email = ?',
      [teacher]
    );
    const teacherId = teacherRow[0].id;

    for (const student of students) {
      // Insert student if not exist
      await connection.query(
        'INSERT IGNORE INTO students (email) VALUES (?)',
        [student]
      );

      // Get student ID
      const [studentRow] = await connection.query(
        'SELECT id FROM students WHERE email = ?',
        [student]
      );
      const studentId = studentRow[0].id;

      // Create relation if not exist
      await connection.query(
        'INSERT IGNORE INTO teacher_students (teacher_id, student_id) VALUES (?, ?)',
        [teacherId, studentId]
      );
    }

    await connection.commit();
    return res.status(204).send(); // No Content

  } catch (err) {
    await connection.rollback();
    console.error('Error registering students:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    connection.release();
  }
};
