const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/pyclinica', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('DB is connected'))
    .catch(() => console.log('Error with the db'))

module.exports = mongoose
