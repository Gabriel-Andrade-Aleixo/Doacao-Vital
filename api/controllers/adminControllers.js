const adminModels = require("../models/adminModels");

module.exports = {
    listarUsuarios,
    deletarUsuario
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


