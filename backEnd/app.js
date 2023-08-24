const express = require('express');
const cors = require('cors');
const app = express();

const rotaProcesso = require('./routes/processo-routes');
const rotaAutor = require('./routes/autor-routes');
const rotaBeneficiario = require('./routes/beneficiario-routes');
const rotaOrgao = require('./routes/orgao-routes');

app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/processo', rotaProcesso);
app.use('/beneficiario', rotaBeneficiario);
app.use('/autor', rotaAutor);
app.use('/orgao', rotaOrgao);

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});


module.exports = app;