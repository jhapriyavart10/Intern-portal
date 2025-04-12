const Application = require('../models/Application');

// Submit a new application
exports.submitApplication = async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
        res.status(400).json({ message: 'Error submitting application', error });
    }
};

// Get all applications for a specific internship
exports.getApplicationsByInternship = async (req, res) => {
    try {
        const applications = await Application.find({ internshipId: req.params.internshipId });
        res.status(200).json(applications);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving applications', error });
    }
};

// Get all applications submitted by a specific user
exports.getApplicationsByUser = async (req, res) => {
    try {
        const applications = await Application.find({ userId: req.user.id });
        res.status(200).json(applications);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving applications', error });
    }
};