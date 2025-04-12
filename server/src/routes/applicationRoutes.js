const express = require('express');
const { submitApplication, getApplicationsByInternship } = require('../controllers/applicationController');
const router = express.Router();

// Route to submit a new application
router.post('/submit', submitApplication);

// Route to get applications for a specific internship
router.get('/internship/:id', getApplicationsByInternship);

module.exports = router;