const express = require('express');
const app = express();
const registerRoute = require('./routes/registerRoute');
require('dotenv').config();

app.use(express.json());
app.use('/api', registerRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
