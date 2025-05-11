// server.js
const app = require('./src/app');
require('dotenv').config();
const connectDB = require('./src/infrastructure/db/mongo');

const PORT = process.env.PORT || 5000;



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
