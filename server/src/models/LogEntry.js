const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumber = {
    type: Number,
    required: true,
};

const logEntrySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    comments: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    image: String,
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90,
    },
    longitude: {
        ...requiredNumber,
        min:-180,
        max:180,
    },
    visitDate: {
        type: Date,
        required: true,
    }
}, {
    timestamp: true,
});

// we create the actual model of mongoose so we can call 
// crud operations
const LogEntry = mongoose.model('LogEntry', logEntrySchema);
module.exports = LogEntry;