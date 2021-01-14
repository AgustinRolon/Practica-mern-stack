const {Schema, model} = require('mongoose');

const userschema = new Schema ({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamp: true
})

module.exports = model('User', userschema);