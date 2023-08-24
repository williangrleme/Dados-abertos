const mysql = require('mysql2');

const connection = mysql.createConnection({
  user: '',
  password:'',
  host: '',
  database: ''
});

try {
  connection.connect();
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error);
}

module.exports = connection;