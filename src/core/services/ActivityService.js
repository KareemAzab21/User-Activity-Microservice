const { v4: uuidv4 } = require('uuid');
const UserActivity = require('../entities/UserActivity');

class ActivityService {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  /**
   * Process and store an activity from Kafka
   * @param {Object} rawActivity - Raw activity data from Kafka
   */
  async processActivity(rawActivity) {
    try {
      // Create domain entity
      const activity = new UserActivity({
       
        userId: rawActivity.userId,
        action: rawActivity.action,
        entityType: rawActivity.entityType,
        entityId: rawActivity.entityId,
        metadata: rawActivity.metadata || {}
      });

      // Validate business rules
      activity.validate();

      // Persist to MongoDB
      await this.activityRepository.create(activity);

      console.log(`Processed activity ${activity.id} for user ${activity.userId}`);
    } catch (error) {
      console.error('Failed to process activity:', error);
      // In production, add dead letter queue handling here
      throw error;
    }
  }

  /**
   * Get paginated activities with filters
   * @param {Object} options - { userId, action, skip, limit }
   */
  async getActivities({ userId, action, skip = 0, limit = 10 }) {
    const query = {};
    
    if (userId) query.userId = userId;
    if (action) query.action = action;

    return this.activityRepository.find(query, { skip, limit });
  }

  /**
   * Get activity by ID
   * @param {String} id - Activity ID
   */
  async getActivityById(id) {
    return this.activityRepository.findById(id);
  }
}

module.exports = ActivityService;