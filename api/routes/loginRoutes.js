const express = require('express');

const router = express.Router();

const controllerLogin = require('../controllers/loginControllers.js');
const adminControllers = require('../controllers/adminControllers.js');
const loginModels = require('../models/loginModels.js')

function verificarAutenticacao(req, res, next) {
    if (req.session && req.session.usuario) {
        return next();
    } else {
        res.redirect('/');
    }
}

// if (req.session && req.session.usuario && req.session.usuario.tipo === 'admin') {
//     return next();
// } else {
//     console.log("Acesso negado. Redirecionando para login.");
//     res.redirect('/');
// }


// function verificarAdmin(req, res, next) {
//     if (req.session && req.session.usuario && req.session.usuario.tipo === 'admin') {
//         return next();
//     } else {
//         res.redirect('/');
//     }
// }

router.get('/', controllerLogin.login);
router.post('/validar', controllerLogin.validarPSW)

router.get('/contaUsuario', verificarAutenticacao, controllerLogin.contaUsuario);
router.post('/deletarUsuario', verificarAutenticacao, controllerLogin.deletarUsuario);
router.get('/sairConta', verificarAutenticacao, controllerLogin.sairConta);
router.get('/estoque', verificarAutenticacao, controllerLogin.listarEstoque);
router.get('/estoqueAdmin', verificarAutenticacao, adminControllers.listarEstoque);
router.post('/alterarConta', verificarAutenticacao, controllerLogin.alterarConta);


router.get('/solicitacao', verificarAutenticacao, controllerLogin.solicitacao);
router.post('/solicitacao/:id', verificarAutenticacao, controllerLogin.doarSG);
router.post('/solcitacao/:id', verificarAutenticacao, controllerLogin.solicitarSG);

router.get('/listarUsuario', verificarAutenticacao, adminControllers.listarUsuarios);
router.delete('/listarUsuario/:id_user', verificarAutenticacao, adminControllers.deletarUsuario);

router.get('/listarFuncionario', verificarAutenticacao, adminControllers.listarFuncionario);
router.delete('/listarFuncionario/:id_func', verificarAutenticacao, adminControllers.deletarFuncionario);

router.get('/registrarFunc', verificarAutenticacao, adminControllers.registroPSW);
router.post('/registrarFunc/registro', verificarAutenticacao, adminControllers.registroPSW2);

router.get('/registrarHemo', verificarAutenticacao, adminControllers.registroHEMO);
router.post('/registrarHemo/registro', verificarAutenticacao, adminControllers.registroHEMO2);

router.get('/listarEstoque/admin', verificarAutenticacao, adminControllers.listarEstoque);
router.get('/listarEstoque', verificarAutenticacao, controllerLogin.listarEstoque);

router.get('/listarHemocentro', verificarAutenticacao, adminControllers.listarHemocentro);
router.delete('/listarHemocentro/:id_hemocentro', verificarAutenticacao, adminControllers.deletarHemocentro);

router.get('/suporte', controllerLogin.suporte);
router.get('/emoProx', verificarAutenticacao, controllerLogin.hemocentro);

// router.get('*', controllerLogin.indexNotFound);

module.exports = router

