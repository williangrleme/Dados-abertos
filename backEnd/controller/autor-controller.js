
const connection = require('../database');

  //Seleciona tudo
  exports.getAutorTudo = async (req, res, next) => {
    const query = ` SELECT p.numero, p.Data_de_cadastro, p.Objeto, p.Justificativa, p.Valor_Solicitado, p.MA, p.Etapa_Atual, 
                    b.Cnpj_beneficiario, b.Nome_beneficiario, b.Uf_beneficiario,
                    a.Tipo_autor, a.autor,
                    o.Nome_orgao, o.Cod_orgao, o.Nome_uo, o.Cod_uo
                    FROM processos p
                    INNER JOIN beneficiario b ON p.cnpj_beneficiario = b.cnpj_beneficiario
                    INNER JOIN autor a ON p.id_autor = a.id_autor
                    INNER JOIN orgao o ON p.id_orgao = o.id_orgao`;
  
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
  
      res.json(results);
    });
  };

  
exports.getAutor = async (req, res, next) => {
  try {
      return res.status(200).send({
          mensagem: 'GET autor'
      });
  } catch (error) {
      return res.status(500).send({ error: error });
  }
};

  exports.getAutorSearchNomes = async (req, res, next) => {
  connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM alunos", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
};


exports.getAutorFiltro = async (req, res, next) =>{
  // Obter os parâmetros do corpo da requisição

  //const autor = '';
  //const tipo_autor = 'Deputado';

  const { autor, tipo_autor } = req.body;

  let sql = 'SELECT * FROM autor';

  if (autor && tipo_autor) {
    sql += ' WHERE autor = ? AND tipo_autor = ?';
  } else if (autor) {
    sql += ' WHERE autor = ?';
  } else if (tipo_autor) {
    sql += ' WHERE tipo_autor = ?';
  }

  const params = [];

  if (autor) {
    params.push(autor);
  }

  if (tipo_autor) {
    params.push(tipo_autor);
  }

  connection.query(sql, params, (error, results, fields) => {
    if (error) {
      console.error('Erro ao executar a consulta: ' + error.stack);
      return res.status(500).json({ error: 'Erro ao executar a consulta' });
    }

    res.json(results);
  });
};
