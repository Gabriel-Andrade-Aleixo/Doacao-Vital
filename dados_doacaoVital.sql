-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: doacaoVital
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `estoque`
--

DROP TABLE IF EXISTS `estoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoque` (
  `id_estoque` int NOT NULL AUTO_INCREMENT,
  `tipo_sangue` varchar(3) DEFAULT NULL,
  `volume_deposito` double DEFAULT NULL,
  PRIMARY KEY (`id_estoque`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque`
--

LOCK TABLES `estoque` WRITE;
/*!40000 ALTER TABLE `estoque` DISABLE KEYS */;
INSERT INTO `estoque` VALUES (1,'A+',450),(2,'A-',450),(3,'B+',450),(4,'B-',450),(5,'AB+',450),(6,'AB-',450),(7,'O+',450),(8,'O-',450);
/*!40000 ALTER TABLE `estoque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `id_funcionario` int NOT NULL AUTO_INCREMENT,
  `nome_func` varchar(70) DEFAULT NULL,
  `cpf_func` varchar(14) DEFAULT NULL,
  `bairro_func` varchar(100) DEFAULT NULL,
  `rua_func` varchar(100) DEFAULT NULL,
  `numero_func` char(4) DEFAULT NULL,
  `cidade_func` varchar(100) DEFAULT NULL,
  `telefone_func` varchar(15) DEFAULT NULL,
  `email_func` varchar(40) DEFAULT NULL,
  `senha_func` varchar(20) DEFAULT NULL,
  `cargo` varchar(20) DEFAULT NULL,
  `data_nasc` date DEFAULT NULL,
  `id_hemocentro` int DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`),
  UNIQUE KEY `cpf_func` (`cpf_func`),
  KEY `id_hemocentro` (`id_hemocentro`),
  CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`id_hemocentro`) REFERENCES `hemocentro` (`id_hemocentro`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'ADMIN1','123.456.789-00','BA','RA','1234','CA','(00) 12345-6789','ADMON@admin.com','admin','ADMIN','1212-12-12',1);
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hemocentro`
--

DROP TABLE IF EXISTS `hemocentro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hemocentro` (
  `id_hemocentro` int NOT NULL AUTO_INCREMENT,
  `nome_hemocentro` varchar(20) DEFAULT NULL,
  `bairro_hemo` varchar(50) DEFAULT NULL,
  `rua_hemo` varchar(50) DEFAULT NULL,
  `numero_hemo` varchar(4) DEFAULT NULL,
  `cidade_hemo` varchar(50) DEFAULT NULL,
  `telefone_hemocentro` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_hemocentro`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hemocentro`
--

LOCK TABLES `hemocentro` WRITE;
/*!40000 ALTER TABLE `hemocentro` DISABLE KEYS */;
INSERT INTO `hemocentro` VALUES (1,'Hemocentro Central','Centro','Rua das Flores','123','São Paulo','(11) 98765-4321'),(2,'Hemocentro Regional','Jardins','Avenida Brasil','456','Rio de Janeiro','(21) 91234-5678');
/*!40000 ALTER TABLE `hemocentro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solic_sangue`
--

DROP TABLE IF EXISTS `solic_sangue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solic_sangue` (
  `id_solic` int NOT NULL AUTO_INCREMENT,
  `tipo_solic` varchar(12) DEFAULT NULL,
  `qtda_sangue` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_solic`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `solic_sangue_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solic_sangue`
--

LOCK TABLES `solic_sangue` WRITE;
/*!40000 ALTER TABLE `solic_sangue` DISABLE KEYS */;
/*!40000 ALTER TABLE `solic_sangue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_sangue`
--

DROP TABLE IF EXISTS `tipo_sangue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_sangue` (
  `id_sangue` int NOT NULL AUTO_INCREMENT,
  `descricao` char(3) DEFAULT NULL,
  PRIMARY KEY (`id_sangue`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_sangue`
--

LOCK TABLES `tipo_sangue` WRITE;
/*!40000 ALTER TABLE `tipo_sangue` DISABLE KEYS */;
INSERT INTO `tipo_sangue` VALUES (1,'A+'),(2,'A-'),(3,'B+'),(4,'B-'),(5,'AB+'),(6,'AB-'),(7,'O+'),(8,'O-');
/*!40000 ALTER TABLE `tipo_sangue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `nome_user` varchar(70) DEFAULT NULL,
  `cpf_user` varchar(14) DEFAULT NULL,
  `bairro_user` varchar(100) DEFAULT NULL,
  `rua_user` varchar(100) DEFAULT NULL,
  `numero_user` char(4) DEFAULT NULL,
  `cidade_user` varchar(50) DEFAULT NULL,
  `telefone_user` varchar(15) DEFAULT NULL,
  `id_sangue` int DEFAULT NULL,
  `email_user` varchar(40) DEFAULT NULL,
  `senha_user` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `cpf_user` (`cpf_user`),
  KEY `id_sangue` (`id_sangue`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_sangue`) REFERENCES `tipo_sangue` (`id_sangue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-20 10:15:29
