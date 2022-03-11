const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.use( express.urlencoded() )

let result = 0

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/set', (req,res) => {
    let first = Number(req.body.first)
    let second = Number(req.body.second)
    if(req.body.operator == "+"){
        result = first + second
    }else if (req.body.operator == "-"){
        result = first - second
    }
    else if (req.body.operator == "*"){
        result = first * second
    }
    else {
        result = first / second
    }
    res.set("Set-Cookie", "result="+result)
    res.redirect('/result')
  })

app.get('/result', (req, res) => {
    res.render('result', {result: result})
})


app.listen(8000)


