const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');


module.exports = (activityController) => {
  /**
   * @swagger
   * /activities:
   *   post:
   *     summary: Log a new user activity
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [userId, action]
   *             properties:
   *               userId:
   *                 type: string
   *               action:
   *                 type: string
   *               entityType:
   *                 type: string
   *               entityId:
   *                 type: string
   *               metadata:
   *                 type: object
   */
  router.post(
    '/',
    [
      body('userId').trim().notEmpty().withMessage('User ID is required'),
      body('action').trim().notEmpty().withMessage('Action is required'),
      body('entityType').optional().trim(),
      body('entityId').optional().trim(),
      body('metadata').optional().isObject()
    ],

    activityController.logActivity.bind(activityController)
  );

  /**
   * @swagger
   * /activities:
   *   get:
   *     summary: Get paginated activities
   *     parameters:
   *       - in: query
   *         name: userId
   *         schema:
   *           type: string
   *       - in: query
   *         name: action
   *         schema:
   *           type: string
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   */
  router.get(
    '/',
    [
      query('page').optional().isInt({ min: 1 }).toInt(),
      query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
      query('userId').optional().trim(),
      query('action').optional().trim()
    ],

    activityController.getActivities.bind(activityController)
  );

  /**
   * @swagger
   * /activities/{id}:
   *   get:
   *     summary: Get activity by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   */
  router.get(
    '/:id',
    [
      param('id').trim().notEmpty().withMessage('Activity ID is required')
    ],

    activityController.getActivityById.bind(activityController)
  );

  return router;
};