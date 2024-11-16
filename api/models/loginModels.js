const conexao = require("../config/conexao")
console.log("acessando models login")

module.exports = {
    validarPSW,
    getUsuarioById,
    deletarUsuario,
    registrarDoacao,
    getUsuarioByCPF,
    registrarSolicitacao
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


function getUsuarioByCPF(cpf_user, callback) {
    const query = `SELECT cpf_user FROM Usuario WHERE cpf_user = "${cpf_user}"`;
    console.log("SQL: " + query);
    conexao.query(query, (erro, result) => {
        if (erro) {
            return callback(erro, null);
        }
        return callback(null, result[0]);
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

function registrarDoacao(cpf, volume, callback) {
    const subQuery = `
        SELECT Tipo_sangue.descricao 
        FROM Usuario
        JOIN Tipo_sangue 
        ON Usuario.id_sangue = Tipo_sangue.id_sangue
        WHERE Usuario.cpf_user = ? LIMIT 1`;

    console.log(`Buscando tipo sanguíneo para CPF: ${cpf}`);
    conexao.query(subQuery, [cpf], (erro, resultadosSubQuery) => {
        if (erro) {
            console.error("Erro ao buscar tipo sanguíneo:", erro);
            return callback(erro, null);
        }

        if (resultadosSubQuery.length === 0) {
            console.error("Nenhum tipo sanguíneo encontrado para o CPF fornecido.");
            return callback(new Error("Tipo sanguíneo não encontrado"), null);
        }

        const tipoSangue = resultadosSubQuery[0].descricao;
        console.log(`Tipo sanguíneo encontrado: ${tipoSangue}`);

        const query = `
            UPDATE Estoque 
            SET volume_deposito = volume_deposito + ?
            WHERE tipo_sangue = ?`;

        console.log(`Atualizando volume para tipo sanguíneo: ${tipoSangue} com volume: ${volume}`);
        conexao.query(query, [volume, tipoSangue], (erro, resultadosUpdate) => {
            if (erro) {
                console.error("Erro ao atualizar o estoque:", erro);
                return callback(erro, null);
            }

            console.log("Atualização realizada com sucesso:", resultadosUpdate);
            callback(null, resultadosUpdate);
        });
    });
}

function registrarSolicitacao(cpf, volume, callback) {
    const subQuery = `
        SELECT Usuario.id_user, Tipo_sangue.descricao 
        FROM Usuario
        JOIN Tipo_sangue 
        ON Usuario.id_sangue = Tipo_sangue.id_sangue
        WHERE Usuario.cpf_user = ? LIMIT 1`;

    console.log(`Buscando informações para CPF: ${cpf}`);
    conexao.query(subQuery, [cpf], (erro, resultadosSubQuery) => {
        if (erro) {
            console.error("Erro ao buscar informações do usuário:", erro);
            return callback(erro, null);
        }

        if (resultadosSubQuery.length === 0) {
            console.error("Usuário não encontrado para o CPF fornecido.");
            return callback(new Error("Usuário não encontrado"), null);
        }

        const { id_user, descricao: tipoSangue } = resultadosSubQuery[0];
        console.log(`Usuário encontrado: ID=${id_user}, Tipo Sanguíneo=${tipoSangue}`);

        const updateQuery = `
            UPDATE Estoque 
            SET volume_deposito = volume_deposito - ?
            WHERE tipo_sangue = ?`;

        console.log(`Atualizando estoque para tipo sanguíneo: ${tipoSangue} com volume: ${volume}`);
        conexao.query(updateQuery, [volume, tipoSangue], (erro, resultadosUpdate) => {
            if (erro) {
                console.error("Erro ao atualizar o estoque:", erro);
                return callback(erro, null);
            }

            console.log("Estoque atualizado com sucesso:", resultadosUpdate);

            const insertQuery = `
                INSERT INTO Solic_sangue (tipo_solic, qtda_sangue, id_usuario)
                VALUES (?, ?, ?)`;

            console.log(`Registrando solicitação: Tipo=${tipoSangue}, Volume=${volume}, ID Usuário=${id_user}`);
            conexao.query(insertQuery, [tipoSangue, volume, id_user], (erro, resultadosInsert) => {
                if (erro) {
                    console.error("Erro ao registrar a solicitação:", erro);
                    return callback(erro, null);
                }

                console.log("Solicitação registrada com sucesso:", resultadosInsert);
                callback(null, resultadosInsert);
            });
        });
    });
}