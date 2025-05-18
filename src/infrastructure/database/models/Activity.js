const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
 
  userId: { type: String, required: true, index: true },
  action: { type: String, required: true, index: true },
  metadata: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now, index: true }
}, {


  timestamps: true
});

activitySchema.index({ userId: 1, action: 1, timestamp: -1 });

module.exports = mongoose.model('Activity', activitySchema);