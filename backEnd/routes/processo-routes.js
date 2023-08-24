const express = require('express');
const router = express.Router();

const ProcessoController = require('../controller/processo-controller');

router.get('/', ProcessoController.getProcessos);
router.get('/processoTudo', ProcessoController.getProcessoTudo);
router.get('/processoPorOrgao', ProcessoController.getProcessoPorOrgao);
router.get('/processoPorEstado', ProcessoController.getProcessoPorEstado);
router.get('/processoPorAno', ProcessoController.getProcessoPorAno);
router.get('/processoPorAutor', ProcessoController.getProcessoPorAutor);
router.get('/processoPorEstadoAutor', ProcessoController.getProcessoPorEstadoAutor);
router.get('/processoPorAutorAno', ProcessoController.getProcessoPorAutorAno);
router.get('/processoResumo', ProcessoController.getProcessoPorResumo);

module.exports = router;