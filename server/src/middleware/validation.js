const { body, validationResult } = require('express-validator');

const validateInternshipPosting = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('role').notEmpty().withMessage('Role is required'),
    body('company').notEmpty().withMessage('Company name is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateApplication = [
    body('internshipId').notEmpty().withMessage('Internship ID is required'),
    body('applicantName').notEmpty().withMessage('Applicant name is required'),
    body('resume').notEmpty().withMessage('Resume is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateInternshipPosting,
    validateApplication
};