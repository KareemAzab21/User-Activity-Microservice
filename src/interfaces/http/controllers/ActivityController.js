class ActivityController {
  constructor(activityService, producer) {
    this.activityService = activityService;
    this.producer = producer;
  }

  async logActivity(req, res, next) {
    try {
      const activity = req.body;
      await this.producer.sendActivity(activity);
     
      res.status(202).json({ 
        message: 'Activity received for processing',
        activityId: activity.id 
      });
    } catch (err) {
      next(err); // Pass to error handler
    }
  }

  async getActivities(req, res, next) {
    try {
      const { userId, action, page = 1, limit = 10 } = req.query;
      const result = await this.activityService.getActivities({
        userId,
        action,
        skip: (page - 1) * limit,
        limit: parseInt(limit)
      });
      res.json({
        data: result,
        page: parseInt(page),
        limit: parseInt(limit)
      });
    } catch (err) {
      next(err);
    }
  }

  async getActivityById(req, res, next) {
    try {
      const activity = await this.activityService.getActivityById(req.params.id);
      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }
      res.json(activity);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ActivityController;