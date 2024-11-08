CREATE DATABASE contact_management;

USE contact_management;


CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone BIGINT NOT NULL,
    address TEXT NOT NULL
);
