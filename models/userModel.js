const mongoose = require('mongoose');

// User schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required and it should be unique'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
}, 
{timestamps: true}
)

// Export

const userModel = mongoose.model('users', userSchema)
module.exports = userModel