// adminModels.js
const conexao = require("../config/conexao");

module.exports = {
    listarUsuarios
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
