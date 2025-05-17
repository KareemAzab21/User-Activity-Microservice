const { kafkaConfig, topics } = require('./config');
const { Kafka } = require('kafkajs');

class ActivityConsumer {
  constructor(activityService) {
    this.kafka = new Kafka(kafkaConfig);
    this.consumer = this.kafka.consumer({ 
      groupId: 'activity-consumer-group' 
    });
    this.activityService = activityService;
  }

  async start() {
    await this.consumer.connect();
    await this.consumer.subscribe({ 
      topic: topics.userActivities,
      fromBeginning: false // Start from latest offset
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const activity = JSON.parse(message.value.toString());
        await this.activityService.processActivity(activity);
      }
    });
  }
}
module.exports = ActivityConsumer;