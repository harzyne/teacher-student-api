-- Insert teachers
INSERT INTO teachers (email) VALUES
('teacherken@gmail.com'),
('teacherjoe@gmail.com');

-- Insert students
INSERT INTO students (email, is_suspended) VALUES
('studentjon@gmail.com', 0),
('studentbob@gmail.com', 0),
('commonstudent1@gmail.com', 0),
('commonstudent2@gmail.com', 0),
('studentagnes@gmail.com', 0),
('studentmiche@gmail.com', 0);

-- Insert teacher-student relationships
INSERT INTO teacher_students (teacher_id, student_id) VALUES
((SELECT id FROM teachers WHERE email = 'teacherken@gmail.com'), (SELECT id FROM students WHERE email = 'studentjon@gmail.com')),
((SELECT id FROM teachers WHERE email = 'teacherken@gmail.com'), (SELECT id FROM students WHERE email = 'studentbob@gmail.com')),
((SELECT id FROM teachers WHERE email = 'teacherjoe@gmail.com'), (SELECT id FROM students WHERE email = 'commonstudent1@gmail.com')),
((SELECT id FROM teachers WHERE email = 'teacherjoe@gmail.com'), (SELECT id FROM students WHERE email = 'commonstudent2@gmail.com'));
