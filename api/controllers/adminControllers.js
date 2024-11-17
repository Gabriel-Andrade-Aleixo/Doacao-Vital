const adminModels = require("../models/adminModels");
const loginModels = require("../models/loginModels");

module.exports = {
    listarUsuarios,
    deletarUsuario,
    registroPSW,
    registroPSW2
};

function listarUsuarios(req, res) {
    console.log("Controller Listar Usuario...");
    adminModels.listarUsuarios(function (erro, result) {
        if (erro) {
            throw erro
        }


        else {
            console.log("Usuarios encontrados:", result);
            res.render("frm_listUser.ejs", {
                obj_user: result
            });
        }
    });
}

function deletarUsuario(req, res) {
    const { id_user } = req.params;

    adminModels.deletarUsuario(id_user, (erro, resultado) => {
        if (erro) {
            console.error("Erro ao deletar o usuário:", erro);
            return res.status(500).send("Erro ao deletar o usuário!");
        }
        else {
            res.status(200).send("Usuario deletado!");
        }
    })
}

function registroPSW(req, res) {
    console.log("Carregando Pagina de registro")
    res.render('registroFunc.ejs', {
        title: "Registro",
        mensagem: "Cadastre-se"
    })
}

function registroPSW2(req, res) {
    console.log("\nController Validar Registro.....")
    const n_login = req.body.login;
    const n_email = req.body.email;
    const n_sg = req.body.sg;
    const n_tel = req.body.tel;
    const n_bairro = req.body.bairro;
    const n_rua = req.body.rua;
    const n_num = req.body.num;
    const n_cid = req.body.cid;
    const n_cpf = req.body.cpf;
    const n_senha = req.body.senha;
    const n_cargo = req.body.cargo;
    const n_nasc = req.body.nasc;
    const n_hemo = req.body.hemo;

    console.log("Usuário: " + n_login)
    console.log("Email: " + n_email)
    console.log("Sangue: " + n_sg)
    console.log("Telefone: " + n_tel)
    console.log("Bairro: " + n_bairro)
    console.log("Rua: " + n_rua)
    console.log("Numero: " + n_num)
    console.log("Cidade: " + n_cid)
    console.log("CPF: " + n_cpf)
    console.log("Senha: " + n_senha)
    console.log("Cargo: " + n_cargo)
    console.log("Nascimento: " + n_nasc)
    console.log("Hemocentro: " + n_hemo)

    adminModels.registroFUN(
        n_login,
        n_senha,
        n_email,
        n_sg,
        n_tel,
        n_bairro,
        n_rua,
        n_num,
        n_cid,
        n_cpf,
        n_cargo,
        n_nasc,
        n_hemo,

        function (erro, result) {
            // if (erro) {
            //     console.error("Erro ao registrar usuário:", erro);
            //     return res.status(500).send("Erro no servidor.");
            // }

            if (result && result.mensagem === "CPF já cadastrado") {
                console.log("CPF já existe no sistema!");
                return res.render("registroFunc.ejs", {
                    title: "Registro",
                    mensagem: "CPF já cadastrado. Por favor, use outro.",
                });
            }

            console.log("Usuário registrado com sucesso!");
            res.render("registroFunc.ejs", {
                title: "Registro",
                mensagem: "Registro concluído com sucesso.",
            });
        }
    );
}
