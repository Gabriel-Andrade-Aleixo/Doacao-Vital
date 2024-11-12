const loginModels = require("../models/loginModels.js")

module.exports = {
    login,
    validarPSW,
    solicitacao,
    suporte,
    hemocentro
}

function login(req, res) {
    console.log("Carregando Pagina de login")
    res.render('login.ejs', {
        title: "Login",
        mensagem: "Senha do usuário"
    })
}


function validarPSW(req, res) {
    console.log("\nController Validar Login.....")
    const m_usuario = req.body.login;
    const m_senha = req.body.senha;
    console.log("Usuário: " + m_usuario)
    console.log("Senha: " + m_senha)

    loginModels.validarPSW(m_usuario, m_senha, function (erro, result) {
        if (erro) {
            throw erro
        }
        if (result.length > 0) {
            // if (result[0].usu_apelido == m_usuario && result[0].usu_password == m_senha) {
            console.log("Dados Válidos!")
            req.session.usuario = result[0];
            res.render("intro.ejs");
        }
        else {
            console.log("Dados Inválidos!")
            res.render("login.ejs", {
                title: "Login",
                mensagem: "Dados Invalidos"
            })
        }
    })
}

function solicitacao(req, res) {
    console.log("Solicitação chegou");

    if (!req.session || !req.session.usuario) {
        console.log("Usuário não autenticado");
        return res.redirect('/');
    }

    res.render('solicitacao.ejs');
}

function suporte (req, res) {
    console.log("Sobre chegou");

    if (!req.session || !req.session.usuario) {
        console.log("Usuário não autenticado");
        return res.redirect('/');
    }

    res.render('suporte.ejs');
}

function hemocentro (req, res) {
    console.log("Hemocentro chegou");

    if (!req.session || !req.session.usuario) {
        console.log("Usuário não autenticado");
        return res.redirect('/');
    }

    res.render('emoProx.ejs');
}
