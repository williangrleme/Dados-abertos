const express = require('express');
const router = express.Router();

const BeneficiarioController = require('../controller/beneficiario-controller');

router.get('/BeneficiarioTudo', BeneficiarioController.getBeneficiarioTudo);

module.exports = router;