-- Crear la base de datos solo si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Laboratorio')
BEGIN
    CREATE DATABASE Laboratorio;
END
GO

-- Usar la base de datos
USE Laboratorio;
GO

-- Crear la tabla solo si no existe
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'rubros' AND type = 'U')
BEGIN
    CREATE TABLE rubros(
        rubro [int] IDENTITY(1,1) NOT NULL,
        descripcion varchar(100)  NOT NULL,
        activo [bit] NULL,
        codigo [int] NOT NULL,
        CONSTRAINT [pk_rubros] PRIMARY KEY CLUSTERED ([rubro] ASC) ON [PRIMARY],
        CONSTRAINT [uni_rub] UNIQUE NONCLUSTERED ([descripcion] ASC)
    ) ON [PRIMARY];
END
GO

-- Consultar los datos
SELECT * FROM rubros;
