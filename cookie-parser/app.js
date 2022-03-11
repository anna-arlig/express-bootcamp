const express = require('express')
const app = express()


app.get('/', (req, res) =>{
    res.set("Set-Cookie", "test="+"hej")
    res.send("Hello")
    
    console.log(req.headers.cookie)
   
})


app.listen(8000)