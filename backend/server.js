const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Schema
const ItemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', ItemSchema);

// Routes

// Get all items
app.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add item
app.post('/add', async (req, res) => {
  try {
    const item = new Item({ name: req.body.name });
    await item.save();
    res.json({ message: 'Item added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
