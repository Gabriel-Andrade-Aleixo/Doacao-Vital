const adminModels = require("../models/adminModels");
const loginModels = require("../models/loginModels");

module.exports = {
    listarUsuarios,
    deletarUsuario,
    registroPSW,
    registroPSW2,
    listarFuncionario,
    deletarFuncionario,
    registroHEMO,
    registroHEMO2,
    listarHemocentro,
    deletarHemocentro,
    listarEstoque
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
            if (erro) {
                console.error("Erro ao registrar usuário:", erro);
                return res.status(500).send("Erro no servidor.");
            }

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

function listarFuncionario(req, res) {
    console.log("Controller Listar Funcionario...");
    adminModels.listarFunc(function (erro, result) {
        if (erro) {
            throw erro
        }


        else {
            console.log("Usuarios encontrados:", result);
            res.render("frm_listFunc.ejs", {
                obj_func: result
            });
        }
    });
}

function deletarFuncionario(req, res) {
    const { id_func } = req.params;

    adminModels.deletarFunc(id_func, (erro, resultado) => {
        if (erro) {
            console.error("Erro ao deletar o usuário:", erro);
            return res.status(500).send("Erro ao deletar o usuário!");
        }
        else {
            res.status(200).send("Usuario deletado!");
        }
    })
}

function registroHEMO(req, res) {
    console.log("Carregando Pagina de registro")
    res.render('registroHemo.ejs', {
        title: "Registro",
        mensagem: "Cadastrar"
    })
}

function registroHEMO2(req, res) {
    console.log("\nController Validar Registro.....")
    const n_nome = req.body.nome;
    const n_tel = req.body.tel;
    const n_bairro = req.body.bairro;
    const n_rua = req.body.rua;
    const n_num = req.body.num;
    const n_cid = req.body.cid;

    console.log("Usuário: " + n_nome)  
    console.log("Telefone: " + n_tel)
    console.log("Bairro: " + n_bairro)
    console.log("Rua: " + n_rua)
    console.log("Numero: " + n_num)
    console.log("Cidade: " + n_cid)

    adminModels.registroHEMO(
        n_nome,
        n_tel,
        n_bairro,
        n_rua,
        n_num,
        n_cid,

        function (erro, result) {
            if (erro) {
                console.error("Erro ao registrar Hemocentro:", erro);
                return res.status(500).send("Erro no servidor.");
            }

            console.log("Hemocentro registrado com sucesso!");
            res.render("registroHemo.ejs", {
                title: "Registro",
                mensagem: "Registro concluído com sucesso.",
            });
        }
    );
}

function listarHemocentro(req, res) {
    console.log("Controller Listar Hemocentro...");
    adminModels.listarHemo(function (erro, result) {
        if (erro) {
            throw erro
        }


        else {
            console.log("Usuarios encontrados:", result);
            res.render("frm_listHemo.ejs", {
                obj_hemo: result
            });
        }
    });
}

function deletarHemocentro(req, res) {
    const { id_hemocentro } = req.params;

    adminModels.deletarHemocentro(id_hemocentro, (erro, resultado) => {
        if (erro) {
            console.error("Erro ao deletar o usuário:", erro);
            return res.status(500).send("Erro ao deletar o usuário!");
        }
        else {
            res.status(200).send("Usuario deletado!");
        }
    })
}

function listarEstoque(req, res) {
    console.log("Controller Listar Hemocentro...");
    adminModels.listarESTQ(function (erro, result) {
        if (erro) {
            throw erro
        }


        else {
            console.log("Estoques encontrados:", result);
            res.render("frm_listEstoque.ejs", {
                obj_estq: result
            });
        }
    });
}

