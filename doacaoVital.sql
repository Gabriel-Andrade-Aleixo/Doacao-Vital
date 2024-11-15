CREATE DATABASE DoacaoVital; 
USE DoacaoVital;

CREATE TABLE Tipo_sangue (
    id_sangue INT PRIMARY KEY AUTO_INCREMENT,
    descricao CHAR(3)
);

CREATE TABLE Usuario (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    nome_user VARCHAR(70),
    cpf_user VARCHAR(11),
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
    endereco_hemocentro VARCHAR(100),
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
    cpf_func VARCHAR(11),
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

-- Inserindo dados na tabela Tipo_sangue
INSERT INTO Tipo_sangue (descricao) VALUES ('A+'), ('A-'), ('B+'), ('B-'), ('AB+'), ('AB-'), ('O+'), ('O-');

-- Inserindo dados na tabela Usuario
INSERT INTO Usuario (nome_user, cpf_user, bairro_user, rua_user, numero_user, cidade_user, telefone_user, id_sangue, email_user, senha_user) 
VALUES 
('João Silva', '12345678900', 'BairroA', 'RuaA', '4561', 'CidadeA', '11912345678', 1, 'joao@gmail.com', 'senha123'), 
('Maria Santos', '98765432100', 'BairroB', 'RuaB', '4562', 'CidadeB', '11987654321', 3, 'maria@gmail.com', 'senha456');

-- Inserindo dados na tabela Hemocentro
INSERT INTO Hemocentro (nome_hemocentro, endereco_hemocentro, telefone_hemocentro) 
VALUES 
('Hemocentro Central', 'Av. Central, 1000', '1133345566'), 
('Hemocentro Norte', 'Rua Norte, 500', '1122233344');

-- Inserindo dados na tabela Solic_sangue
INSERT INTO Solic_sangue (tipo_solic, qtda_sangue, id_usuario) 
VALUES 
('Emergência', 2, 1), 
('Cirurgia', 1, 2);

-- Inserindo dados na tabela Funcionarios
INSERT INTO Funcionarios (nome_func, cpf_func, bairro_func, rua_func, numero_func, cidade_func, telefone_func, id_sangue, email_func, senha_func, cargo, data_nasc, id_hemocentro) 
VALUES 
('Carlos Oliveira', '45678912300', 'BairroC', 'Rua C', '789', 'CidadeC', '1199998888', 2, 'carlos@hemocentro.com', 'senha789', 'Enfermeiro', '1985-07-15', 1),
('Ana Paula', '78912345600', 'BairroD', 'Rua D', '101', 'CidadeD', '1188889999', 4, 'ana@hemocentro.com', 'senha101', 'Recepcionista', '1990-03-20', 2);

-- Inserindo dados na tabela Estoque
INSERT INTO Estoque (tipo_sangue, volume_deposito) 
VALUES 
('A+', 10.5), 
('O-', 8.0);

-- Consulta para verificar dados inseridos na tabela Usuario
SELECT * FROM Usuario;
