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

router.get('/contaUsuario', verificarAutenticacao, controllerLogin.contaUsuario);
router.post('/deletarUsuario', verificarAutenticacao, controllerLogin.deletarUsuario);

router.get('/solicitacao', verificarAutenticacao, controllerLogin.solicitacao);
router.post('/solicitacao/:id', verificarAutenticacao, controllerLogin.doarSG);

router.get('/listarUsuario', verificarAutenticacao, adminControllers.listarUsuarios);
router.delete('/listarUsuario/:id_user', verificarAutenticacao, adminControllers.deletarUsuario);

router.get('/suporte', controllerLogin.suporte);
router.get('/emoProx', verificarAutenticacao, controllerLogin.hemocentro);

// router.get('*', controllerLogin.indexNotFound);




module.exports = router

