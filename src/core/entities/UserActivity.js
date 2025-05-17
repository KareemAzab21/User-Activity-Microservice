class UserActivity {
    constructor({ userId, action, entityType, entityId, metadata }) {
      this.userId = userId;
      this.action = action;
      this.entityType = entityType;
      this.entityId = entityId;
      this.metadata = metadata;
      this.timestamp = new Date();
    }
  
    validate() {
      if (!this.userId || !this.action) {
        throw new Error('Missing required fields');
      }
    }
  }
  
  module.exports = UserActivity;