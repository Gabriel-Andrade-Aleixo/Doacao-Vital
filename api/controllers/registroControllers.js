const registroModels = require("../models/registroModels")

module.exports = {
    registro,
    registroPSW,
}

function registro(req, res) {
    console.log("Carregando Pagina de registro")
    res.render('registro.ejs', {
        title: "Registro",
        mensagem: "Cadastre-se"
    })
}

function registroPSW(req, res) {
    console.log("\nController Validar Registro.....");
    const m_login = req.body.login;
    const m_email = req.body.email;
    const m_sg = req.body.sg;
    const m_tel = req.body.tel;
    const m_bairro = req.body.bairro;
    const m_rua = req.body.rua;
    const m_num = req.body.num;
    const m_cid = req.body.cid;
    const m_cpf = req.body.cpf;
    const m_senha = req.body.senha;

    console.log("Usuário: " + m_login);
    console.log("Email: " + m_email);
    console.log("Sangue: " + m_sg);
    console.log("Telefone: " + m_tel);
    console.log("Bairro: " + m_bairro);
    console.log("Rua: " + m_rua);
    console.log("Numero: " + m_num);
    console.log("Cidade: " + m_cid);
    console.log("CPF: " + m_cpf);
    console.log("Senha: " + m_senha);

    registroModels.registroPSW(
        m_login,
        m_senha,
        m_email,
        m_sg,
        m_tel,
        m_bairro,
        m_rua,
        m_num,
        m_cid,
        m_cpf,
        function (erro, result) {
            if (erro) {
                console.error("Erro ao registrar usuário:", erro);
                return res.status(500).send("Erro no servidor.");
            }

            if (result && result.mensagem === "CPF já cadastrado") {
                console.log("CPF já existe no sistema!");
                return res.render("registro.ejs", {
                    title: "Registro",
                    mensagem: "CPF já cadastrado. Por favor, use outro.",
                });
            }

            console.log("Usuário registrado com sucesso!");
            res.render("registro.ejs", {
                title: "Registro",
                mensagem: "Registro concluído com sucesso.",
            });
        }
    );
}
