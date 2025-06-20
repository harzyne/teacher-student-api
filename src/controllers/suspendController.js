const pool = require('../config/db');

exports.suspendStudent = async (req, res) => {
  const { student } = req.body;

  // Check if student email is provided
  if (!student) {
    return res.status(400).json({ message: 'Student email is required' });
  }

  try {
    const connection = await pool.getConnection();

    // Check if the student exists in the database
    const [studentRow] = await connection.query('SELECT id FROM students WHERE email = ?', [student]);

    // If the student is not found
    if (studentRow.length === 0) {
      return res.status(400).json({ message: 'Student not found' });
    }

    // Update the student's suspension status
    await connection.query('UPDATE students SET is_suspended = 1 WHERE email = ?', [student]);

    // Respond with status 204 (No Content) when successfully suspended
    res.status(204).send();

    connection.release();
  } catch (err) {
    console.error('Error suspending student:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
