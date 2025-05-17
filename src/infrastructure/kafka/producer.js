const { kafkaConfig, topics } = require('./config');
const { Kafka } = require('kafkajs');

class ActivityProducer {
  constructor() {
    this.kafka = new Kafka(kafkaConfig);
    this.producer = this.kafka.producer();
  }

  async connect() {
    await this.producer.connect();
    console.log('Connected to Confluent Cloud');
  }

  async sendActivity(activity) {
    await this.producer.send({
      topic: topics.userActivities, // Using configured topic name
      messages: [
        { 
          key: activity.userId, // Optional: Key for partitioning
          value: JSON.stringify(activity) 
        }
      ]
    });
  }
}

module.exports = ActivityProducer;