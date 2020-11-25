# Groupomania (back-end)

Groupomania est un réseau social d'entreprise pour échanger des GIFS entre collègues. Il a été créé dans le cadre de la formation de développeur web d'Open Classrooms en octobre/novembre 2020.


## Technologies utilisées

Node.js, Express, MySQL, Sequelize et sont mis en place des outils pour respecter les règles de sécurité de l'OWASP.


## Pour démarrer le projet

Après avoir cloné le dossier :

1. MySQL

Connectez vous à MySQL (dans MySQL command line : `mysql -u root -p` )

Ajouter la base de données à partir du fichier .sql contenu dans le dossier database : `SOURCE /votrechemin/database/dump-groupomania.sql` 

Créez un fichier config.json à la racine du dossier cloné (pensez à intégrer votre propre mot de passe) contenant :
```json
{
  "development": {
    "username": "root",
    "password": "votre-mot-de-passe",
    "database": "mydb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```


2. Node.js

Entrez `npm install` puis `npm start`



Maintenant rendez-vous sur le dépôt : https://github.com/Flora-Pvt/p7-groupomania-frontend