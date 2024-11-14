// loginControllers.js ou adminControllers.js (dependendo de onde você estiver)
const adminModels = require("../models/adminModels");

module.exports = {
    listarUsuarios
};

function listarUsuarios(req, res) {
    console.log("Controller Listar Usuario...");
    adminModels.listarUsuarios(function(erro, result) {
        if (erro) {
            throw erro
        }

        
        else{
            console.log("Usuarios encontrados:", result);
            res.render("frm_listUser.ejs", {
                obj_user: result
            });
        }
    });
}
