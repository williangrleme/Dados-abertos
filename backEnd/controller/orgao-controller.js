const connection = require('../database');


const { promisify } = require('util');
const queryAsync = promisify(connection.query).bind(connection);

//Seleciona tudo
exports.getOrgaoPorTudo = async (req, res, next) => {
    const query = ` SELECT p.numero, p.Data_de_cadastro, p.Objeto, p.Justificativa, p.Valor_Solicitado, p.MA, p.Etapa_Atual, 
                    b.Cnpj_beneficiario, b.Nome_beneficiario, b.Uf_beneficiario,
                    a.Tipo_autor, a.Autor,
                    o.Nome_orgao, o.Cod_orgao, o.Nome_uo, o.Cod_uo
                    FROM processos p
                    INNER JOIN beneficiario b ON p.cnpj_beneficiario = b.cnpj_beneficiario
                    INNER JOIN autor a ON p.id_autor = a.id_autor
                    INNER JOIN orgao o ON p.id_orgao = o.id_orgao`;
  
                    try {
                      const results = await queryAsync(query);
                      res.json(results);
                    } catch (error) {
                      next(error);
                    }
  };

  //Seleciona orgao, quantidade orgao, valor orgao
exports.getOrgaoPorValor = async (req, res, next) => {
  const query = ` SELECT o.Nome_orgao, COUNT(p.MA), SUM(p.Valor_Solicitado)
                  FROM orgao o
                  INNER JOIN processos p ON p.id_orgao = o.id_orgao
                  GROUP BY o.Nome_orgao;`;

                  try {
                    const results = await queryAsync(query);
                    res.json(results);
                  } catch (error) {
                    next(error);
                  }
};

 //Seleciona quantidade e valor de processo por orgao
 exports.getOrgaoPorProcesso = async (req, res, next) => {
  const query = ` SELECT o.Nome_orgao AS orgao, 
                  COUNT(*) AS quantidade_processos, 
                  SUM(p.Valor_Solicitado) AS valor_total_processos
                  FROM processos p
                  INNER JOIN orgao o ON p.id_orgao = o.id_orgao
                  GROUP BY o.Nome_orgao`;

                  try {
                    const results = await queryAsync(query);
                    res.json(results);
                  } catch (error) {
                    next(error);
                  }
};