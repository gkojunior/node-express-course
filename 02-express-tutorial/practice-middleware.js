const consoleLog = (req, res, next) => {
    console.log('LOGGED')
    next()
}

module.exports = consoleLog