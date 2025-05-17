const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
 
  userId: { type: String, required: true, index: true },
  action: { type: String, required: true, index: true },
  entityType: { type: String },
  entityId: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now, index: true }
}, {

  // Add createdAt and updatedAt timestamps
  timestamps: true
});

// Compound index for common query patterns
activitySchema.index({ userId: 1, action: 1, timestamp: -1 });

module.exports = mongoose.model('Activity', activitySchema);