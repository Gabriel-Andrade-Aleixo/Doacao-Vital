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
    ```
      cd Doacao-Vital
    ```

3. **Inicialize o projeto Node.js**:
    ```bash
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
5. **Configuração do Banco de Dados MySQL:**

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
