
class ActivityRepository {
    constructor(activityModel) {
      this.activityModel = activityModel;
    }
  
    async create(activity) {
      const doc = new this.activityModel({
        
        userId: activity.userId,
        action: activity.action,
        metadata: activity.metadata,
        timestamp: activity.timestamp
      });
      
      return doc.save();
    }
  
    async find(query, { skip, limit, sort = { timestamp: -1 } }) {
      return this.activityModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
    }
  
    async findById(id) {
      return this.activityModel.findById(id).lean();
    }
  }
  
  module.exports = ActivityRepository;