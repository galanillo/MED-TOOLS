const express = require('express');
const app = express();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbmedtools',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const checkDBStatus = async () => {
  console.log(`\nConectando a la base de datos...`);
  try {
    const connection = await pool.getConnection();
    console.log('\nConexión exitosa a la base de datos:\n' +
      '==========================================',
      '\n-> Name connection: ' + connection.config.host + ' -> at Port: ' + connection.config.port +
      '\n-> DBA user: ' + connection.config.user +
      '\n-> database:' + connection.config.database +
      '\n==========================================');
    connection.release();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

module.exports = { pool, checkDBStatus };




  
