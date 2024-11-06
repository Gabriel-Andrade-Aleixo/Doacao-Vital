const express = require('express');

const router = express.Router();

const controllerRegistro = require('../controllers/registroControllers');

router.get('/', controllerRegistro.registro);
router.post('/registrar', controllerRegistro.registroPSW)
// router.get('*', controllerLogin.indexNotFound);




module.exports = router

