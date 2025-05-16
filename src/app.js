const express = require('express');
const connectDB = require('./db');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});