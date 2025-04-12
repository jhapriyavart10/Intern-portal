const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    postedDate: {
        type: Date,
        default: Date.now,
    },
    duration: {
        type: String,
        required: true,
    },
    stipend: {
        type: Number,
        required: true,
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }],
});

module.exports = mongoose.model('Internship', internshipSchema);