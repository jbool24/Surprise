DROP DATABASE IF EXISTS `surprise_db`;
CREATE DATABASE `surprise_db`;
USE `surprise_db`;
--
-- Database: surprise_db
-- ------------------------------------------------------


--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventName` varchar(255) DEFAULT NULL,
  `eventDateTime` datetime NOT NULL,
  `eventOfferDuration` int(11) NOT NULL,
  `eventDescription` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventActive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (1,'happy hour','2017-03-21 23:00:44',30,'Half hour of free beer\n','2017-03-21 23:09:44','2017-03-21 23:09:44',0),(2,'sadhour','2017-03-21 23:09:44',30,'Double priced shots','2017-03-21 23:09:44','2017-03-21 23:09:44',0);
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
INSERT INTO `Sessions` VALUES (1,'2','788318f0-0e8b-11e7-b928-6fd478ca9db7',1,'2017-03-21 23:09:44','2017-03-21 23:09:44'),(2,'3','6a880fe0-0e94-11e7-8511-c333b58efd80',1,'2017-03-22 00:13:46','2017-03-22 00:13:46');
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserEvents`
--

DROP TABLE IF EXISTS `UserEvents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserEvents` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `EventId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`EventId`,`UserId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `UserEvents_ibfk_1` FOREIGN KEY (`EventId`) REFERENCES `Events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserEvents_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserEvents`
--

LOCK TABLES `UserEvents` WRITE;
/*!40000 ALTER TABLE `UserEvents` DISABLE KEYS */;
INSERT INTO `UserEvents` VALUES ('2017-03-21 23:09:44','2017-03-21 23:09:44',1,1),('2017-03-21 23:09:44','2017-03-21 23:09:44',1,2),('2017-03-21 23:09:44','2017-03-21 23:09:44',2,1);
/*!40000 ALTER TABLE `UserEvents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `countryCode` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `authyId` varchar(255) DEFAULT NULL,
  `authyStatus` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Justin','jpbellero@gmail.com','+1','9084562367','36606015',NULL,'$2a$10$VI9TLE74VdfHFDh1V/.Cauq1vLEbj.MBQnC9zxql/qx9ZQpfoQugS','2017-03-21 23:09:44','2017-03-21 23:09:44'),(2,'Kevin','kevinrlawler@gmail.com','+1','8472266734','36925943',NULL,'$2a$10$G5AeX6e3t.IJVrKCR8VfHeA3RRSB5U.CEPoJAhDskgjD3DUsK8c6q','2017-03-22 00:13:46','2017-03-22 00:13:46');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-22  9:08:46
