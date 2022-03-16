const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
let messages = []

app.set('view engine', 'ejs')
app.use( express.urlencoded() )
app.use(cookieParser())

app.get('/', (req, res) => {
res.render('index')
})

app.post('/setname', (req, res) => {
res.set("Set-Cookie", "username="+req.body.username)
res.redirect('/chat')
})

app.get('/chat', (req, res) => {
res.render('chat', {user: req.cookies.username, messages})
})

app.post('/messages', (req, res) => {

    let message = {
        author: req.cookies.username,
        content: req.body.message,
        timestamp: new Date(Date.now())
    }
    messages.push(message)
    res.redirect('/chat')
})

app.get('/messages', (req, res) => {

})

app.get('/messages?after=TIME_STAMP', (req, res) =>{

})


app.listen(8000)