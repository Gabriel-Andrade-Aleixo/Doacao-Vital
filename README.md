# Doacao-Vital

## Pré-requisitos

Certifique-se de ter instalado os seguintes componentes em sua máquina:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [MySQL WorkBench](https://www.mysql.com/)

## Instalação

Siga os passos abaixo para instalar e rodar o projeto.

1. **Clone este repositório**:
    ```bash
    git clone https://github.com/Gabriel-Andrade-Aleixo/Doacao-Vital.git

    ```
2. **Apos clonar Entre na pasta utilizando**:
    ```cmd
    cd .\Doacao-Vital\
    ```

3. **Instale as dependências necessárias**:
    ```bash
    npm install express --save
    npm install nodemon --save
    npm install ejs
    npm install mysql2
    ```
<hr>

## Estrutura do Projeto

- **`app.js`**: Arquivo principal da aplicação, configura o servidor e as rotas.
- **`/api/routes`**: Contém as rotas de login e cadastro.
- **`/api/controllers`**: Controladores responsáveis pela lógica das rotas.
- **`/api/models`**: Modelos de conexão com o banco de dados MySQL.
- **`/api/views`**: Views EJS para renderização no navegador.

## Estrutura de Tabelas (SQL)

Certifique-se de que o arquivo `doacaoVital.sql` contenha as tabelas necessárias para o projeto, como `Usuario`, entre outras, para o funcionamento correto das rotas de cadastro e login.

Agora no MySql WorkBench execute todos os códigos contidos no arquivo `doacaoVital.sql`. Caso eles não funcionem tente executar eles nessa ordem abaixo

- Criando o e Usando o Banco:
  ```sql
  CREATE DATABASE doacaoVital; # Criando o Banco

  USE doacaoVital; # Usando o Banco
  ```

- Criando as Tabelas:
  ```sql
  CREATE TABLE Tipo_sangue (
  id_sangue INT PRIMARY KEY AUTO_INCREMENT,
  descricao CHAR(3)
  );

  CREATE TABLE Usuario (
  id_user INT PRIMARY KEY AUTO_INCREMENT,
  nome_user VARCHAR(70),
  cpf_user VARCHAR(14) UNIQUE,
  bairro_user VARCHAR(100),
  rua_user VARCHAR(100),
  numero_user CHAR(4),
  cidade_user VARCHAR(50),
  telefone_user VARCHAR(15),
  id_sangue INT,
  email_user VARCHAR(40),
  senha_user VARCHAR(20),
  FOREIGN KEY (id_sangue) REFERENCES Tipo_sangue(id_sangue)
  );
    
  CREATE TABLE Hemocentro (
  id_hemocentro INT PRIMARY KEY AUTO_INCREMENT,
  nome_hemocentro VARCHAR(20),
  bairro_hemo VARCHAR(50),
  rua_hemo VARCHAR(50),
  numero_hemo VARCHAR(4),
  cidade_hemo VARCHAR(50),
  telefone_hemocentro VARCHAR(15)
  );
    
  CREATE TABLE Solic_sangue (
  id_solic INT PRIMARY KEY AUTO_INCREMENT,
  tipo_solic VARCHAR(12),
  qtda_sangue INT,
  id_usuario INT,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_user)
  );
    
  CREATE TABLE Funcionarios (
  id_funcionario INT PRIMARY KEY AUTO_INCREMENT,
  nome_func VARCHAR(70),
  cpf_func VARCHAR(14) UNIQUE,
  bairro_func VARCHAR(100),
  rua_func VARCHAR(100),
  numero_func CHAR(4),
  cidade_func VARCHAR(100),
  telefone_func VARCHAR(15),
  email_func VARCHAR(40),
  senha_func VARCHAR(20),
  cargo VARCHAR(20),
  data_nasc DATE,
  id_hemocentro INT,
  FOREIGN KEY (id_hemocentro) REFERENCES Hemocentro(id_hemocentro)
  );
    
  CREATE TABLE Estoque (
  id_estoque INT PRIMARY KEY AUTO_INCREMENT,
  tipo_sangue VARCHAR(3),
  volume_deposito DOUBLE
  );
  ```
Para o banco funcionar no site será necessário cadastrar algumas coisas direto no banco

- Cadastre os tipos sanguíneo:
  ```sql
  INSERT INTO Tipo_sangue (descricao) VALUES
  ('A+'),('A-'),
  ('B+'),('B-'),
  ('AB+'),('AB-'),
  ('O+'),('O-');
  ```
Assim no momento que o usuário for se cadastrar, ele só poderá escolher entre algum desses tipos sanguíneos já cadastrados

- Cadastre pelo menos 1 Hemocentro:
  ```sql
  INSERT INTO Hemocentro (nome_hemocentro, bairro_hemo, rua_hemo, numero_hemo, cidade_hemo, telefone_hemocentro)
  VALUES 
  ('Hemocentro Central', 'Centro', 'Rua das Flores', '123', 'São Paulo', '(11) 98765-4321'),
  ('Hemocentro Regional', 'Jardins', 'Avenida Brasil', '456', 'Rio de Janeiro', '(21) 91234-5678');
  ```
Casdtre um Hemocentro para podermos cadastrar um funcionário admininstrador

- Cadastre os funcionários:
  ```sql
  INSERT INTO Funcionarios (nome_func, cpf_func, bairro_func, rua_func, numero_func, cidade_func, telefone_func, email_func, senha_func, cargo, data_nasc, id_hemocentro) 
  VALUES 
  ('ADMIN1', '123.456.789-00', 'BA', 'RA', '1234', 'CA', '(00) 12345-6789', 'ADMON@admin.com', 'admin', 'ADMIN', '1212-12-12', 1);
  ```
Assim estamos cadastrando o admininstrador para ele poder cadastrar os funcionários

- Cadastre o Estoque:
  ```sql
  INSERT INTO Estoque (tipo_sangue, volume_deposito) 
  VALUES 
  ('A+', 450.0), 
  ('A-', 450.0), 
  ('B+', 450.0), 
  ('B-', 450.0), 
  ('AB+', 450.0), 
  ('AB-', 450.0), 
  ('O+', 450.0), 
  ('O-', 450.0);
  ```
Por fim cadastramos a quantidade de sangue em estoque

## Fazendo a conexão do vscode e o banco de dados.
- na pasta config e com um arquivo conexão.js ja criado repita o processo abaixo.
 ```js
var mysql = require("mysql2");
var database = "doacaoVital";

var conexao = mysql.createConnection({
    user: 'root',    // <-- altere se seu usuario for diferente no seu Mysql workbench.
    password: '123456',   //<--- altere a senha presente para a senha atual do seu mysql workbench.
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

 ```





## Executando o Projeto

1. Inicie o servidor com o Nodemon:
    ```bash
    npm start
    ```
   
2. Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).

