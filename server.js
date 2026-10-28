const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const pool = new Pool({
  user: 'postgres',      // your username
  host: 'localhost',
  database: 'CallCenter',
  password: 'yash2005', // your password
  port: 5432,
});

// Add customer
app.post('/add-customer', async (req, res) => {
  const { name, contact } = req.body;
  await pool.query('INSERT INTO customer (name, contact) VALUES ($1, $2)', [name, contact]);
  res.redirect('/');
});

// Add agent
app.post('/add-agent', async (req, res) => {
  const { name, role, dept_name } = req.body;
  await pool.query('INSERT INTO agent (name, role, dept_name) VALUES ($1, $2, $3)', [name, role, dept_name]);
  res.redirect('/');
});

app.get('/data', async (req, res) => {
  const customers = await pool.query('SELECT * FROM customer');
  const agents = await pool.query('SELECT * FROM agent');
  res.json({ customers: customers.rows, agents: agents.rows });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));