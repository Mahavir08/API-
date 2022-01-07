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