3. Caso o npm start nao esteja funcionando este mini tutorial pode resolver:
   - Pesquise por "PowerShell" no menu Iniciar, clique com o botão direito em "Windows PowerShell" e selecione *Executar como administrador*.

   - Execute o comando abaixo para verificar qual é a política de execução atual:
   ```cmd
   Get-ExecutionPolicy
   ```
   Se o resultado for algo como Restricted, isso significa que nenhum script pode ser executado.
   
   - Para permitir a execução de *scripts assinados* (uma opção mais segura):
   ```cmd
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   - Se preferir permitir *todos os scripts* (menos seguro), use:
   ```cmd
   Set-ExecutionPolicy Unrestricted -Scope CurrentUser
   ```
   - Quando solicitado, pressione *S* ou *Y* depois *Enter* para confirmar a alteração.
   
   - Feche a janela do PowerShell e abra-a novamente como *Administrador* para garantir que a alteração seja aplicada.

   - Agora, você deve conseguir rodar o comando npm install express ou qualquer outro comando npm sem problemas de permissão.

5. Depois de tudo isso adicione o codigo abaixo no seu package.json pra ter certeza de que tudo vai funcionar:
    ```
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon node app.js"
    },
    ```

## Backup Do nosso Banco de Dados.
- Backup: O dump é usado como uma cópia de segurança do banco.


- Recriação do Banco: Você pode executar este script para recriar a estrutura e os dados do banco doacaoVital em outro servidor.



- Execute com cautela, pois o comando DROP TABLE apaga tabelas existentes antes de recriá-las!

```sql
-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: doacaoVital
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `estoque`
--

