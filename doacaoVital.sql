CREATE DATABASE DoacaoVital;

USE DoacaoVital;

-- Criando a tabela Tipo_sangue
CREATE TABLE Tipo_sangue (
    id_sangue INT PRIMARY KEY AUTO_INCREMENT,
    descricao CHAR(3)
);

-- Criando a tabela Usuario
CREATE TABLE Usuario (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    nome_user VARCHAR(70),
    cpf_user VARCHAR(11),
    endereco_user VARCHAR(100),
    telefone_user VARCHAR(15),
    id_sangue INT,
    email_user VARCHAR(40),
    senha_user VARCHAR(12),
    FOREIGN KEY (id_sangue) REFERENCES Tipo_sangue(id_sangue)
);

-- Criando a tabela Hemocentro
CREATE TABLE Hemocentro (
    id_hemocentro INT PRIMARY KEY AUTO_INCREMENT,
    nome_hemocentro VARCHAR(20),
    endereco_hemocentro VARCHAR(100),
    telefone_hemocentro VARCHAR(15)
);

-- Criando a tabela Solic_sangue
CREATE TABLE Solic_sangue (
    id_solic INT PRIMARY KEY AUTO_INCREMENT,
    tipo_solic VARCHAR(12),
    qtda_sangue INT,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_user)
);

-- Criando a tabela Funcionarios
CREATE TABLE Funcionarios (
    id_funcionario INT PRIMARY KEY AUTO_INCREMENT,
    nome_func VARCHAR(70),
    cpf_func VARCHAR(14),
    endereco_func VARCHAR(100),
    telefone_func VARCHAR(15),
    id_sangue INT,
    email_func VARCHAR(40),
    senha_func VARCHAR(12),
    cargo VARCHAR(20),
    data_nasc DATE,
    id_hemocentro INT,
    FOREIGN KEY (id_hemocentro) REFERENCES Hemocentro(id_hemocentro),
    FOREIGN KEY (id_sangue) REFERENCES Tipo_sangue(id_sangue)
);

-- Criando a tabela Estoque
CREATE TABLE Estoque (
    id_estoque INT PRIMARY KEY AUTO_INCREMENT,
    tipo_sangue VARCHAR(3),
    volume_deposito DOUBLE
);

-- Inserindo dados na tabela Tipo_sangue
INSERT INTO Tipo_sangue (descricao) VALUES ('A+');
INSERT INTO Tipo_sangue (descricao) VALUES ('A-');
INSERT INTO Tipo_sangue (descricao) VALUES ('B+');
INSERT INTO Tipo_sangue (descricao) VALUES ('B-');
INSERT INTO Tipo_sangue (descricao) VALUES ('AB+');
INSERT INTO Tipo_sangue (descricao) VALUES ('AB-');
INSERT INTO Tipo_sangue (descricao) VALUES ('O+');
INSERT INTO Tipo_sangue (descricao) VALUES ('O-');


-- Inserindo dados na tabela Usuario
INSERT INTO Usuario (nome_user, cpf_user, endereco_user, telefone_user, id_sangue, email_user, senha_user)
VALUES ('João Silva', '123.456.789-00', 'Rua A, 123', '11912345678', 1, 'joao@gmail.com', 'senha123');

INSERT INTO Usuario (nome_user, cpf_user, endereco_user, telefone_user, id_sangue, email_user, senha_user)
VALUES ('Maria Santos', '987.654.321-00', 'Rua B, 456', '11987654321', 3, 'maria@gmail.com', 'senha456');

-- Inserindo dados na tabela Hemocentro
INSERT INTO Hemocentro (nome_hemocentro, endereco_hemocentro, telefone_hemocentro)
VALUES ('Hemocentro Central', 'Av. Central, 1000', '1133345566');

INSERT INTO Hemocentro (nome_hemocentro, endereco_hemocentro, telefone_hemocentro)
VALUES ('Hemocentro Norte', 'Rua Norte, 500', '1122233344');

-- Inserindo dados na tabela Solic_sangue
INSERT INTO Solic_sangue (tipo_solic, qtda_sangue, id_usuario)
VALUES ('Emergência', 2, 1);

INSERT INTO Solic_sangue (tipo_solic, qtda_sangue, id_usuario)
VALUES ('Cirurgia', 1, 2);

-- Inserindo dados na tabela Funcionarios
INSERT INTO Funcionarios (nome_func, cpf_func, endereco_func, telefone_func, id_sangue, email_func, senha_func, cargo, data_nasc, id_hemocentro)
VALUES ('Carlos Oliveira', '456.789.123-00', 'Rua C, 789', '1199998888', 2, 'carlos@hemocentro.com', 'senha789', 'Enfermeiro', '1985-07-15', 1);

INSERT INTO Funcionarios (nome_func, cpf_func, endereco_func, telefone_func, id_sangue, email_func, senha_func, cargo, data_nasc, id_hemocentro)
VALUES ('Ana Paula', '789.123.456-00', 'Rua D, 101', '1188889999', 4, 'ana@hemocentro.com', 'senha101', 'Recepcionista', '1990-03-20', 2);

-- Inserindo dados na tabela Estoque
INSERT INTO Estoque (tipo_sangue, volume_deposito)
VALUES ('A+', 10.5);

INSERT INTO Estoque (tipo_sangue, volume_deposito)
VALUES ('O-', 8.0);

select * from Usuario
