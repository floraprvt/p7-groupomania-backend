# Groupomania (back-end)

Groupomania est un réseau social d'entreprise pour échanger des GIFS entre collègues. Il a été créé dans le cadre de la formation de développeur web d'Open Classrooms en octobre/novembre 2020.


## Technologies utilisées

Node.js, Express, MySQL, Sequelize et sont mis en place des outils pour respecter les règles de sécurité de l'OWASP.


## Pour démarrer le projet

Après avoir cloné le dossier, dans votre terminal, à l'intérieur de ce dossier, entrez successivement les commandes suivantes :

`npm install`

Avec mySQL et une base de données correspondante :
`mysql -u root -p` connectez vous à mySQL avec votre mot de passe
`CREATE DATABASE mydb`
`mysql -e "source /votrechemin/votrefichierdump.sql" mydb`

`npm start` ou `nodemon server`
Puis rendez-vous sur le dépôt : https://github.com/Flora-Pvt/p7-groupomania-frontend