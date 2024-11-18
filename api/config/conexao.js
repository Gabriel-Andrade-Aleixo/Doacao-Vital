var mysql = require("mysql2");
var database = "doacaoVital";

var conexao = mysql.createConnection({
    user: 'root',
    password: '123456',
    host: 'localhost',
    port: 3306
});

conexao.connect((err) => {
    if(err){
        console.log("Erro ao conectar no Mysql...");
        return;
    }
    conexao.query('USE ' + database);
    console.log('\nConexão estabelecida com sucesso');

});

module.exports = conexao;

