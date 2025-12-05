CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
create table Teacher(
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) Not null,
    email varchar(255) not null UNIQUE,
    possition varchar (255) not null,
    phone  varchar (255) not null UNIQUE,
    img varchar(255) null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
create table vacancy(
    id int  AUTO_INCREMENT PRIMARY KEY,
    possition varchar(100) not null,
    discription text null,
    deadline text null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)