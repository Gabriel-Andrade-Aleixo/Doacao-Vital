const conexao = require("../config/conexao")
console.log("acassando models login")

module.exports = {
    registroPSW
}

function registroPSW(
    p_login,
    p_senha,
    p_email,
    p_sg,
    p_tel,
    p_bairro,
    p_rua,
    p_num,
    p_cid,
    p_cpf,
    callback
  ) {
    const checkCPFSql = `SELECT cpf_user FROM Usuario WHERE cpf_user = "${p_cpf}"`;
  
    conexao.query(checkCPFSql, (erro, resultado) => {
      if (erro) {
        return callback(erro);
      }
  
      if (resultado.length > 0) {
        return callback(null, { mensagem: "CPF já cadastrado" });
      }
  
      const insertSql = `
          INSERT INTO Usuario 
          (nome_user, cpf_user, bairro_user, rua_user, numero_user, cidade_user, telefone_user, id_sangue, email_user, senha_user) 
          VALUES ("${p_login}", "${p_cpf}", "${p_bairro}", "${p_rua}", "${p_num}", "${p_cid}", "${p_tel}", "${p_sg}", "${p_email}", "${p_senha}")
        `;
  
      conexao.query(insertSql, callback);
    });
  }
  