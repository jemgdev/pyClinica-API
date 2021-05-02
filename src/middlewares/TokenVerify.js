const Patient = require('../models/Patient')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    const token = req.headers['x-access-token']

    if (!token) {

        res.status(401).json({
            status: false,
            message: 'No token provided'
        })
    }
    else {

        try {

            const decoded = await jwt.verify(token, process.env.SECRET_KEY)

            const patientFound = await Patient.findById(decoded.id)

            if (!patientFound) {

                res.status(401).json({
                    status: false,
                    message: 'No user found'
                })
            }
            else {

                req.id = decoded.id

                next()
            }
            
        } catch (error) {
            
            res.status(401).json({
                status: false,
                message: 'Token is not valid'
            })
        }
    }
}

