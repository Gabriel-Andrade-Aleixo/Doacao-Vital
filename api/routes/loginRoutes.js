const express = require('express');

const router = express.Router();

const controllerLogin = require('../controllers/loginControllers.js');

router.get('/', controllerLogin.login);
router.post('/validar', controllerLogin.validarPSW)
// router.get('*', controllerLogin.indexNotFound);




module.exports = router

