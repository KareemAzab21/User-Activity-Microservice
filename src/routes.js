const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Simple model
const Activity = mongoose.model('Activity', new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now }
}));

// Test endpoint
router.get('/test', async (req, res) => {
  const testActivity = new Activity({ message: 'K8s test successful' });
  await testActivity.save();
  res.json({ 
    status: 'OK', 
    database: testActivity ? 'Connected' : 'Failed',
    activity: testActivity
  });
});

module.exports = router;