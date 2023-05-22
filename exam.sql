-- MariaDB dump 10.19  Distrib 10.11.3-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: exam
-- ------------------------------------------------------
-- Server version	10.11.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `question_id` bigint(20) NOT NULL,
  `people_id` bigint(20) NOT NULL,
  `exam_id` bigint(20) NOT NULL,
  `paper_id` bigint(20) NOT NULL,
  `answer` text NOT NULL,
  `state` tinyint(1) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `answer_exam_id_fk` (`exam_id`),
  KEY `answer_paper_id_fk` (`paper_id`),
  KEY `answer_people_id_fk` (`people_id`),
  KEY `answer_question_id_fk` (`question_id`),
  CONSTRAINT `answer_exam_id_fk` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`),
  CONSTRAINT `answer_paper_id_fk` FOREIGN KEY (`paper_id`) REFERENCES `paper` (`id`),
  CONSTRAINT `answer_people_id_fk` FOREIGN KEY (`people_id`) REFERENCES `people` (`id`),
  CONSTRAINT `answer_question_id_fk` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES
(11,1,1,9,1,'A',0,'123',0,'2023-05-21 18:14:01','2023-05-22 12:52:02'),
(12,3,1,9,1,'false',NULL,NULL,0,'2023-05-21 18:17:56','2023-05-21 18:23:23'),
(13,5,1,9,1,'A',NULL,NULL,0,'2023-05-21 18:17:58','2023-05-21 18:38:37'),
(14,6,1,9,1,'A',NULL,NULL,0,'2023-05-21 18:17:58','2023-05-21 18:38:38'),
(15,7,1,9,1,'A',NULL,NULL,0,'2023-05-21 18:17:59','2023-05-21 18:38:39'),
(18,10,1,9,1,'A',NULL,NULL,0,'2023-05-21 18:18:11','2023-05-21 18:38:42'),
(20,4,1,9,1,'1',NULL,NULL,0,'2023-05-21 18:23:25','2023-05-21 18:38:38'),
(21,2,1,9,1,'B,C,D,A',1,'123',0,'2023-05-21 18:42:37','2023-05-22 12:52:07');
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exam` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `people_id` int(11) NOT NULL,
  `paper_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `submitted` tinyint(1) NOT NULL DEFAULT 0,
  `marked` tinyint(1) NOT NULL DEFAULT 0,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
INSERT INTO `exam` VALUES
(9,1,1,'2023-05-21 14:36:08',1,1,0,'2023-05-21 14:36:08','2023-05-22 15:52:51'),
(10,1,1,'2022-05-21 20:18:00',0,0,0,'2023-05-21 20:18:00','2023-05-21 20:18:00'),
(11,1,1,'2023-05-22 13:09:12',1,0,0,'2023-05-22 13:09:12','2023-05-22 13:09:16');
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paper`
--

DROP TABLE IF EXISTS `paper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paper` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  `expired` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paper`
--

LOCK TABLES `paper` WRITE;
/*!40000 ALTER TABLE `paper` DISABLE KEYS */;
INSERT INTO `paper` VALUES
(1,'试卷2',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36'),
(2,'试卷3',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36'),
(3,'试卷4',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36'),
(4,'试卷5',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36'),
(5,'试卷6',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36'),
(6,'试卷7',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36'),
(7,'试卷8',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36'),
(8,'试卷9',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36'),
(9,'试卷10',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36'),
(10,'试卷11',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36'),
(11,'试卷12',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36'),
(12,'试卷13',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36'),
(13,'试卷14',3600,0,'2023-05-20 20:42:28','2023-05-20 20:42:36');
/*!40000 ALTER TABLE `paper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paper_question_mapping`
--

DROP TABLE IF EXISTS `paper_question_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paper_question_mapping` (
  `paper_id` bigint(20) NOT NULL,
  `question_id` bigint(20) NOT NULL,
  KEY `paper_question_mapping_question_id_fk` (`question_id`),
  KEY `paper_question_mapping_paper_id_fk` (`paper_id`),
  CONSTRAINT `paper_question_mapping_paper_id_fk` FOREIGN KEY (`paper_id`) REFERENCES `paper` (`id`),
  CONSTRAINT `paper_question_mapping_question_id_fk` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paper_question_mapping`
--

LOCK TABLES `paper_question_mapping` WRITE;
/*!40000 ALTER TABLE `paper_question_mapping` DISABLE KEYS */;
INSERT INTO `paper_question_mapping` VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(1,7),
(1,8),
(1,9),
(1,10);
/*!40000 ALTER TABLE `paper_question_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `people` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(18) NOT NULL,
  `password` varchar(18) NOT NULL,
  `role_id` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `people_role_id_fk` (`role_id`),
  CONSTRAINT `people_role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` VALUES
(1,'admin','admin',1,0,'2023-05-20 09:26:25','2023-05-20 09:26:25');
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `type` enum('single','multi','judgment','fill') NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES
(1,'单选1','single',0,'2023-05-20 12:27:03','2023-05-20 12:27:03'),
(2,'题目2','multi',0,'2023-05-20 12:28:54','2023-05-20 12:28:54'),
(3,'题目3','judgment',0,'2023-05-20 12:29:00','2023-05-20 12:29:00'),
(4,'题目4','fill',0,'2023-05-20 12:29:07','2023-05-20 12:29:07'),
(5,'题目1','single',0,'2023-05-20 12:30:37','2023-05-20 12:30:37'),
(6,'题目1','single',0,'2023-05-20 12:30:39','2023-05-20 12:30:39'),
(7,'题目1','single',0,'2023-05-20 12:30:41','2023-05-20 12:30:41'),
(8,'题目1','single',0,'2023-05-20 12:30:42','2023-05-20 12:30:42'),
(9,'题目1','single',0,'2023-05-20 12:30:43','2023-05-20 12:30:43'),
(10,'题目1','single',0,'2023-05-20 12:30:45','2023-05-20 12:30:45'),
(11,'题目1','single',0,'2023-05-20 12:30:46','2023-05-20 12:30:46'),
(12,'题目1','single',0,'2023-05-20 12:30:46','2023-05-20 12:30:46'),
(13,'题目1','single',0,'2023-05-20 12:30:46','2023-05-20 12:30:46'),
(14,'题目1','single',0,'2023-05-20 12:30:46','2023-05-20 12:30:46'),
(15,'题目1','single',0,'2023-05-20 12:30:46','2023-05-20 12:30:46'),
(16,'题目1','single',0,'2023-05-20 12:30:46','2023-05-20 12:30:46'),
(17,'题目1','single',0,'2023-05-20 12:30:46','2023-05-20 12:30:46'),
(18,'题目2','single',0,'2023-05-20 12:30:46','2023-05-20 19:37:25');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES
(1,'admin',0,'2023-05-20 09:25:28','2023-05-20 09:25:28');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-22 16:23:15
