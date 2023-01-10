const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    name: {
        type: String,
                required: true,
    },
    surname: {
        type: String,
                required: true,
    },
    dateJoined: {
        type: Date,
                default: Date.now,
    },
    premium: {
        type: Boolean,
                required: true,
                default: false,
    }

})

module.exports = mongoose.model('userModel', newSchema)