const express = require('express');
const conexion = require('../config/db');
const rutas = express.Router();

// Ruta principal
rutas.get('/', (req, res) => {
  res.render('index');
});

// Ruta para mostrar todos los clientes
rutas.get('/clientes', (req, res) => {
  conexion.query('SELECT * FROM personas', (err, personas) => {
    if (err) {
      console.log('Existe un error en la consulta: ', err);
      return res.status(500).send('Error al obtener los clientes');
    }
    res.render('todosLosClientes', { registros: personas });
  });
});

// Ruta para ver detalles de un cliente
rutas.get('/verClientes/:id', (req, res) => {
  conexion.query('SELECT * FROM personas WHERE id = ?', [req.params.id], (err, personas) => {
    if (err) {
      console.log('Existe un error en la consulta: ', err);
      return res.status(500).send('Error al obtener la persona');
    }
    if (personas.length > 0) {
      res.render('verCliente', { persona: personas[0] });
    } else {
      res.status(404).send('No se encontró la persona');
    }
  });
});

// Ruta para eliminar un local
rutas.get('/eliminarLocal/:id', (req, res) => {
  conexion.query('DELETE FROM Locales WHERE Id = ?', [req.params.id], (err, result) => {
    if (err) {
      console.log('Error al eliminar el local: ', err);
      return res.status(500).send('Error al eliminar el local');
    }
    res.redirect('/locales');
  });
});

// Ruta para agregar un nuevo cliente
rutas.get('/agregarCliente', (req, res) => {
  res.render('formularioCliente');
});

rutas.post('/agregarCliente', (req, res) => {
  conexion.query('INSERT INTO personas SET ?', [req.body], (err, resultado) => {
    if (err) {
      console.log('Error en la instrucción SQL: ', err);
      return res.status(500).send('Error al agregar el cliente');
    }
    console.log('Registro insertado correctamente');
    res.redirect('/clientes');
  });
});

// Ruta para mostrar los locales
rutas.get('/locales', (req, res) => {
  conexion.query('SELECT * FROM Locales', (err, locales) => {
    if (err) {
      console.log('Existe un error en la consulta: ', err);
      return res.status(500).send('Error al obtener los locales');
    }
    res.render('locales', { locales: locales });
  });
});

// Ruta para mostrar el formulario de agregar local
rutas.get('/agregarLocal', (req, res) => {
  res.render('formularioLocal');
});

// Ruta para manejar la solicitud de agregar un nuevo local
rutas.post('/agregarLocal', (req, res) => {
  conexion.query('INSERT INTO Locales SET ?', [req.body], (err, resultado) => {
    if (err) {
      console.log('Error en la instrucción SQL: ', err);
      return res.status(500).send('Error al agregar el local');
    }
    console.log('Local agregado correctamente');
    res.redirect('/locales');
  });
});

// Ruta para actualizar el local
rutas.post('/actualizarLocal/:id', (req, res) => {
  const { Provincia, Ciudad, Direccion, Correo, Numero, Gerente_General, Administrador, Jefe_Recursos_Humanos } = req.body;
  conexion.query('UPDATE Locales SET Provincia = ?, Ciudad = ?, Direccion = ?, Correo = ?, Numero = ?, Gerente_General = ?, Administrador = ?, Jefe_Recursos_Humanos = ? WHERE Id = ?', 
    [Provincia, Ciudad, Direccion, Correo, Numero, Gerente_General, Administrador, Jefe_Recursos_Humanos, req.params.id], (err, result) => {
      if (err) {
        console.log('Error en la actualización: ', err);
        return res.status(500).send('Error al actualizar el local');
      }
      res.redirect('/locales');
    });
});

// Ruta para mostrar el formulario de edición de local
rutas.get('/editarLocal/:id', (req, res) => {
  conexion.query('SELECT * FROM Locales WHERE Id = ?', [req.params.id], (err, locales) => {
    if (err) {
      console.log('Error en la consulta: ', err);
      return res.status(500).send('Error al obtener el local');
    }
    if (locales.length > 0) {
      res.render('editarLocal', { local: locales[0] });
    } else {
      res.status(404).send('Local no encontrado');
    }
  });
});

// Ultima linea de codigo
module.exports = rutas;
