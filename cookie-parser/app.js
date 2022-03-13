const express = require('express')
const app = express()

app.set('view engine', 'ejs')

function cookieParser(req,res,next){
    if(!req.headers.cookie){ next() }
    else{
        const cookieHeader = req.headers.cookie
        let cookieStrings = cookieHeader.split("; ")
        cookieStrings = cookieStrings.map(string => string.split('='))
        const body = {}
        for(let field of cookieStrings){
            const [key, value] = [field[0], field[1]]
            body[key] = value 
          }
        req.cookies = body
        console.log(req.cookies)
  
        next()
    }

  }
  
  app.use(cookieParser)


app.get('/', (req, res) =>{

  res.render('index', {test: req.cookies})
   
})

app.get('/about', (req, res) =>{
    res.render('about', {test: req.cookies})
  
})


app.listen(8000)