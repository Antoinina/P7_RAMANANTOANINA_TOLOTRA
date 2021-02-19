# P7_RAMANANTOANINA_TOLOTRA

Welcome to the social app Groupomania

The application use different technologies : Express for back and Angular for front

To use this MVP, you need to install Node.js and to install some packages :
To secure and made a REST API
-Helmet : npm install helmet --save
-ESAPI : npm install node-esapi
-Rate limit : npm install --save express-rate-limit
-Install the certificat ssl in your root secured certification (./frontend/ssl/server.crt) --> double click and install

To configure the db with mysql
-MySQL : npm install mysql

To treat image file uploaded
-Multer : npm install --save multer

To secure the authentification
-JWT : npm install jsonwebtoken
-Bcrypt : npm install bcrypt


For the admin who configure the db, here you have the access :
mysql server : root --> Lalaina123@
DB name : publications
TABLE name : Articles, Users, Comments

app use session: secret = 'JlkjdLKJD25dzajk@zjDz'

And finally to run the app :
-Access to the backend folder --> in terminal start the connection with the db with "nodemon server"
-Access to the frontend folder --> in terminal start the server with "npm start"

Go to https://localhost:4200

To access with admin oiwer : email : admin@groupomania.fr 
                             password : adminAdmin
