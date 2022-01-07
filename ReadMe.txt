It's an API Backend Node Mysql Project.
It has 3 routes for register, login and user_details. User can check the routes with Postman or Reqbin.
Make 1 changes on file DOTE_ENV.env file ==> remove the name DOTE_ENV and keep it as .env 

URL endpoints are :

1. localhost:8000/register ==> Expecting in body ==> {name,phone,email,password,education}
2. localhost:8000/login ==> Expecting in body ==> {email,password}
3. localhost:8000/profile/user_id ==> Expecting in body ==> {token}


COMMANDS TO BE USED:
1. npm i 
2. npm i nodemon -g
3. nodemon server.js


MYSQL CREATE DATABASE AND TABLE COMMANDS:
1. create database nodesql;
2. use nodesql;
3. create table users ( id INT AUTO_INCREMENT , name VARCHAR(255), email VARCHAR(255), phone VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id) );
4. create table users_education ( id INT, education VARCHAR(255) );


MYSQL TABLE STRUCTURE
1. describe users;

<pre>+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int          | NO   | PRI | NULL    | auto_increment |
| name     | varchar(255) | YES  |     | NULL    |                |
| email    | varchar(255) | YES  | UNI | NULL    |                |
| phone    | varchar(255) | YES  |     | NULL    |                |
| password | varchar(255) | YES  |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
</pre>

2. describe users_education;

<pre>+-----------+--------------+------+-----+---------+-------+
| Field     | Type         | Null | Key | Default | Extra |
+-----------+--------------+------+-----+---------+-------+
| id        | int          | YES  |     | NULL    |       |
| education | varchar(255) | YES  |     | NULL    |       |
+-----------+--------------+------+-----+---------+-------+</pre>



