USE studyconnect


CREATE TABLE Usuario (

id BIGINT NOT NULL IDENTITY(1,1) PRIMARY KEY,
nome VARCHAR(45) NOT NULL,
email VARCHAR(45) NOT NULL,
senha VARCHAR(40) NOT NULL,
tipoUsuario VARCHAR(20) NOT NULL,
ativo BIT

)


CREATE TABLE Curso (

id BIGINT NOT NULL IDENTITY(1,1) PRIMARY KEY,
nome VARCHAR(45) NOT NULL,
descricao VARCHAR(100) NOT NULL,
duracao VARCHAR(40) NOT NULL,
nivel VARCHAR(20) NOT NULL,
ativo BIT

)


CREATE TABLE Material (

id BIGINT NOT NULL IDENTITY(1,1) PRIMARY KEY,
titulo VARCHAR(60) NOT NULL,
descricao VARCHAR(100) NOT NULL,
categoria VARCHAR(20) NOT NULL,
ativo BIT,

curso_id BIGINT NOT NULL,

CONSTRAINT fk_material_curso
FOREIGN KEY (curso_id)
REFERENCES Curso(id)

)

CREATE TABLE Certificado (

id BIGINT NOT NULL IDENTITY(1,1) PRIMARY KEY,
nome VARCHAR(45) NOT NULL,
descricao VARCHAR(45) NOT NULL,
dataEmissao DATETIME2 NOT NULL,
nivel VARCHAR(20) NOT NULL,
ativo BIT,

usuario_id BIGINT NOT NULL,
curso_id BIGINT NOT NULL,

CONSTRAINT fk_certificado_usuario
FOREIGN KEY (usuario_id)
REFERENCES Usuario(id),

CONSTRAINT fk_certificado_curso
FOREIGN KEY (curso_id)
REFERENCES Curso(id)

)

select * from usuario

select * from certificado

select * from curso

select * from material

