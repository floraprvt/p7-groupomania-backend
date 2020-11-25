CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `commentId` int NOT NULL AUTO_INCREMENT,
  `gifId` int NOT NULL,
  `userId` int NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`commentId`),
  UNIQUE KEY `commentId_UNIQUE` (`commentId`),
  KEY `fk_comments_gifs1_idx` (`gifId`),
  KEY `fk_comments_users1_idx` (`userId`),
  CONSTRAINT `fk_comments_gifs1` FOREIGN KEY (`gifId`) REFERENCES `gifs` (`gifId`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_users1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (18,34,8,'ça nous arrive à tous !','2020-11-17 23:07:57','2020-11-17 23:07:57'),(19,35,8,'Une petite danse ?','2020-11-18 16:49:41','2020-11-18 16:49:41'),(20,36,12,'Carrément !','2020-11-18 17:54:46','2020-11-18 17:54:46'),(26,35,12,'Aller c\'est parti !','2020-11-19 13:34:24','2020-11-19 13:34:24'),(27,36,12,'D\'ailleurs on y va ?','2020-11-19 13:35:46','2020-11-19 13:35:46'),(35,34,12,'Ahah !','2020-11-19 14:10:22','2020-11-19 14:10:22'),(38,112,4,'Celui-là je l\'adore !','2020-11-23 14:17:20','2020-11-23 14:17:20'),(40,112,12,'Parfait ! ^^','2020-11-23 19:11:30','2020-11-23 19:11:30');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gifs`
--

DROP TABLE IF EXISTS `gifs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gifs` (
  `gifId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `likes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`gifId`),
  UNIQUE KEY `id_UNIQUE` (`gifId`),
  KEY `userId` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gifs`
--

LOCK TABLES `gifs` WRITE;
/*!40000 ALTER TABLE `gifs` DISABLE KEYS */;
INSERT INTO `gifs` VALUES (34,4,'Chuuut :)','http://localhost:4000/images/119026375_174969130853671_5283519569398814022_n.jpg','2020-11-17 21:15:29','2020-11-17 21:15:29',0),(35,8,'Hey macarena','http://localhost:4000/images/agdrr70_700b.jpg','2020-11-18 15:46:52','2020-11-18 15:46:52',0),(36,8,'Tous les matins !','http://localhost:4000/images/amx06am_700b.jpg','2020-11-18 16:56:18','2020-11-18 16:56:18',0),(106,8,'L\'hiver arrive..','http://localhost:4000/images/aYy0nWv_460svvp9.webm1605824181282.webm','2020-11-19 22:16:21','2020-11-19 22:16:21',0),(112,4,'Le talent !!','http://localhost:4000/images/gustavodudamelnaturalhabitat_webm1606140482036.webm','2020-11-23 14:08:02','2020-11-23 14:10:30',0),(137,12,'Comme chaque Noël...','http://localhost:4000/images/aWxXjBd_460swp_webp1606160610678.webp','2020-11-23 19:43:30','2020-11-23 19:43:30',0);
/*!40000 ALTER TABLE `gifs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `likeId` int NOT NULL AUTO_INCREMENT,
  `gifId` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`likeId`),
  UNIQUE KEY `likeId_UNIQUE` (`likeId`),
  KEY `gifId_idx` (`gifId`),
  KEY `userId_idx` (`userId`),
  KEY `fk_likes_users1_idx` (`userId`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_likes_users1_idx` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `gifId` FOREIGN KEY (`gifId`) REFERENCES `gifs` (`gifId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (24,34,8,'2020-11-18 16:31:47','2020-11-18 16:31:47'),(69,35,12,'2020-11-19 21:18:27','2020-11-19 21:18:27'),(70,34,12,'2020-11-19 21:18:31','2020-11-19 21:18:31'),(81,106,12,'2020-11-20 16:27:42','2020-11-20 16:27:42'),(82,36,12,'2020-11-20 16:27:46','2020-11-20 16:27:46'),(86,112,12,'2020-11-23 14:29:01','2020-11-23 14:29:01'),(87,137,4,'2020-11-23 21:02:32','2020-11-23 21:02:32'),(88,106,4,'2020-11-23 21:03:12','2020-11-23 21:03:12');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20201030132205-create_users_table.js'),('20201030140431-create_gifs_table.js'),('20201103161402-create_comments-table.js'),('20201110162953-create_likes_table.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `officePosition` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `userId_UNIQUE` (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Léo','Sergent','http://localhost:4000/images/pexels-jimmy-jimmy-1484794.jpg','développeur frontend','leoser@groupomania.fr','$2b$10$OUkW6O.CuDuwyvfbzrE/8OM0uNpGHdZcsKLP3iLcWx/r/wCns0ANK',0,'2020-11-04 22:23:33','2020-11-23 21:02:47'),(8,'Jane','Doe','http://localhost:4000/images/pexels-cottonbro-4098157.jpg','chargée de communication','jandoe@groupomania.fr','$2b$10$0WuxdqlNvgg/dgPMltGbReXysmg/XH6zR6JGB3ZQzNCToU95CjBNm',0,'2020-11-13 16:54:22','2020-11-15 00:41:31'),(12,'Béatrice','Dupont','http://localhost:4000/images/pexels-adrienn-1542085_jpg1605883404510.jpg','commerciale !','beadup@groupomania.fr','$2b$10$abZKhgOFw1rdcBK6cELEUeU6i6Xd2QMdhNThcjGcfVBKTMgx5qlci',0,'2020-11-18 17:54:26','2020-11-20 14:43:24'),(13,'John','Taylor','http://localhost:4000/images/pexels-italo-melo-2379004_jpg1605878525195.jpg','assistant','johtay@groupomania.fr','$2b$10$1ZQa2L1.gjgbjfqwEzwi4uZm08OVpj2r33WfIjzSAIM9EUwy9Vezy',0,'2020-11-20 13:22:05','2020-11-20 13:22:05');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-25  9:25:44
