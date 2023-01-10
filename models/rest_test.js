const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('restTester', newSchema)