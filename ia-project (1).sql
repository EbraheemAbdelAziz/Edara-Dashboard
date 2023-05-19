-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 07:37 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ia-project`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `discription` text NOT NULL,
  `photo` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `warehouseId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `discription`, `photo`, `stock`, `warehouseId`) VALUES
(39, 'IPhone 11', 'It is a smart Phone . Liquid Retina HD display 6.1‑inch (diagonal) all-screen LCD Multi-Touch display with IPS technology 1792‑by‑828‑pixel resolution at 326 ppi 1400:1 contrast ratio (typical) True Tone display Wide color display (P3) Haptic Touch 625 nits max brightness (typical) ', '1682900527496.jpg', 15, 76),
(40, 'IPhone 11 Pro Max', 'It a smart phone more than Iphone 11 . Liquid Retina HD display 6.1‑inch (diagonal) all-screen LCD Multi-Touch display with IPS technology 1792‑by‑828‑pixel resolution at 326 ppi 1400:1 contrast ratio (typical) True Tone display Wide color display (P3) Haptic Touch 625 nits max brightness (typical) Fingerprint‑resistant oleophobic coating Support for display of multiple languages and characters simultaneously', '1682900669007.png', 10, 76),
(41, 'MI Smart Band 4', 'It is 39.9% larger than its predecessor, has a super capacitive AMOLED display and features.24/7 heart rate monitoring', '1682989291860.jpeg', 50, 77),
(42, 'MI Smart Band 5', ' skills in nursing. The post holder will be responsible for the assessment of care needs, the development of programmes of care and their implementation and evaluation', '1682901103543.jpeg', 60, 77),
(43, 'Laptop DELL G3  ', 'Dell G3 15 3579 is a Windows 10 laptop with a 15.60-inch display. It is powered by a Core i7 processor and it comes with 8GB of RAM. The Dell G3 15 3579 packs 128GB of SSD storage.  Connectivity options include Wi-Fi 802.11 ac.', '1682901345927.jpeg', 22, 78),
(44, 'Laptop DELL G5', 'Dell G5 Gaming Laptop 15.6\" Full HD 1920 x 1080 LED Display, 8th Gen 6 Core Intel i7-8750H Processor, 16GB Memory, 256GB SSD +1TB HDD, NVIDIA GeForce GTX 1050Ti', '1682901440479.jpg', 40, 78),
(45, 'IPhone 13', 'Iphone 13. Boasts an advanced dual-camera system that allows you to click mesmerising pictures with immaculate clarity. Furthermore, the lightning-fast a15 bionic chip allows for seamless multitasking, elevating your performance to a new dimension. A big leap in battery life', '1682988611586.jpg', 20, 76),
(47, ' Apple Watch Series 7 GPS 45mm Aluminium', 'Big screen. Huge impact. The larger display enhances the entire experience, making Apple Watch easier to use and read. Series 7 represents our biggest and brightest thinking yet. The challenge was to create a bigger display while barely expanding the dimensions of the watch itself.', '1682988874996.jpeg', 16, 77),
(48, 'Watch Series 8 GPS 45mm Aluminium', 'Big screen. Huge impact. The larger display enhances the entire experience, making Apple Watch easier to use and read. Series 7 represents our biggest and brightest thinking yet. The challenge was to create a bigger display while barely expanding the dimensions of the watch itself.', '1682988976652.jpeg', 23, 77),
(49, 'HP Pavilion 15-EG0079NE', 'Laptop With 15.6-inch Core i7-1165G7 16Gb RAM 1TB SSD 2GB Nvidia GeForce MX450 DOS English/Arabic Silver or Black .', '1682989445235.jpeg', 35, 78),
(50, 'APPLE Macbook Air MGN63AB/A', '13-Inch Display, M1 Chip With 8-Core Processor And 7-Core Graphics/8GB RAM/256GB SSD/Mac OS English/Arabic Space Grey', '1682989580171.jpeg', 5, 78),
(51, 'OPPO Reno 8T Dual SIM Midnight Black', 'OPPO Reno 8T Dual SIM 6.43 inches Smartphone 256GB 8GB RAM|UAE Version|5000mAh Long Lasting Battery |Fingerprint and Face Recognition | 4G Android Phone, Midnight Black| Octa Core Processor and 8GB RAM Offers efficient multitasking and fast charging | 100mp primary camera extra HD, Bokeh flare portrait Selfie HDR.', '1682989980484.jpeg', 30, 82),
(52, ' OPPO Reno 7 Dual Sim Black', 'The OPPO Reno6 features up to 8 GB + 128 GB of internal storage for all your memories. And, in case that’s not enough, you can enjoy its RAM expansion capabilities as well This mobile phone features a fingerprint-proof finish for an aesthetic appeal. And, with the Flash Snapshot', '1682990062795.jpeg', 14, 82),
(53, ' OPPO A17', ' 4GB RAM 64GB 4G LTE - International Version.Premium Leather-Feel Design, Water Resistence 50mp primary camera with Night view selfie Portrait Mode', '1682990181027.jpeg', 17, 82),
(54, ' OPPO Reno 7 Orange', 'The OPPO Reno6 features up to 8 GB + 128 GB of internal storage for all your memories. And, in case that’s not enough, you can enjoy its RAM expansion capabilities as well This mobile phone features a fingerprint-proof finish for an aesthetic appeal. And, with the Flash Snapshot.', '1682990264058.jpeg', 3, 82),
(55, 'SODO Bluetooth Over-Ear Headphones', 'Built-in HD microphone delivers clearer and more real talking sound in stereo mode Equipped with BT Version 5.0, which brings you an unprecedented experience Supports BT, TF card and AUX IN multiple playback mod', '1682990474339.jpeg', 10, 83),
(56, 'Generic AirDots Wireless In-Ear Headphones', 'Equipped with the latest Bluetooth 5.0 chip for seamless connectivity Data transfer rate is up to twice as high as the previous generation Top-grade speakers provides incredible sound quality with bass Each headset has a built-in 40 mAh battery', '1682990589605.jpeg', 13, 83),
(57, 'JBL Tune 510 BT Wireless Blue', 'Jbl tune 510 bt the jbl tune 510bt headphones let you stream powerful jbl pure bass sound with no strings attached. Easy to use, with up to 40 hours of battery life and speed charge, they are super lightweight and comfortable,Jbl tune 510 bt the jbl tune 510bt headphones let you stream powerful jbl pure bass sound with no strings attached. Easy to use, with up to 40 hours of battery life and speed charge, they are super lightweight and comfortable', '1682990678228.jpeg', 16, 83),
(58, ' SODO Headphones Sd-1003 Grey', 'Use bt or aux connection 6 to 8 hours working time Built in microphone and noise cancelation', '1682990824156.jpeg', 13, 83);

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 2 COMMENT '0 --> Declined\r\n1 --> Aproved \r\n2 --> Wating',
  `supervisorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id`, `amount`, `productId`, `status`, `supervisorId`) VALUES
