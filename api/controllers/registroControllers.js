const registroModels = require("../models/registroModels")

module.exports = {
    registro,
    registroPSW
}

function registro(req, res) {
    console.log("Carregando Pagina de registro")
    res.render('registro.ejs', {
        title: "Registro",
        mensagem: "Cadastre-se"
    })
}

function registroPSW(req, res) {
    console.log("\nController Validar Registro.....")
    const m_login = req.body.login;
    const m_email = req.body.email;
    const m_sg = req.body.sg;
    const m_tel = req.body.tel;
    const m_end = req.body.end;
    const m_cpf = req.body.cpf;
    const m_senha = req.body.senha;
    
    console.log("Usuário: " + m_login)
    console.log("Email: " + m_email)
    console.log("Sangue: " + m_sg)
    console.log("Telefone: " + m_tel)
    console.log("Endereco: " + m_end)
    console.log("CPF: " + m_cpf)
    console.log("Senha: " + m_senha)

    registroModels.registroPSW(m_login, m_senha, m_email, m_sg, m_tel, m_end, m_cpf, function (erro, result) {
        console.log("Entrou em registroPSW");
        if (erro) {
            throw erro
        }
        if (result.length < 1) {
            // if (result[0].usu_apelido == m_usuario && result[0].usu_password == m_senha) {
            console.log("Dados Válidos!")

            res.render("registro.ejs", {
                title: "Login"
            });
        }
        else {
            console.log("Dados Inválidos!")
            res.render("login.ejs", {
                title: "Login",
                mensagem: "Conta cadastrada"
            })
        }
    })
}

