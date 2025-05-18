const { kafkaConfig, topics } = require('./config');
const { Kafka } = require('kafkajs');

class ActivityConsumer {
  constructor(activityService) {
    this.kafka = new Kafka(kafkaConfig);
    this.consumer = this.kafka.consumer({ 
      groupId: 'activity-consumer-group-TEST'
    });
    this.activityService = activityService;
  }

  async start() {
    await this.consumer.connect();
    console.log('✅ Consumer connected to Kafka');
    await this.consumer.subscribe({ 
      topic: topics.userActivities,
      fromBeginning: false // Start from latest offset
    });
    console.log('✅ Subscribed to topic: userActivities');


    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const raw = message.value.toString();
        console.log('📩 Received message:', raw);
    
        const activity = JSON.parse(raw);
        await this.activityService.processActivity(activity);
      }
    });
    
  }
}
module.exports = ActivityConsumer;