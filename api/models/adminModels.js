const conexao = require("../config/conexao");

module.exports = {
    listarUsuarios,
    deletarUsuario,
    registroFUN,
    listarFunc,
    deletarFunc,
    registroHEMO,
    listarHemo,
    deletarHemocentro,
    listarESTQ
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
        if (err) {
            return callback(err)
        }
        conexao.query(SQLU, [id_user], callback);
    });
}

function registroFUN(p_login, p_senha, p_email, p_tel, p_bairro, p_rua, p_num, p_cid, p_cpf, p_cargo, p_nasc, p_hemo, callback) {

    const checkCPFSql = `SELECT cpf_func FROM Funcionarios WHERE cpf_func = "${p_cpf}"`;

    conexao.query(checkCPFSql, (erro, resultado) => {
        if (erro) {
            return callback(erro);
        }

        if (resultado.length > 0) {
            return callback(null, { mensagem: "CPF já cadastrado" });
        }

        const insertSql = `
          INSERT INTO Funcionarios
          (nome_func, cpf_func, bairro_func, rua_func, numero_func, cidade_func, telefone_func, email_func, senha_func, cargo, data_nasc, id_hemocentro) 
          VALUES ("${p_login}", "${p_cpf}", "${p_bairro}", "${p_rua}", "${p_num}", "${p_cid}", "${p_tel}", "${p_email}", "${p_senha}", "${p_cargo}", "${p_nasc}", "${p_hemo}")
        `;

        conexao.query(insertSql, callback);
    });
}

function listarFunc(callback) {
    const m_sql = `
        SELECT 
            A.id_funcionario AS id_func,
            A.nome_func, 
            A.cpf_func, 
            A.cidade_func, 
            A.bairro_func, 
            A.rua_func, 
            A.numero_func, 
            A.telefone_func,  
            A.email_func, 
            A.cargo, 
            A.data_nasc, 
            C.nome_hemocentro 
        FROM Funcionarios A 
        LEFT JOIN Hemocentro C ON A.id_hemocentro = C.id_hemocentro;
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


function deletarFunc(id_func, callback) {
    const SQL = 'DELETE FROM Funcionarios WHERE id_funcionario = ?';
    conexao.query(SQL, [id_func], (err, result) => {
        if (err) {
            console.error("Erro ao deletar funcionário:", err);
            callback(err, null);
        } else {
            console.log(`Funcionário com id ${id_func} deletado.`);
            callback(null, result);
        }
    });
}

function registroHEMO(p_nome, p_tel, p_bairro, p_rua, p_num, p_cid, callback) {
    const insertSql = `
        INSERT INTO Hemocentro
        (nome_hemocentro, telefone_hemocentro, bairro_hemo, rua_hemo, numero_hemo, cidade_hemo) 
        VALUES ("${p_nome}", "${p_tel}", "${p_bairro}", "${p_rua}", "${p_num}", "${p_cid}")
    `;

    console.log('Executando query SQL: ', insertSql);

    conexao.query(insertSql, callback);
}

function listarHemo(callback) {
    const m_sql = `
    SELECT 
        id_hemocentro, 
        nome_hemocentro, 
        telefone_hemocentro, 
        bairro_hemo, 
        rua_hemo, 
        numero_hemo, 
        cidade_hemo
    FROM Hemocentro;
`;
    conexao.query(m_sql, (erro, result) => {
        if (erro) {
            console.error("Erro na consulta SQL:", erro);
            callback(erro, null);
        } else {
            console.log("Hemocentros retornados do banco:", result);
            callback(null, result);
        }
    });
}


function deletarHemocentro(id_hemocentro, callback) {
    const SQL = 'DELETE FROM Hemocentro WHERE id_hemocentro = ?';
    conexao.query(SQL, [id_hemocentro], (err, result) => {
        if (err) {
            console.error("Erro ao deletar funcionário:", err);
            callback(err, null);
        } else {
            console.log(`Hemocentro com id ${id_hemocentro} deletado.`);
            callback(null, result);
        }
    });
}

function listarESTQ(callback) {
    const m_sql = `
    SELECT 
        tipo_sangue,
        volume_deposito
    FROM Estoque;`;
    conexao.query(m_sql, (erro, result) => {
        if (erro) {
            console.error("Erro na consulta SQL:", erro);
            callback(erro, null);
        } else {
            console.log("Estoque retornados do banco:", result);
            callback(null, result); 
        }
    });
}