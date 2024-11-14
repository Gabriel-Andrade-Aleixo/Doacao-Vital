const conexao = require("../config/conexao");

module.exports = {
    listarUsuarios,
    deletarUsuario
};

function listarUsuarios(callback) {
    const m_sql = `
        SELECT A.id_user, A.nome_user, A.cpf_user, A.cidade_user, A.bairro_user, A.rua_user, A.numero_user, A.telefone_user, B.descricao AS tipo_sangue_descricao, A.email_user FROM Usuario A LEFT JOIN Tipo_sangue B ON A.id_sangue = B.id_sangue;
    `;
    conexao.query(m_sql, (erro, result) => {
        if (erro) {
            console.error("Erro na consulta SQL:", erro);
            callback(erro, null);
        } else {
            console.log("Dados retornados do banco:", result);
            callback(null, result);
        }
    });
}

function deletarUsuario(id_user, callback) {
    const SQL = 'DELETE FROM Usuario WHERE id_user = ?';
    conexao.query(SQL, [id_user], callback);
}

// function deletarUsuario(id_user, callback) {
//     const excluirReferenciasSQL = 'DELETE FROM solicit_sangue WHERE id_usuario = ?';

//     conexao.query(excluirReferenciasSQL, [id_user], (erro) => {
//         if (erro) {
//             console.error("Erro ao excluir referências:", erro);
//             return callback(erro, null);
//         }

//         const excluirUsuarioSQL = 'DELETE FROM Usuario WHERE id_user = ?';
//         conexao.query(excluirUsuarioSQL, [id_user], (erro, resultado) => {
//             if (erro) {
//                 console.error("Erro na exclusão do usuário:", erro);
//                 return callback(erro, null);
//             }
//             callback(null, resultado);
//         });
//     });
// }