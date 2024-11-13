# Doacao-Vital

## Pré-requisitos

Certifique-se de ter instalado os seguintes componentes em sua máquina:
- [Node.js](https://nodejs.org/)
- [Npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

## Instalação

Siga os passos abaixo para instalar e rodar o projeto.

1. **Clone este repositório**:
    ```bash
    git clone https://github.com/Gabriel-Andrade-Aleixo/Doacao-Vital.git

    ```
2. **Apos clonar Entre na pasta utilizando**:
    ```cmd
    cd Doacao-Vital
    ```

3. **Inicialize o projeto Node.js**:
    ```cmd
    npm init -y
    ```

4. **Instale as dependências necessárias**:
    ```bash
    npm install express --save
    npm install nodemon --save
    npm install ejs
    npm install mysql2
    ```
<hr>

5. **Configuração do Banco de Dados MySQL**:

- Acesse o MySQL com o usuário `root` (ou outro usuário com permissões):
    ```bash
    mysql -u root -p
    ```

- Crie o banco de dados:
    ```sql
    CREATE DATABASE doacaoVital;
    use doacaoVital;
    ```
- Importe o arquivo SQL `doacaoVital.sql`:
    ```bash
    mysql -u root -p doacaoVital < doacaoVital.sql
    ```
    
    Aqui está o que cada parte faz:
    
    - **`mysql`**: comando para abrir o cliente MySQL.
  
    - **`-u root`**: especifica o usuário que fará a conexão (neste caso, root, que geralmente é o usuário administrador).
    
    - **`-p`**: instrui o MySQL a solicitar a senha do usuário antes de executar o comando.
    
    - **`doacaoVital`**: é o nome do banco de dados onde o conteúdo do arquivo será importado. Isso significa que o banco de dados doacaoVital já deve existir no MySQL.
    
    - **`< doacaoVital.sql`**: usa o arquivo doacaoVital.sql como entrada, ou seja, o MySQL vai executar todos os comandos SQL presentes nesse arquivo dentro do banco de dados doacaoVital.
    

- Estabeleça conexao com o  Mysql :

    ° Dentro do arquivo Doacao-Vital
    ° vá para a pasta API, Entre em config
    ° Selecione  o arquivo conexao.js 
    ° faça oque esta a seguir:
    
    ```js
    var conexao = mysql.createConnection
    user: 'root', 
    password: '123456', // troque para a senha presente para a senha do seu mysql. 
    host: 'localhost',
    port: 3306 //verifique se a porta corresponde a sua, caso seja diferente, altere no código
    ```
    
    
- Verifique se o banco de dados foi criado corretamente:
    ```sql
    SHOW DATABASES;
    ```


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

3. Caso o npm start não esteja funcionado, adicione o npm start no seu package.json dessa maneira:
    ```
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon node app.js"
    },
    ```

## Estrutura de Tabelas (SQL)

Certifique-se de que o arquivo `doacaoVital.sql` contenha as tabelas necessárias para o projeto, como `Usuario`, entre outras, para o funcionamento correto das rotas de cadastro e login.
