const express = require('express');

const router = express.Router();

const controllerLogin = require('../controllers/loginControllers.js');
const adminControllers = require('../controllers/adminControllers.js');

function verificarAutenticacao(req, res, next) {
    if (req.session && req.session.usuario) {
        return next();
    } else {
        res.redirect('/');
    }
}

router.get('/', controllerLogin.login);
router.post('/validar', controllerLogin.validarPSW)
router.get('/solicitacao', verificarAutenticacao, controllerLogin.solicitacao);
router.get('/suporte', verificarAutenticacao, controllerLogin.suporte);
router.get('/emoProx', verificarAutenticacao, controllerLogin.hemocentro);
router.get('/contaUsuario', verificarAutenticacao, controllerLogin.contaUsuario);
router.post('/deletarUsuario', verificarAutenticacao, controllerLogin.deletarUsuario);
router.post('/listarUsuario', adminControllers.listarUsuarios);
// router.get('*', controllerLogin.indexNotFound);




module.exports = router

