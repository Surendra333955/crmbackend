const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests

// Connect to MongoDB
const MONGO_URI = 'mongodb+srv://Surendra:Surendra33@cluster1.peit3.mongodb.net/'; // Replace with your MongoDB URI
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define Customer Schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Create Customer Model
const Customer = mongoose.model('Customer', customerSchema);

// GET route to fetch all customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find(); // Retrieve all customers from MongoDB
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST route to add a new customer
app.post('/api/customers', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const newCustomer = new Customer({ name, email });
    await newCustomer.save(); // Save the new customer to MongoDB
    res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Email already exists' }); // Handle duplicate email error
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});
const Lead = mongoose.model('Lead', customerSchema);

// GET route to fetch all customers
app.get('/api/leads', async (req, res) => {
  try {
    const customers = await Lead.find(); // Retrieve all customers from MongoDB
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST route to add a new customer
app.post('/api/leads', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const newCustomer = new Lead({ name, email });
    await newCustomer.save(); // Save the new customer to MongoDB
    res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Email already exists' }); // Handle duplicate email error
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
