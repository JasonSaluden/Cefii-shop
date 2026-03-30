CREATE DATABASE IF NOT EXISTS cefiishop;
USE cefiishop;

CREATE TABLE IF NOT EXISTS Category (
    id_category INT PRIMARY KEY AUTO_INCREMENT,
    nom         VARCHAR(50)  NOT NULL,
    description VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS User (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    role       ENUM('ADMIN', 'CLIENT') NOT NULL DEFAULT 'CLIENT',
    pseudo     VARCHAR(50)  NOT NULL,
    mail       VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(100) NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Products (
    id_product  INT PRIMARY KEY AUTO_INCREMENT,
    nom         VARCHAR(150)   NOT NULL,
    description VARCHAR(250),
    prix        DECIMAL(10,2)  NOT NULL,
    stock       INT            NOT NULL DEFAULT 0,
    img_url     VARCHAR(150),
    id_category INT,
    CONSTRAINT fk_product_category FOREIGN KEY (id_category) REFERENCES Category(id_category)
);

CREATE TABLE IF NOT EXISTS `Order` (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    status     ENUM('EN_ATTENTE', 'PAYE', 'EXPEDIE', 'LIVRE', 'ANNULE') NOT NULL DEFAULT 'EN_ATTENTE',
    total      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id    INT           NOT NULL,
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS OrderLine (
    id             INT PRIMARY KEY AUTO_INCREMENT,
    id_order       INT           NOT NULL,
    id_produit     INT           NOT NULL,
    quantite       INT           NOT NULL,
    prix_unitaire  DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_orderline_order   FOREIGN KEY (id_order)   REFERENCES `Order`(id),
    CONSTRAINT fk_orderline_product FOREIGN KEY (id_produit)  REFERENCES Products(id_product)
);
