const express = require('express')
const app = express()
const userRouter = require('./routes/users')

app.set('view engine', 'ejs')

app.use(logger) // Middleware line insert to get it executed before all the urls

app.use(express.static('public')) // Express Middleware that uses folders and files as routes e.g. /main or e.g. /second/sec.html

app.use(express.urlencoded({ extended: true })) // This middleware let form to get req.body information

app.get('/', anotherMessageMiddleware, messageMiddleware, (req, res) => { // anotherMessageMiddleware and messageMiddleware are only called in this route
    res.render('index', { texts: 'world'})
})

app.use('/users', userRouter)

// Middlewares:

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

function messageMiddleware(req, res, next) {
    console.log('middlewareMessage')
    next()
}

function anotherMessageMiddleware(req, res, next) {
    console.log('this message first')
    next()
}

app.listen(3000)
