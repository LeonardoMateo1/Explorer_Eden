const { Schema, mongoose } = require('mongoose');

const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    start: {
        type: Date,
        required: [true, "Start date is required"]
    },
    end: {
        type: Date,
        required: [true, "End date is required"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});

module.exports = mongoose.model("Trip", tripSchema)