const conexao = require("../config/conexao")
console.log("acessando models login")

module.exports = {
    validarPSW,
    getUsuarioById,
    deletarUsuario
}

function validarPSW(p_login, p_senha, callback) {
    const m_sql = `SELECT * FROM Usuario WHERE cpf_user = "${p_login}" AND senha_user = "${p_senha}"`;
    console.log("SQL: " + m_sql);
    conexao.query(m_sql, callback);
}

function getUsuarioById(cpf_user, callback) {
    const query = `SELECT nome_user FROM Usuario WHERE cpf_user = "${cpf_user}"`;
    console.log("SQL: " + query);
    conexao.query(query, (erro, result) => {
        if (erro) {
            return callback(erro, null);
        }
        return callback(null, result[0]);
    });
}

function deletarUsuario(cpf_user, callback) {
    const query = `DELETE FROM Usuario WHERE cpf_user = "${cpf_user}"`;
    console.log("SQL: " + query);
    conexao.query(query, callback);
}
