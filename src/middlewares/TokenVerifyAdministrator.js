const Administrator = require('../models/Administrator')
const jwt = require('jsonwebtoken')


//Middleware del token del Administrador
module.exports = async (req, res, next) => {

    const token = req.headers['x-access-token']

    if (!token) {

        res.status(404).json({
            message: 'Token has not been found'
        })

    } else {

        try {
            const tokenFound = await jwt.verify(token, process.env.SECRET_KEY)

            const administratorFound = await Administrator.findById(tokenFound.id)

            if (!administratorFound) {
                res.status(404).json({
                    status: false,
                    message: 'Administrador has not been found'
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