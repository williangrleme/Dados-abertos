const express = require('express');
const router = express.Router();

const AutorController = require('../controller/autor-controller');

router.get('/AutorTudo', AutorController.getAutorTudo);
router.get('/', AutorController.getAutor);
router.get('/AutorPorEstado', AutorController.getAutorTudo);
router.get('/AutorFiltro', AutorController.getAutorFiltro);
module.exports = router;