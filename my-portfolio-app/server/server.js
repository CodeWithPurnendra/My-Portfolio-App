import express from 'express';
import cors from 'cors';
import pool from './db.js'; // Import PostgreSQL pool

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is Running" });
});

// Contact Endpoint with Database Insert
app.post('/api/contact', async (req, res) => {
  const { name, email, message, services } = req.body;

  // 1. Validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: "Validation Failed: Name, email, and message are required" 
    });
  }

  try {
    // 2. Parameterized SQL Query (Prevents SQL Injection)
    const insertQuery = `
      INSERT INTO contact_messages (name, email, message, services)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [name, email, message, services || []];

    // 3. Execute Insert
    const result = await pool.query(insertQuery, values);
    const savedMessage = result.rows[0];

    console.log("Database Insert Successful:", savedMessage);

    // 4. Return Success Response
    return res.status(200).json({
      success: true,
      message: "Project scope received and saved to database!",
      data: savedMessage
    });

  } catch (err) {
    console.error("Database Error:", err.message);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error: Failed to store message."
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});