# Doacao-Vital

## Pré-requisitos

Certifique-se de ter instalado os seguintes componentes em sua máquina:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

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

## Executando o Projeto

1. Inicie o servidor com o Nodemon:
    ```bash
    npm start
    ```
   
2. Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).






3. Caso o npm start  nao esteja funcionando siga este mini tutorial:
   - Pesquise por "PowerShell" no menu Iniciar, clique com o botão direito em "Windows PowerShell" e selecione *Executar como administrador*.

   -  Execute o comando abaixo para verificar qual é a política de execução atual:
   powershell
   Get-ExecutionPolicy <br>
   Se o resultado for algo como Restricted, isso significa que nenhum script pode ser executado.

   -  Para permitir a execução de scripts assinados ou todos os scripts, você pode executar o seguinte comando:
   
   - Para permitir a execução de *scripts assinados* (uma opção mais segura):
     powershell
     Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
     
   - Se preferir permitir *todos os scripts* (menos seguro), use:
     powershell
     Set-ExecutionPolicy Unrestricted -Scope CurrentUser
     
   -  Quando solicitado, pressione *Y* para confirmar a alteração.
   
   - Feche a janela do PowerShell e abra-a novamente como *Administrador* para garantir que a alteração seja aplicada.

   - Agora, você deve conseguir rodar o comando npm install express ou qualquer outro comando npm sem problemas de permissão.

4. Depois de tudo isso adicione o codigo abaixo no seu package.json pra ter certeza de que tudo vai funcionar:
    ```
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon node app.js"
    },
    ```

## Estrutura de Tabelas (SQL)

Certifique-se de que o arquivo `doacaoVital.sql` contenha as tabelas necessárias para o projeto, como `Usuario`, entre outras, para o funcionamento correto das rotas de cadastro e login.

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
  id_hemo INT PRIMARY KEY AUTO_INCREMENT,
  nome_hemo VARCHAR(20),
  bairro_hemo VARCHAR(50),
  rua_hemo VARCHAR(50),
  numero_hemo VARCHAR(4),
  cidade_hemo(50),
  telefone_hemo VARCHAR(15)
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
  id_sangue INT,
  email_func VARCHAR(40),
  senha_func VARCHAR(20),
  cargo VARCHAR(20),
  data_nasc DATE,
  id_hemocentro INT,
  FOREIGN KEY (id_hemocentro) REFERENCES Hemocentro(id_hemocentro),
  FOREIGN KEY (id_sangue) REFERENCES Tipo_sangue(id_sangue)
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
  INSERT INTO Hemocentro (nome_hemo, bairro_hemo, rua_hemo, numero_hemo, cidade_hemo, telefone_hemo)
  VALUES 
  ('Hemocentro Central', 'Centro', 'Rua das Flores', '123', 'São Paulo', '(11) 98765-4321'),
  ('Hemocentro Regional', 'Jardins', 'Avenida Brasil', '456', 'Rio de Janeiro', '(21) 91234-5678');
  ```
Casdtre um Hemocentro para podermos cadastrar um funcionário admininstrador

- Cadastre os funcionários:
  ```sql
  INSERT INTO Funcionarios (nome_func, cpf_func, bairro_func, rua_func, numero_func, cidade_func, telefone_func, id_sangue, email_func, senha_func, cargo, data_nasc, id_hemocentro) 
  VALUES 
  ('ADMIN1', '123.456.789-00', 'BA', 'RA', '1234', 'CA', '(00) 12345-6789', 1, 'ADMON@admin.com', 'admin', 'ADMIN', '1212-12-12', 1);
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

