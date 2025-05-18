const UserActivity = require('../entities/UserActivity');

class ActivityService {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }


  async processActivity(rawActivity) {
    try {
      
      const activity = new UserActivity({
       
        userId: rawActivity.userId,
        action: rawActivity.action,
        metadata: rawActivity.metadata || {}
      });

     
      activity.validate();


      await this.activityRepository.create(activity);

      console.log(`Processed activity ${activity.id} for user ${activity.userId}`);
    } catch (error) {
      console.error('Failed to process activity:', error);
      throw error;
    }
  }


  async getActivities({ userId, action, skip = 0, limit = 10 }) {
    const query = {};
    
    if (userId) query.userId = userId;
    if (action) query.action = action;

    return this.activityRepository.find(query, { skip, limit });
  }


  async getActivityById(id) {
    return this.activityRepository.findById(id);
  }
}

module.exports = ActivityService;