DROP TABLE IF EXISTS `estoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoque` (
  `id_estoque` int NOT NULL AUTO_INCREMENT,
  `tipo_sangue` varchar(3) DEFAULT NULL,
  `volume_deposito` double DEFAULT NULL,
  PRIMARY KEY (`id_estoque`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque`
--

LOCK TABLES `estoque` WRITE;
/*!40000 ALTER TABLE `estoque` DISABLE KEYS */;
INSERT INTO `estoque` VALUES (1,'A+',450),(2,'A-',450),(3,'B+',450),(4,'B-',450),(5,'AB+',450),(6,'AB-',450),(7,'O+',450),(8,'O-',450);
/*!40000 ALTER TABLE `estoque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `id_funcionario` int NOT NULL AUTO_INCREMENT,
  `nome_func` varchar(70) DEFAULT NULL,
  `cpf_func` varchar(14) DEFAULT NULL,
  `bairro_func` varchar(100) DEFAULT NULL,
  `rua_func` varchar(100) DEFAULT NULL,
  `numero_func` char(4) DEFAULT NULL,
  `cidade_func` varchar(100) DEFAULT NULL,
  `telefone_func` varchar(15) DEFAULT NULL,
  `email_func` varchar(40) DEFAULT NULL,
  `senha_func` varchar(20) DEFAULT NULL,
  `cargo` varchar(20) DEFAULT NULL,
  `data_nasc` date DEFAULT NULL,
  `id_hemocentro` int DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`),
  UNIQUE KEY `cpf_func` (`cpf_func`),
  KEY `id_hemocentro` (`id_hemocentro`),
  CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`id_hemocentro`) REFERENCES `hemocentro` (`id_hemocentro`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'ADMIN1','123.456.789-00','BA','RA','1234','CA','(00) 12345-6789','ADMON@admin.com','admin','ADMIN','1212-12-12',1);
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hemocentro`
--

DROP TABLE IF EXISTS `hemocentro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hemocentro` (
  `id_hemocentro` int NOT NULL AUTO_INCREMENT,
  `nome_hemocentro` varchar(20) DEFAULT NULL,
  `bairro_hemo` varchar(50) DEFAULT NULL,
  `rua_hemo` varchar(50) DEFAULT NULL,
  `numero_hemo` varchar(4) DEFAULT NULL,
  `cidade_hemo` varchar(50) DEFAULT NULL,
  `telefone_hemocentro` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_hemocentro`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hemocentro`
--

LOCK TABLES `hemocentro` WRITE;
/*!40000 ALTER TABLE `hemocentro` DISABLE KEYS */;
INSERT INTO `hemocentro` VALUES (1,'Hemocentro Central','Centro','Rua das Flores','123','São Paulo','(11) 98765-4321'),(2,'Hemocentro Regional','Jardins','Avenida Brasil','456','Rio de Janeiro','(21) 91234-5678');
/*!40000 ALTER TABLE `hemocentro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solic_sangue`
--

DROP TABLE IF EXISTS `solic_sangue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solic_sangue` (
  `id_solic` int NOT NULL AUTO_INCREMENT,
  `tipo_solic` varchar(12) DEFAULT NULL,
  `qtda_sangue` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_solic`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `solic_sangue_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solic_sangue`
--

LOCK TABLES `solic_sangue` WRITE;
/*!40000 ALTER TABLE `solic_sangue` DISABLE KEYS */;
/*!40000 ALTER TABLE `solic_sangue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_sangue`
--

DROP TABLE IF EXISTS `tipo_sangue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_sangue` (
  `id_sangue` int NOT NULL AUTO_INCREMENT,
  `descricao` char(3) DEFAULT NULL,
  PRIMARY KEY (`id_sangue`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_sangue`
--

LOCK TABLES `tipo_sangue` WRITE;
/*!40000 ALTER TABLE `tipo_sangue` DISABLE KEYS */;
INSERT INTO `tipo_sangue` VALUES (1,'A+'),(2,'A-'),(3,'B+'),(4,'B-'),(5,'AB+'),(6,'AB-'),(7,'O+'),(8,'O-');
/*!40000 ALTER TABLE `tipo_sangue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `nome_user` varchar(70) DEFAULT NULL,
  `cpf_user` varchar(14) DEFAULT NULL,
  `bairro_user` varchar(100) DEFAULT NULL,
  `rua_user` varchar(100) DEFAULT NULL,
  `numero_user` char(4) DEFAULT NULL,
  `cidade_user` varchar(50) DEFAULT NULL,
  `telefone_user` varchar(15) DEFAULT NULL,
  `id_sangue` int DEFAULT NULL,
  `email_user` varchar(40) DEFAULT NULL,
  `senha_user` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `cpf_user` (`cpf_user`),
  KEY `id_sangue` (`id_sangue`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_sangue`) REFERENCES `tipo_sangue` (`id_sangue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-20 10:15:29

```
