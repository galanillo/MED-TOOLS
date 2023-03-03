module.exports = function startServer() {


    //REQUIRES DE LAS LIBRERIAS DE NODE

    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const nunjucks = require('nunjucks');
    const cookieParser = require('cookie-parser');
    const path = require('path');


    //MODULOS
    const { connectToDB } = require('./bd');
    const { pool } = require('./bd');


    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.set('views', path.join(__dirname, 'public'));
    app.set('view engine', 'ejs');


  // Configura Nunjucks como el motor de plantillas para HTML
  nunjucks.configure('views', {
  autoescape: true,
  express: app
  });


  //CONTROLADORES

  const requireLogin = (req, res, next) => {
    if (req.cookies.loggedin) {
      next();
    } else {
      res.redirect('/login');
    }
  };


  //FUNCIONES POST
  
    // Buscar usuario en la base de datos para iniciar sesion
  app.post('/login', async (req, res) => {
    const { id, password } = req.body;
    try {
      const [rows, fields] = await pool.query(
        'SELECT * FROM dbmedtools.usuario WHERE nombreusuario = ? AND userpass = ?',
        [id, password]
      );
      if (rows.length === 0) {
        res.status(401).send('Credenciales inválidas');
      } else {
        console.log(
          'El usuario: ',
          rows[0] + ' ha iniciado sesion (' + console.time + ')'
        );
        res.cookie('loggedin', true, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true
        });
        res.redirect('/loggedin/inicio'); //Si lo encuentra entonces redirecciona a /loggedin/inicio
      }
    } catch (error) {
      res.status(500).send('Error al buscar usuario');
    }
  });
  
  //FUNCIONES GET

// Controlador para la página de pacientes
  app.get('/loggedin/pacientes', requireLogin, async (req, res) => {
    try {
    const [rows, fields] = await pool.query(
      'SELECT * FROM dbmedtools.paciente'
    );
    const pacientes = rows;
    res.render('pacientes', { pacientes });
    } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).send('Error al buscar pacientes');
    }
  });

  app.get('/login', function(req, res) {
    res.render('/public/login.ejs');
    });

  app.get('/contacto', function(req, res) {
      res.render('/public/login.ejs');
    });
    
    app.get('/ayuda', function(req, res) {
      res.render('/public/login.ejs');
    });  
    
    app.get('/citaonline',  function(req, res) {
      res.render('/public/login.ejs');
    });
    
    app.get('/loggedin/inicio', requireLogin, function(req, res) {
      res.render('/public/login.ejs');
    });
    
    
    app.get('/loggedin/materialmedico', requireLogin, function(req, res) {
      res.render('/public/login.ejs');
    });
    
    app.get('/loggedin/pacientes/newpaciente', requireLogin, function(req, res) {
      res.render('/public/login.ejs');
    });
    
    app.get('/loggedin/pacientes', requireLogin, function(req, res) {
      res.render('/public/login.ejs');
    });
    
    app.get('/loggedin/recetas', requireLogin, function(req, res) {
      res.render('/public/login.ejs');
    });

  //======================================================================================================================================

  
//APLICACION ESCUCHANDO EN EL PUERTO localhost:3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
};
