const conexao = require("../config/conexao")
console.log("acassando models login")

module.exports = {
    registroPSW
}

function registroPSW(p_login, p_senha, p_email, p_sg, p_tel, p_end, p_cpf, callback){
    // m_sql = "select * from usuarios where usu_apelido = '" + p_login + "' and  usu_password = '" + p_senha + "' ";
    // m_sql = `INSERT INTO Usuario (nome_user, cpf_user, endereco_user, telefone_user, id_sangue, email_user, senha_user) VALUES ("${p_login}", "${p_cpf}", "${p_end}", "${p_tel}, "${p_sg}, "${p_email}, "${p_senha}")`;
    m_sql = `INSERT INTO Usuario (nome_user, cpf_user, endereco_user, telefone_user, id_sangue, email_user, senha_user) VALUES ("${p_login}", "${p_cpf}", "${p_end}", "${p_tel}", "${p_sg}", "${p_email}", "${p_senha}")`;



    console.log("SQL: " + m_sql)
    conexao.query(m_sql, callback)
}
