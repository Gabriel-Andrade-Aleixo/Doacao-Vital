const conexao = require("../config/conexao");

module.exports = {
    listarUsuarios,
    deletarUsuario,
    registroFUN
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
    const SQLS = 'DELETE FROM Solic_sangue WHERE id_usuario = ?';
    const SQLU = 'DELETE FROM Usuario WHERE id_user = ?';
    conexao.query(SQLS, [id_user], (err, result) => {
        if (err){
            return callback (err)
        }
        conexao.query(SQLU, [id_user], callback);
    });
}

function registroFUN(p_login, p_senha, p_email, p_sg, p_tel, p_bairro, p_rua, p_num, p_cid, p_cpf, p_cargo, p_nasc, p_hemo, callback) {
    m_sql = `INSERT INTO Funcionarios (nome_func, cpf_func, bairro_func, rua_func, numero_func, cidade_func, telefone_func, id_sangue, email_func, senha_func, cargo, data_nasc, id_hemocentro) VALUES ("${p_login}", "${p_cpf}", "${p_bairro}", "${p_rua}", "${p_num}", "${p_cid}", "${p_tel}", "${p_sg}", "${p_email}", "${p_senha}", "${p_cargo}", "${p_nasc}", "${p_hemo}")`;



    console.log("SQL: " + m_sql)
    conexao.query(m_sql, callback)
}