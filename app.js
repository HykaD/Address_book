const express = require('express')
const app = express()
var path = require('path')
const bodyParser = require('body-parser'); // Підключення body-parser

var mainRouter = require('./routers/mainRouter'); 

const host = '127.0.0.1'
const port = 7000

app.use(express.static('css'))
app.set('views', path.join(__dirname, './views') )
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname, './public')))
app.use('/', mainRouter)

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
})
