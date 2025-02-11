//Requerir la libreria o modulo de express
const express = require('express')

const rutas = require('./router/router')

//Para crear una instancia de la aplicacion
const app = express()
//Definicion de un puerto a utilizar
const port = 4000

//Middlewares
//app.use(rutas)
app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(rutas)

//Para leventar el servidor WEB
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
