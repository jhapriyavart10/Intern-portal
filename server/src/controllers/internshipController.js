const Internship = require('../models/Internship');

// Create a new internship posting
exports.createInternship = async (req, res) => {
    try {
        const internship = new Internship(req.body);
        await internship.save();
        res.status(201).json(internship);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all internships with optional filters
exports.getInternships = async (req, res) => {
    try {
        const { location, role } = req.query;
        const filter = {};
        if (location) filter.location = location;
        if (role) filter.role = role;

        const internships = await Internship.find(filter).sort({ createdAt: -1 });
        res.status(200).json(internships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single internship by ID
exports.getInternshipById = async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);
        if (!internship) return res.status(404).json({ message: 'Internship not found' });
        res.status(200).json(internship);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateInternship = async (req, res) => {
    try {
        const internship = await Internship.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }
        
        res.status(200).json(internship);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an internship posting
exports.deleteInternship = async (req, res) => {
    try {
        const internship = await Internship.findByIdAndDelete(req.params.id);
        if (!internship) return res.status(404).json({ message: 'Internship not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};