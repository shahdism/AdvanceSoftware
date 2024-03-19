create database craft;
use craft;
CREATE TABLE users (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE skill (
    skillID INT PRIMARY KEY AUTO_INCREMENT,
    skillName VARCHAR(50) NOT NULL
);

CREATE TABLE interest (
    interestID INT PRIMARY KEY AUTO_INCREMENT,
    interestName VARCHAR(50) NOT NULL
);

CREATE TABLE project (
    projectID INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    diffLevel VARCHAR(20),
    groupSize INT,
    userID INT,
    FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE material (
    materialID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    userID INT,
    amount DOUBLE,
    FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE tool (
    toolID INT PRIMARY KEY AUTO_INCREMENT,
    toolName VARCHAR(100) NOT NULL,
    userID INT,
    amount DOUBLE,
    FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE collaboration (
    collaborationID INT PRIMARY KEY AUTO_INCREMENT,
    projectID INT,
    userID INT,
    status VARCHAR(200)
);

CREATE TABLE communication (
    communicationID INT PRIMARY KEY AUTO_INCREMENT,
    collaborationID INT,
    senderID INT,
    message VARCHAR(200),
    timestamp TIMESTAMP
);

CREATE TABLE resourceShare (
    resourceShareID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    materialID INT,
    toolID INT
);

CREATE TABLE showcase (
    caseID INT PRIMARY KEY AUTO_INCREMENT,
    projectID INT,
    imageurl VARCHAR(200),
    description TEXT
);


