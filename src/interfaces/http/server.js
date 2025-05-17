const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');

class Server {
  constructor(activityController) {
    this.app = express();
    this.activityController = activityController;
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddleware() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('combined'));
    this.app.use(express.json());
  }

  setupRoutes() {
    const activityRoutes = require('./routes/activityRoutes');
    this.app.use('/api/activities', activityRoutes(this.activityController));
    
    // Health check endpoint
    this.app.get('/health', (req, res) => res.json({ status: 'ok' }));
  }

  setupErrorHandling() {
    // 404 handler
    this.app.use((req, res, next) => {
      next(createError(404, 'Not found'));
    });

    // Global error handler
    this.app.use((err, req, res, next) => {
      res.status(err.status || 500).json({
        error: {
          message: err.message,
          status: err.status || 500
        }
      });
    });
  }

  start(port = process.env.PORT || 3000) {
    return new Promise((resolve) => {
      const server = this.app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        resolve(server);
      });
    });
  }
}

module.exports = Server;