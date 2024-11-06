# Doacao-Vital

## Pré-requisitos

Certifique-se de ter instalado os seguintes componentes em sua máquina:
- <a href="https://nodejs.org/" target="_blank">Node.js</a>  
- <a href="https://www.npmjs.com/" target="_blank">Npm</a>
- <a href="https://www.mysql.com/" target="_blank">MySQL</a>


## Instalação

Siga os passos abaixo para instalar e rodar o projeto.

1. **Clone este repositório**:
    ```bash
    git clone <url-do-repositorio>
    cd <nome-do-repositorio>
    ```

2. **Inicialize o projeto Node.js**:
    ```bash
    npm init -y
    ```

3. **Instale as dependências necessárias**:
    ```bash
    npm install express --save
    npm install nodemon --save
    npm install ejs
    npm install mysql2
    ```

4. **Configuração do Banco de Dados MySQL**:

    - Acesse o MySQL com o usuário `root` (ou outro usuário com permissões):
        ```bash
        mysql -u root -p
        ```
    - Crie o banco de dados:
        ```sql
        CREATE DATABASE doacaoVital;
        ```
    - Importe o arquivo SQL `doacaoVital.sql`:
        ```bash
        mysql -u root -p doacaoVital < doacaoVital.sql
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

## Estrutura de Tabelas (SQL)

Certifique-se de que o arquivo `doacaoVital.sql` contenha as tabelas necessárias para o projeto, como `Usuario`, entre outras, para o funcionamento correto das rotas de cadastro e login.
