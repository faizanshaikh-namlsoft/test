const mongoose = require('mongoose')

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('Connected to Database')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDb