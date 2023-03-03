const ProgressBar = require('cli-progress').SingleBar
const express = require('express');
const app = express();
const mysql = require('mysql2');
const readline = require('readline');
const bodyParser = require('body-parser');



//JAVASCRIPT MODULAR
const startServer = require('./server.js');
const {connectToDB, checkDBStatus} = require('./bd.js');



//Funcion menú del backend que se llama justo al conectar la base de datos
const r2 = readline.createInterface(process.stdin, process.stdout);


console.clear();

  // Iniciar servidor

  checkDBStatus();
  startServer(); //Funcion incluida dentro de /js/startserver


  app.use(bodyParser.urlencoded({ extended: true }));

  //Conectar e iniciar la base de datos


  console.log('====== LOG del servidor localhost ======');

  

  //Mostramos un menu si se ha lanzado todo bien
/*

  for(;;){

    console.log('\n=====| MENÚ DE GESTIÓN DE SERVIDOR |=====');
    console.log(`\nPor favor elija una de las siguientes opciones:`);
    console.log('- 1: Reiniciar servidor');
    console.log('- 2: Apagar servidor\n');
    r2.question('>> ', (answer) => {
      switch (answer) {
        case '1':
          console.log('Reiniciando servidor...');
          // Aquí iría el código para reiniciar el servidor
  
  
          break;
        case '2':
          console.log('Apagando servidor...');
          
          app.close(() => {
            console.clear();
            console.log('Servidor apagado con exito.');
          });
          
          // Aquí iría el código para apagar el servidor
          process.exit();
          break;
        default:
          console.log('Opción inválida, por favor elija una opción válida');
          break;
      }
    });




  }

*/