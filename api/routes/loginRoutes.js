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
router.put('/doar', verificarAutenticacao, controllerLogin.doar);
router.get('/suporte', verificarAutenticacao, controllerLogin.suporte);
router.get('/emoProx', verificarAutenticacao, controllerLogin.hemocentro);
router.get('/contaUsuario', verificarAutenticacao, controllerLogin.contaUsuario);
router.post('/deletarUsuario', verificarAutenticacao, controllerLogin.deletarUsuario);

router.get('/listarUsuario', verificarAutenticacao, adminControllers.listarUsuarios);
router.delete('/listarUsuario/:id_user', verificarAutenticacao, adminControllers.deletarUsuario);
// router.get('*', controllerLogin.indexNotFound);




module.exports = router

