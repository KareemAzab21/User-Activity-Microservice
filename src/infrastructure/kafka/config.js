module.exports = {
    kafkaConfig: {
      clientId: 'user-activity-service',
      brokers: process.env.KAFKA_BROKERS, // Replace with your Confluent bootstrap servers
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: process.env.KAFKA_USERNAME,      // From Confluent Cloud
        password: process.env.KAFKA_PASSWORD    // From Confluent Cloud
      },
      retry: {
        initialRetryTime: 1000,
        retries: 10
      }
    },
    topics: {
      userActivities: 'user-activity' // Your topic name in Confluent
    }
  };