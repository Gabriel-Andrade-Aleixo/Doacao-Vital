const loginModels = require("../models/loginModels.js")

module.exports = {
    login,
    validarPSW
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

            res.render("index.ejs", {
                title: "Meu PI"
            });
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

