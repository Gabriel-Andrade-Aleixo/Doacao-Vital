const express = require('express');
const session = require('express-session');
const app = express();

const loginRoutes = require('./api/routes/loginRoutes.js');
const registroRoutes = require('./api/routes/registroRoutes.js');
// const index = require('./api/routes/index.js');

app.use(session({
    secret: 'seuSegredoAqui', // Substitua por uma chave secreta segura
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Use true se estiver em produção com HTTPS
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('views', './api/views');
app.set('view engine', 'ejs');

// Configurar diretório estático
app.use('static', express.static(__dirname + '/public'));
app.use(express.static('public'));
app.use(express.static('estilos'));
app.use(express.static('imagens'));
app.use(express.static('js'));

const port = 3000;

app.use("/", loginRoutes);
app.use("/registro", registroRoutes);


//servidor rodando
app.listen(port, () => {
    console.log(`Aplicativo Rodando na Porta ${port}`);
})


const conexao = require("./api/config/conexao.js");

module.exports = app;