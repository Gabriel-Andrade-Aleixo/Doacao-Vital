const conexao = require("../config/conexao")
console.log("acessando models login")

module.exports = {
    validarPSW,
    getUsuarioById,
    deletarUsuario
}

// function validarPSW(p_login, p_senha, callback) {
//     const m_sql = `SELECT * FROM Usuario WHERE cpf_user = "${p_login}" AND senha_user = "${p_senha}"`;
//     console.log("SQL: " + m_sql);
//     conexao.query(m_sql, callback);
// }

function validarPSW(p_login, p_senha, callback) {
    const sqlAdmin = `SELECT * FROM Funcionarios WHERE cpf_func = "${p_login}" AND senha_func = "${p_senha}"`;
    const sqlUsuario = `SELECT * FROM Usuario WHERE cpf_user = "${p_login}" AND senha_user = "${p_senha}"`;

    conexao.query(sqlAdmin, (erro, resultadoAdmin) => {
        if (erro) return callback(erro);

        if (resultadoAdmin.length > 0) {
            return callback(null, { tipo: 'admin', usuario: resultadoAdmin[0] });
        } else {
            conexao.query(sqlUsuario, (erro, resultadoUsuario) => {
                if (erro) return callback(erro);

                if (resultadoUsuario.length > 0) {
                    return callback(null, { tipo: 'user', usuario: resultadoUsuario[0] });
                } else {
                    return callback(null, null);
                }
            });
        }
    });
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
