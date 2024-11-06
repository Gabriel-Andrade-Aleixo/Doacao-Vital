const conexao = require("../config/conexao")
console.log("acassando models login")

module.exports = {
    validarPSW
}

function validarPSW(p_login, p_senha, callback){
    // m_sql = "select * from usuarios where usu_apelido = '" + p_login + "' and  usu_password = '" + p_senha + "' ";
    m_sql = `select * from Usuario where cpf_user = "${p_login}" and  senha_user = "${p_senha}"`;
    

    console.log("SQL: " + m_sql)
    conexao.query(m_sql, callback)
}
