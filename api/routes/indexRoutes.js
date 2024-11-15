const express = require('express');

const router = express.Router();

const controllerIndex = require('../controllers/indexControllers.js');
const controllerLogin = require('../controllers/loginControllers.js');


//rota raiz do projeto
// router.get('/', controllerIndex.indexLogin);
// router.get('/login', controllerIndex.indexLogin)

router.get('*', controllerIndex.indexNotFound);




module.exports = router

