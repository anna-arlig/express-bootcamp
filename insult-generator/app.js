const express = require('express')
const app = express()
const insults = require('./insults.json')
let newInsult = {}

app.set('view engine', 'ejs')
app.use( express.urlencoded() )

app.get('/', (req, res) => {
let randomNum = Math.floor(Math.random()*insults.insults.length)
res.render('index', {insult: insults.insults[randomNum]})
})

app.get('/severity/:severity', (req, res) => {
let temp = insults.insults.filter(insult => insult.severity == req.params.severity)
let randomNum = Math.floor(Math.random()*temp.length)
let insult = temp[randomNum]
res.render('severity', {insult: insult})
})

app.get('/insults', (req, res) => {
res.render('addnew')
})

app.post('/insults', (req, res) => {
newInsult = {
    id: Number(insults.insults.length + 1),
    insult: req.body.insult,
    play: req.body.play,
    severity: req.body.severity
}
res.redirect('/newinsult')
})

app.get('/newinsult', (req, res) => {
    res.render('newinsult', {insult: newInsult})
    insults.insults.push(newInsult)
    newInsult = {}
})

app.get('/insults/:id', (req, res) => {
    let temp = insults.insults.filter(insult => insult.id == req.params.id)
    res.render('updateinsult', {insult: temp[0]})
})

app.post(`/insults/:id`, (req, res) => {
    let temp = insults.insults.find(insult => insult.id == req.params.id)
    let index = insults.insults.indexOf(temp)
    insults.insults[index] = {
        id: Number(req.params.id),
        insult: req.body.insult,
        play: req.body.play,
        severity: req.body.severity
    }
    console.log(insults.insults)
    res.redirect('/')
})

app.listen(8000)