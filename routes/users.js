const express = require('express')
const router = express.Router()

const users = [{firstName: 'John'},{firstName: 'Paul'}]

router.get('/', (req, res) => {
    console.log(req.query.firstName) // get a query param
    res.send('Users')
})

router.get('/new', (req, res) => {
    res.render('users/new', {firstName: 'type here'})
})

router.post('/', (req, res) => {
    const isValid = true
    if (isValid) {
        console.log(req.body)
        users.push({firstName: req.body.firstName})
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log('Error')
        res.render('users/new')
    }
    res.send('hi') // this message appears only if there's nothing to show before
})

router
    .route('/:userId')
    .get((req, res) => {
        console.log(req.user)
        const userId = req.params.userId
        res.send(`Get individual userid: id: ${userId}, name: ${req.user.firstName}`)
    })
    .put((req, res) => {
        const userId = req.params.userId
        res.send(`Update individual userid: ${userId}`)
    })
    .delete((req, res) => {
        const userId = req.params.userId
        res.send(`Delete individual userid: ${userId}`)
    })

// Middleware
router.param('userId', (req, res, next, userId) => {
    req.user = users[userId]
    next()
})

module.exports = router