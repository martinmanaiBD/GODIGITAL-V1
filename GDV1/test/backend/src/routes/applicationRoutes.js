const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Create a new application record
router.post('/', applicationController.createApplication);

// Get all application records
router.get('/', applicationController.getApplications);

// Get a single application record by ID
router.get('/:user', applicationController.getApplicationByUserId);

// Update the status of an application record
router.patch('/:id', applicationController.updateApplicationStatus);

// Delete an application record by ID
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
