CREATE DATABASE doacaoVital; # Criando o Banco

USE doacaoVital; # Usando o Banco

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
FOREIGN KEY (id_usuario) REFERENCES Usuario(id_user) ON DELETE CASCADE
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

INSERT INTO Tipo_sangue (descricao) VALUES
('A+'),('A-'),
('B+'),('B-'),
('AB+'),('AB-'),
('O+'),('O-');

INSERT INTO Hemocentro (nome_hemocentro, bairro_hemo, rua_hemo, numero_hemo, cidade_hemo, telefone_hemocentro)
VALUES 
('Hemocentro Central', 'Centro', 'Rua das Flores', '123', 'São Paulo', '(11) 98765-4321'),
('Hemocentro Regional', 'Jardins', 'Avenida Brasil', '456', 'Rio de Janeiro', '(21) 91234-5678');

INSERT INTO Funcionarios (nome_func, cpf_func, bairro_func, rua_func, numero_func, cidade_func, telefone_func, id_sangue, email_func, senha_func, cargo, data_nasc, id_hemocentro) 
VALUES 
('ADMIN1', '123.456.789-00', 'BA', 'RA', '1234', 'CA', '(00) 12345-6789', 1, 'ADMON@admin.com', 'admin', 'ADMIN', '1212-12-12', 1);

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
