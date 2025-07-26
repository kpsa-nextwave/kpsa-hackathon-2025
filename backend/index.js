const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')

const app = express()
const port = 3000

// Middleware
app.use(express.json())

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/kpsa-hackathon')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err))

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.post('/user', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const user = new User({ name, email, age });
    await user.save();
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: error.message });
  }
})

app.get('/user', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.get('/user/:id/point', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      data: {
        userId: user._id,
        point: user.point
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Additional CRUD endpoints

// Get user by ID
app.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Update user
app.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: error.message });
  }
})

// Update user points
app.patch('/user/:id/point', async (req, res) => {
  try {
    const { id } = req.params;
    const { point } = req.body;
    
    if (typeof point !== 'number') {
      return res.status(400).json({ error: 'Point must be a number' });
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      { point },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      data: {
        userId: user._id,
        point: user.point
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Delete user
app.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

