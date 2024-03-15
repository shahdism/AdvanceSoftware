create database craft;
use craft;
create table users( userID char(10),
                     username char (10),
                     password char(10),
                     email char (50),
                     craftskills char (20),
                     intrests char (20) );
select * from users;
create table skill( skillID char(10),
                     skillname char (20));
select * from skill;
create table intrest( intrestID char(10),
                     intrestname char (10));
select * from intrest;

create table project( projectID char(10),
                     title char (20),
                     description char(150),
                     difflevel char (10),
                     groupsize char (20),
                     userID char (10) );
select * from project;
create table material( ID char(10),
                     name char (20),
                     userID char (10),
                     amount double
                    );
select * from material;
create table tool( toolID char(10),
                     toolname char (20),
                     userID char(10),
				
                     amount double );
select * from tool;
create table collaboration( ID char(10),
                     projectID char(10),
                   userID char(10),
                     statuss char (200) );
select * from collaboration;
create table communication( communicationID char(10),
                   collaborationID char (10),
                  message char(200),
                    
                     timestamp char (20) );
select * from communication;
create table resourceShare( resourceshareID char(10),
                    userID char (10),
                    materialID char(10),
                     toolID char (50)
                     );
select * from resourceShare;
create table showcase( caseID char(10),
                  projectID char (10),
                  
                     imageurl char (200) );
select * from showcase;

ALTER TABLE collaboration CHANGE collalID collaborationID char(20);
select * from material;