(13, 2, 43, 1, 57),
(14, 10, 39, 2, 11),
(16, 3, 43, 0, 57),
(17, 5, 48, 1, 56);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 -> in-Active\r\n1 -> active',
  `type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 -> supervisor\r\n1 -> admin',
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `phone`, `status`, `type`, `token`) VALUES
(9, 'ahmed@gmail.com', '$2b$10$nRDKePeE3yEqGtu7hQGH2eaVn565AVvqRVFf6RCOL64wiNMCvOraS', 1144903279, 0, 1, '3e1d0c13387e1b2c71bb05e0968679ea'),
(11, 'zizoo@gmail.com', '$2b$10$c2qrU6gWyB2byBxS.WY3ru.daKnClQ9kt1C1e4anBCcIsh0NO7pze', 1144903279, 1, 0, '589d3650ec8de756d363565c79db0640'),
(56, 'badr@gmail.com', '$2b$10$G2HCTVxO.jK2nIB8p.z7OeS4T3WaCDy/3ZZpiwbvdO1MjS4cfa3EW', 1026049630, 1, 0, '31f35f1d049fec354b0dd02a3269c374'),
(57, 'abdo@gmail.com', '$2b$10$RgfgQ9R3RXrf9l3SzNYhpOFm2Pf9aFsCsBXW.ztzk.uLwJljZJBZS', 1598763541, 1, 0, '32e19710abf59fbdba21f5934c1d583e'),
(58, 'taha@gmail.com', '$2b$10$CK37afDCENZ8TiI2SAg13ODCeSiJCFWwnBc1dic4q/shvG4dlYcV6', 2147483647, 1, 0, '2fcd4b2c1ac620294ce953801dd261fe'),
(59, 'zaki@gmail.com', '$2b$10$be/Quj1YGF4.A4HjH42jOeXl9d5sX.BIDh35fP5A8kXr5dFOzEhTq', 159875364, 1, 0, 'eb878511595233c0ea5092adc73371bf');

-- --------------------------------------------------------

--
-- Table structure for table `warehouse`
--

CREATE TABLE `warehouse` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0 -> In-Active\r\n1 -> Active',
  `supervisorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `warehouse`
--

INSERT INTO `warehouse` (`id`, `name`, `location`, `status`, `supervisorId`) VALUES
(76, 'Cairo', '13 Mohamed Ali St , Cairo , Egypt ', 1, 11),
(77, 'El Maadi ', '15 El Nahda St , El Maadi , Cairo , Egypt  ', 1, 56),
(78, 'Alexandria ', 'El Ebrahemeiaa , Alexandria ,Egypt', 1, 57),
(82, 'EL GONNA', 'Marina Town, Mediterranean Neighborhood, Red Sea , Egypt', 1, 58),
(83, 'Helwan', '26 Mahmoud EL Shamy St , Helwan , Cairo , Egypt', 1, 59);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `warehouseId` (`warehouseId`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `request_ibfk_1` (`productId`),
  ADD KEY `supervisorId` (`supervisorId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `warehouse_ibfk_1` (`supervisorId`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `warehouse`
--
ALTER TABLE `warehouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`warehouseId`) REFERENCES `warehouse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`supervisorId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
