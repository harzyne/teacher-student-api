const express = require('express');
const app = express();
require('dotenv').config();

const registerRoute = require('./routes/registerRoute');
const commonStudentsRoute = require('./routes/commonStudentsRoute');
const suspendRoute = require('./routes/suspendRoute');
const notificationRoute = require('./routes/notificationRoute');

app.use(express.json());
app.use('/api', registerRoute);
app.use('/api', commonStudentsRoute);
app.use('/api', suspendRoute);
app.use('/api', notificationRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
