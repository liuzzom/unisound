-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gruppo5
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `friends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `following_id` int(11) NOT NULL,
  `followed_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (1,1,3);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `playlists` (
  `playlist_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `length` int(11) NOT NULL,
  `users_user_id` int(11) NOT NULL,
  PRIMARY KEY (`playlist_id`),
  KEY `fk_playlists_users1_idx` (`users_user_id`),
  CONSTRAINT `fk_playlists_users1` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--

LOCK TABLES `playlists` WRITE;
/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
INSERT INTO `playlists` VALUES (1,'Rock',2119,1),(9,'FF',510,1);
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists_has_songs`
--

DROP TABLE IF EXISTS `playlists_has_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `playlists_has_songs` (
  `playlists_playlist_id` int(11) NOT NULL,
  `songs_song_id` int(11) NOT NULL,
  PRIMARY KEY (`playlists_playlist_id`,`songs_song_id`),
  KEY `fk_playlists_has_songs_songs1_idx` (`songs_song_id`),
  KEY `fk_playlists_has_songs_playlists1_idx` (`playlists_playlist_id`),
  CONSTRAINT `fk_playlists_has_songs_playlists1` FOREIGN KEY (`playlists_playlist_id`) REFERENCES `playlists` (`playlist_id`),
  CONSTRAINT `fk_playlists_has_songs_songs1` FOREIGN KEY (`songs_song_id`) REFERENCES `songs` (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists_has_songs`
--

LOCK TABLES `playlists_has_songs` WRITE;
/*!40000 ALTER TABLE `playlists_has_songs` DISABLE KEYS */;
INSERT INTO `playlists_has_songs` VALUES (1,4),(9,6),(1,9),(1,11),(1,13),(1,15),(1,22),(1,23),(9,23),(9,24);
/*!40000 ALTER TABLE `playlists_has_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `songs` (
  `song_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `artist` varchar(45) NOT NULL,
  `album` varchar(45) NOT NULL,
  `length` int(11) NOT NULL,
  `path` varchar(128) NOT NULL,
  PRIMARY KEY (`song_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (1,'Apply Some Pressure','Maximo Park','A Certain Trigger',200,'songs/Apply_Some_Pressure.mp3'),(2,'Atlantide','Frencesco De Gregori','Vivavoce',229,'songs/Atlantide.mp3'),(3,'Piano Man','Billy Joel','The Essential Billy Joel',337,'songs/Billy_Joel_Piano_Man.mp3'),(4,'Blackbird','Alter Bridge','Blackbird',478,'songs/Blackbird.mp3'),(5,'Do You Love Me?','The Contours','Do You Love Me',173,'songs/do_you_love_me.mp3'),(6,'Evil And A Heathen','Franz Ferdinand','You Could Have It So Much Better',125,'songs/Evil_and_a_Heathen.mp3'),(7,'Gabriel\'s Oboe','Ennio Morricone','The Mission (soundtrack)',149,'songs/Gabriel\'s_Oboe.mp3'),(8,'Get Up And Get Down','The Dramatics','Watcha See Is Watcha Get',188,'songs/get_up_and_get_down.mp3'),(9,'Helicopter','Bloc Party','Silent Alarm',220,'songs/Helicopter.mp3'),(10,'Help Me, Rhonda','The Beach Boys','Help Me, Rhonda/Kiss Me Baby',164,'songs/help_me_rhonda.mp3'),(11,'Jeremy','Pearl Jam','Ten',319,'songs/Jeremy.mp3'),(12,'Khorakhanè','Fabrizio De Andrè','Anime Salve',332,'songs/Khorakhanè.mp3'),(13,'Narcotic','Liquido','Narcotic - EP',231,'songs/liquido_narcotic.mp3'),(14,'Liquor Store Blues','Bruno Mars (ft. Damien Marley)','Doo-Wops & Hooligans',229,'songs/Liquor_Store_Blues.mp3'),(15,'Pictures Of You','The Cure','Disintegration',448,'songs/Pictures_of_You.mp3'),(16,'Resonance','HOME','Odyssey',212,'songs/resonance_home.mp3'),(17,'Scar Tissue','Red Hot Chili Peppers','Californication',215,'songs/Scar_Tissue.mp3'),(18,'Square Hammer','Ghost','Popestar',239,'songs/Square_Hammer.mp3'),(19,'This Is The Last Time','The National','Trouble With Find Me',283,'songs/This_Is_The_Last_Time.mp3'),(20,'Wish You Were Here','Pink Floyd','Wish You Were Here',334,'songs/Wish_You_Were_Here.mp3'),(21,'Wish You Were Here','Incubus','Morning View',214,'songs/Incubus_Wish_You_Were_Here.mp3'),(22,'Coming Home','Alter Bridge','Blackbird',260,'songs/Coming_Home.mp3'),(23,'Bullet','Franz Ferdinand','Right Thoughts,Right Words,Right Action',163,'songs/Bullet.mp3'),(24,'Love Illumination','Franz Ferdinand','Right Thoughts,Right Words,Right Action',222,'songs/Love_Illumination.mp3');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(64) NOT NULL,
  `online` tinyint(4) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Mauro','Liuzzo','mauro.liuzzo@hotmail.it','90e32310d3e5a944ffba4564f82d4b78',1),(2,'Mario','Rossi','mario.rossi@email.it','a690152958adeb95e9767c279a90a987',0),(3,'Piero','Neri','piero.neri@email.it','d9655b4cd5f1d07f20787b2cfd6508f5',0);
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

-- Dump completed on 2018-08-02 17:40:34
