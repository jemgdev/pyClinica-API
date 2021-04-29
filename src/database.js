const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('DB is connected'))
    .catch(error => console.log('Error with the db', error))

module.exports = mongoose
