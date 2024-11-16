const loginModels = require("../models/loginModels.js")

module.exports = {
    login,
    validarPSW,
    solicitacao,
    suporte,
    hemocentro,
    contaUsuario,
    deletarUsuario,
    doarSG,
    solicitarSG,
    sairConta
}

function login(req, res) {
    console.log("Carregando Pagina de login")
    res.render('login.ejs', {
        title: "Login",
        mensagem: "Senha do usuário"
    })
}


function validarPSW(req, res) {
    console.log("\nController Validar Login.....");
    const m_usuario = req.body.login;
    const m_senha = req.body.senha;
    console.log("Usuário: " + m_usuario);
    console.log("Senha: " + m_senha);

    loginModels.validarPSW(m_usuario, m_senha, function (erro, result) {
        if (erro) {
            console.error("Erro ao validar login:", erro);
            return res.render("login.ejs", {
                title: "Login",
                mensagem: "Erro no sistema. Tente novamente mais tarde."
            });
        }

        if (result) {
            console.log("Dados Válidos!");
            console.log("O usuário é:" + result.tipo)

            req.session.usuario = result.usuario;

            if (result.tipo === 'admin') {
                res.render("introAdmin.ejs");
            } else {
                res.render("intro.ejs");
            }
        } else {
            console.log("Dados Inválidos!");
            res.render("login.ejs", {
                title: "Login",
                mensagem: "Dados Inválidos"
            });
        }
    });
}

function solicitacao(req, res) {
    console.log("Solicitação chegou");

    if (!req.session || !req.session.usuario) {
        console.log("Usuário não autenticado");
        return res.redirect('/');
    }

    // res.render('solicitacao.ejs');

    const usuarioCpf = req.session.usuario.cpf_user;
    loginModels.getUsuarioByCPF(usuarioCpf, (erro, usuario) => {
        if (erro) {
            console.error("Erro ao buscar usuário:", erro);
            return res.redirect('/');
        }

        res.render('solicitacao.ejs', {
            cpf: usuario.cpf_user,
            mensagem: "Doar ou receber"
        });
    });
}

function suporte(req, res) {
    console.log("Sobre chegou");

    if (!req.session || !req.session.usuario) {
        console.log("Usuário não autenticado");
        return res.redirect('/');
    }

    res.render('suporte.ejs');
}

function hemocentro(req, res) {
    console.log("Hemocentro chegou");

    if (!req.session || !req.session.usuario) {
        console.log("Usuário não autenticado");
        return res.redirect('/');
    }

    res.render('emoProx.ejs');
}

function contaUsuario(req, res) {
    console.log("Conta de Usuário chegou");

    if (!req.session || !req.session.usuario) {
        console.log("Usuário não autenticado");
        return res.redirect('/');
    }

    const usuarioCpf = req.session.usuario.cpf_user;
    loginModels.getUsuarioById(usuarioCpf, (erro, usuario) => {
        if (erro) {
            console.error("Erro ao buscar o usuário:", erro);
            return res.redirect('/');
        }

        res.render('conta.ejs', {
            title: usuario.nome_user
        });
    });
}

function deletarUsuario(req, res) {
    if (!req.session || !req.session.usuario) {
        console.log("Usuário não autenticado");
        return res.redirect('/');
    }

    const usuarioCpf = req.session.usuario.cpf_user;

    loginModels.deletarUsuario(usuarioCpf, (erro, resultado) => {
        if (erro) {
            console.error("Erro ao deletar o usuário:", erro);
            return res.redirect('/conta');
        }

        req.session.destroy((err) => {
            if (err) {
                console.error("Erro ao encerrar a sessão:", err);
            }
            res.redirect('/');
        });
    });
}

function sairConta(req, res){
    req.session.destroy((err) => {
        if (err) {
            console.error("Erro ao encerrar a sessão:", err);
            return res.redirect('/');
        }
        res.redirect('/');
    });

}

function doarSG(req, res) {
    console.log("Rota Doar chegou");

    const m_cpf = req.body.CPFsol;
    const m_quant = req.body.quantSG;

    loginModels.registrarDoacao(m_cpf, m_quant, (erro, resultados) => {
        if (erro) {
            console.error("Erro:", erro);
            return res.render('solicitacao.ejs', {
                mensagem: "Erro ao registrar a doação"
            });
        } else {
            console.log("Doação registrada com sucesso:", resultados);

            res.render('solicitacao.ejs', {
                cpf: req.session.usuario.cpf_user,
                mensagem: "Doação registrada com sucesso"
            });
        }
    });
}

function solicitarSG(req, res) {
    console.log("Rota Doar chegou");

    const m_cpf = req.body.CPFsol;
    const m_quant = req.body.quantSG;

    loginModels.registrarSolicitacao(m_cpf, m_quant, (erro, resultados) => {
        if (erro) {
            console.error("Erro:", erro);
        } else {
            console.log("Solicitação registrada com sucesso:", resultados);
            res.render('solicitacao.ejs', {
                cpf: req.session.usuario.cpf_user,
                mensagem: "Solicitado com sucesso"
            })
        }
    });

}
