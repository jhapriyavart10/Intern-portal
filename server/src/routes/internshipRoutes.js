const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');

// Route to create a new internship posting
router.post('/', internshipController.createInternship);

// Route to get all internships with optional filters
router.get('/', internshipController.getInternships);

// Route to get a specific internship by ID
router.get('/:id', internshipController.getInternshipById);

// Route to update an internship posting
router.put('/:id', internshipController.updateInternship);

// Route to delete an internship posting
router.delete('/:id', internshipController.deleteInternship);

module.exports = router;