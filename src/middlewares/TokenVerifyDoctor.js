const Doctor = require('../models/Doctor')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    const token = req.headers['x-access-token']

    if (!token) {

        res.status(404).json({
            message: 'Token has not been found'
        })

    } else {

        try {
            const tokenFound = await jwt.verify(token, process.env.SECRET_KEY)

            const doctorFound = await Doctor.findById(tokenFound.id)

            if (!doctorFound) {
                res.status(404).json({
                    message: 'Doctor has not been found'
                })
            } else {

                req.id = tokenFound.id

                next()
            }
        } catch (error) {
            res.status(404).json({
                error
            })
        }
    }
}