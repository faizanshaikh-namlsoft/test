const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        requried: [true, 'Please add the contact name'],
    },
    email: {
        type: String,
        requried: [true, 'Please add the contact email address'],
    },
    phone: {
        type: String,
        requried: [true, 'Please add the contact phone number'],
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Contact', contactSchema);