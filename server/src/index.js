// src/index.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import { connectDB } from './config/db.js';


dotenv.config();

if (!process.env.MONGO_URI) {
  console.warn('⚠️  MONGO_URI not defined. Check your .env file path.');
}

try {
  await connectDB();
} catch (err) {
  console.error('Failed to connect to DB:', err);
  process.exit(1);
}

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} (PORT=${PORT})`);
});
