const express = require('express')
const app = express()

app.use( express.urlencoded({extended:true}) )


app.get('/', (req, res) => {
    let url = req.url
    let method = req.method
    console.log(url)
  console.log(method)
})

app.listen(8000)