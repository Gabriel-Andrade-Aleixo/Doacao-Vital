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

function verificarAdmin(req, res, next) {
    console.log("Verificando admin:", req.session.usuario); // Depuração
    if (req.session && req.session.funcionarios) {
        return next(); // Usuário autenticado e é administrador
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

router.get('/solicitacao', verificarAutenticacao, controllerLogin.solicitacao);
router.post('/solicitacao/:id', verificarAutenticacao, controllerLogin.doarSG);
router.post('/solcitacao/:id', verificarAutenticacao, controllerLogin.solicitarSG);

router.get('/listarUsuario', verificarAutenticacao, adminControllers.listarUsuarios);
router.delete('/listarUsuario/:id_user', verificarAutenticacao, adminControllers.deletarUsuario);
router.get('/listarFuncionario', verificarAutenticacao, adminControllers.listarFuncionario);
router.delete('/listarFuncionario/:id_func', verificarAutenticacao, adminControllers.deletarFuncionario);
router.get('/registrarFunc', verificarAutenticacao, adminControllers.registroPSW);
router.post('/registrarFunc/registro', verificarAutenticacao, adminControllers.registroPSW2);

router.get('/suporte', controllerLogin.suporte);
router.get('/emoProx', verificarAutenticacao, controllerLogin.hemocentro);

// router.get('*', controllerLogin.indexNotFound);




module.exports = router

