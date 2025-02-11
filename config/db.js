//Requerimos la libreria de mysql2
const mysql = require('mysql2')
//Crear una conexion (parámetros)
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'gestionempresa'
})
//Realizamos la conexion a la base de datos
conexion.connect((err) => {
    if (err) {
        console.log(`Error al conectar a la BDD ${err}`)
    } else {
        console.log('Conexion Exitosa!!!')
    }
})
module.exports = conexion