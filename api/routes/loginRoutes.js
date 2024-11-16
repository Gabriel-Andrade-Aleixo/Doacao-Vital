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

// function verificarAdmin(req, res, next) {
//     req.session.usuario = result.usuario;

//     if (result.tipo === 'admin') {
//         return next();
//     } else {
//         res.status(403).send("Acesso negado. Permissões insuficientes.");
//         res.redirect('/');
//     }
// }

function verificarAdmin(req, res, next) {
    if (req.session && req.session.usuario && req.session.usuario.tipo === 'admin') {
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
router.post('/solcitacao/:id', verificarAutenticacao, controllerLogin.solicitarSG);

router.get('/listarUsuario', verificarAdmin, adminControllers.listarUsuarios);
router.delete('/listarUsuario/:id_user', verificarAdmin, adminControllers.deletarUsuario);

router.get('/suporte', controllerLogin.suporte);
router.get('/emoProx', verificarAutenticacao, controllerLogin.hemocentro);

// router.get('*', controllerLogin.indexNotFound);




module.exports = router

