const pool = require('../config/db');

exports.getRecipients = async (req, res) => {
  const { teacher, notification } = req.body;

  if (!teacher || !notification) {
    return res.status(400).json({ message: 'Teacher and notification are required' });
  }

  // Extract @mentioned emails
  const mentionedEmails = [...notification.matchAll(/@([^\s@]+@[^\s@]+\.[^\s@]+)/g)].map(m => m[1]);

  try {
    const connection = await pool.getConnection();

    // Get registered students for this teacher who are not suspended
    const [registeredStudents] = await connection.query(
      `
      SELECT s.email
      FROM students s
      JOIN teacher_students ts ON ts.student_id = s.id
      JOIN teachers t ON ts.teacher_id = t.id
      WHERE t.email = ? AND s.is_suspended = FALSE
      `,
      [teacher]
    );

    // Get mentioned students who are not suspended
    let mentioned = [];
    if (mentionedEmails.length > 0) {
      const [mentionedStudents] = await connection.query(
        `
        SELECT email FROM students
        WHERE email IN (?) AND is_suspended = FALSE
        `,
        [mentionedEmails]
      );
      mentioned = mentionedStudents;
    }

    // Merge emails and remove duplicates
    const uniqueRecipients = new Set([
      ...registeredStudents.map(s => s.email),
      ...mentioned.map(s => s.email),
    ]);

    res.status(200).json({ recipients: [...uniqueRecipients] });
    connection.release();
  } catch (err) {
    console.error('Error retrieving recipients:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
