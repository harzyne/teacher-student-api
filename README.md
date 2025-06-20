How to Run Locally:
1. Clone the Repository
git clone https://github.com/yourusername/teacher-student-api.git
cd teacher-student-api

2. Install Dependencies
Make sure you have Node.js and npm installed. Then, run the following command to install the required dependencies:
npm install

3. Set Up Your .env File
Create a .env file in the root directory of your project to store your environment variables.
touch .env
Add the following to your .env file (adjust values accordingly):
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_admin
PORT=3000

4. Set Up the MySQL Database
Log into MySQL:
mysql -u root -p

Create a new database (if not already created) for the project:
sql
Copy
Edit
CREATE DATABASE school_admin;
Import the schema.sql to create the necessary tables:
mysql -u root -p school_admin < schema.sql

5. Start the Server
Once everything is set up, start the server:

npm run dev
This will launch the server on http://localhost:3000.