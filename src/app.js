require('dotenv').config();
const mongoose = require('mongoose');
const ActivityModel = require('./infrastructure/database/models/Activity');
const ActivityRepository = require('./infrastructure/database/repositories/ActivityRepository');
const ActivityService = require('./core/services/ActivityService');
const ActivityProducer = require('./infrastructure/kafka/producer');
const ActivityConsumer = require('./infrastructure/kafka/consumer');
const ActivityController = require('./interfaces/http/controllers/ActivityController');
const Server = require('./interfaces/http/server');

async function bootstrap() {
  // Database connection
  await mongoose.connect(process.env.MONGODB_URI);

  // Initialize dependencies
  const activityRepository = new ActivityRepository(ActivityModel);
  const activityService = new ActivityService(activityRepository);
  const producer = new ActivityProducer();
  await producer.connect();

  const consumer = new ActivityConsumer(activityService);
  await consumer.start();  
  
  const controller = new ActivityController(activityService, producer);
  const server = new Server(controller);

  // Start server
  await server.start();
}

bootstrap().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(1);
});