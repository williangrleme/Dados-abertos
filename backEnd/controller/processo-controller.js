const connection = require('../database');


exports.getProcessos = async (req, res, next) => {
    try {
        return res.status(200).send({
            mensagem: 'GET Processo'
        });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

const { promisify } = require('util');
const queryAsync = promisify(connection.query).bind(connection);

//Seleciona tudo
exports.getProcessoTudo = async (req, res, next) => {
    const query = ` SELECT p.numero, YEAR(p.Data_de_cadastro) as Ano, Month(p.Data_de_cadastro) as Mês, p.Objeto, p.Justificativa, p.Valor_Solicitado, p.MA, p.Etapa_Atual, 
                    b.Cnpj_beneficiario, b.Nome_beneficiario, b.Uf_beneficiario,
                    a.Tipo_autor, a.autor As autor,
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

//Seleciona todos os ATRIBUTOS do PROCESSo e cnpj nome e uf do beneficiario
exports.getProcessoPorBeneficiario = async (req, res, next) => {
    const query = ` SELECT p.numero, p.Data_de_cadastro, p.Objeto, p.Justificativa, p.Valor_Solicitado, p.MA, p.Etapa_Atual, 
                    b.Cnpj_beneficiario, b.Nome_beneficiario, b.Uf_beneficiario,
                    a.Tipo_autor, a.autor,
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

  //Seleciona quantidade e valor de PROCESSO por ESTADO separado pela UF do beneficiario
exports.getProcessoPorEstado = async (req, res, next) => {
    const query = ` SELECT b.Uf_beneficiario AS estado, 
                    COUNT(*) AS quantidade_processos, 
                    SUM(p.Valor_Solicitado) AS valor_total_processos
                    FROM processos p
                    INNER JOIN beneficiario b ON p.cnpj_beneficiario = b.cnpj_beneficiario
                    GROUP BY b.Uf_beneficiario`;
  
                    try {
                      const results = await queryAsync(query);
                      res.json(results);
                    } catch (error) {
                      next(error);
                    }
  };

  // RESUMO QUANTIDADE EMENDA VALOR TOTAL QUANTIDADE DE ESTADOS

    //Seleciona quantidade e valor de PROCESSO por orgao separado pela NOME DO orgao
exports.getProcessoPorOrgao = async (req, res, next) => {
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

   //Seleciona quantidade e valor de PROCESSO por autor
exports.getProcessoPorAutor = async (req, res, next) => {
    const query = ` SELECT a.autor AS autor, 
                    COUNT(*) AS quantidade_processos, 
                    SUM(p.Valor_Solicitado) AS valor_total_processos
                    FROM processos p
                    INNER JOIN autor a ON p.id_autor = a.id_autor
                    GROUP BY a.autor`;
  
                    try {
                      const results = await queryAsync(query);
                      res.json(results);
                    } catch (error) {
                      next(error);
                    }
  };



//Seleciona quantidade e valor de PROCESSO por Ano
  exports.getProcessoPorAno = async (req, res, next) => {
    const query = ` SELECT YEAR(Data_de_cadastro) AS ano, 
                    COUNT(*) AS quantidade_processos, 
                    SUM(Valor_Solicitado) AS valor_total_processos
                    FROM processos
                    GROUP BY YEAR(Data_de_cadastro)`;
  
                    try {
                      const results = await queryAsync(query);
                      res.json(results);
                    } catch (error) {
                      next(error);
                    }
  };

  //Seleciona quantidade e valor de processo por Estado e autor
  exports.getProcessoPorEstadoAutor = async (req, res, next) => {
    const query = ` SELECT beneficiario.Uf_beneficiario AS Estado, autor.autor as autors, 
                    COUNT(processos.Numero) AS quantidade_processos, 
                    SUM(processos.Valor_Solicitado) AS valor_total_processos
                    FROM processos
                    INNER JOIN beneficiario ON processos.cnpj_beneficiario = beneficiario.cnpj_beneficiario
                    INNER JOIN autor ON processos.id_autor = autor.id_autor
                    WHERE beneficiario.Uf_beneficiario IS NOT NULL AND autor.autor IS NOT NULL
                    GROUP BY beneficiario.Uf_beneficiario, autor.autor`;
                   
                    try {
                      const results = await queryAsync(query);
                      res.json(results);
                    } catch (error) {
                      next(error);
                    }
  };

  //Seleciona quantidade e valor de processo por autor e Ano
exports.getProcessoPorAutorAno = async (req, res, next) => {
  const query = ` SELECT autor.autor As autor, YEAR(processos.Data_de_cadastro) AS Ano, 
                  COUNT(processos.Numero) AS quantidade_processos, 
                  SUM(processos.Valor_Solicitado) AS valor_total_processos
                  FROM processos
                  INNER JOIN autor ON autor.id_autor = processos.id_autor
                  GROUP BY autor.autor, YEAR(processos.Data_de_cadastro)
                  ORDER BY autor.autor, YEAR(processos.Data_de_cadastro)`;

                  try {
                    const results = await queryAsync(query);
                    res.json(results);
                  } catch (error) {
                    next(error);
                  }
};

 //Seleciona quantidade de emenda, valor total e quantidade de estados 
 exports.getProcessoPorResumo = async (req, res, next) => {
  const query = ` SELECT COUNT(p.Numero) AS quantidade_processos, 
                  SUM(p.Valor_Solicitado) AS valor_total_processos, 
                  COUNT(DISTINCT b.Nome_beneficiario) AS quantidade_beneficiarios,
                  COUNT(DISTINCT b.Uf_beneficiario) AS quantidade_estados,
                  COUNT(DISTINCT a.autor) AS quantidade_autores,
                  COUNT(DISTINCT o.nome_orgao) AS quantidade_orgao,
                  COUNT(DISTINCT YEAR(p.Data_de_cadastro)) AS Anos,
                  MAX(p.Valor_Solicitado) AS maior_valor,
                  MIN(p.Valor_Solicitado) AS menor_valor
                  FROM processos p
                  INNER JOIN beneficiario b ON p.cnpj_beneficiario = b.cnpj_beneficiario
                  INNER JOIN autor a ON p.id_autor = a.id_autor
                  INNER JOIN orgao o ON p.id_orgao = o.id_orgao;`;

                  try {
                    const results = await queryAsync(query);
                    res.json(results);
                  } catch (error) {
                    next(error);
                  }
};


  


