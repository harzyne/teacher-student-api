const pool = require('../config/db');

exports.suspendStudent = async (req, res) => {
  const { student } = req.body;

  if (!student) {
    return res.status(400).json({ message: 'Student email is required' });
  }

  try {
    const connection = await pool.getConnection();

    // Check if student exists
    const [rows] = await connection.query(
      'SELECT id FROM students WHERE email = ?',
      [student]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Student not found' });
    }

    // Update is_suspended flag
    await connection.query(
      'UPDATE students SET is_suspended = TRUE WHERE email = ?',
      [student]
    );

    res.status(204).send(); // No Content
    connection.release();
  } catch (err) {
    console.error('Error suspending student:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
