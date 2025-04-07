-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 04, 2025 at 10:19 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sd2-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `averageSpeed` double NOT NULL,
  `distance` double NOT NULL,
  `elevation` double NOT NULL,
  `movingTime` double NOT NULL,
  `member_id` int NOT NULL,
  `routeGeoJson` text NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `type`, `averageSpeed`, `distance`, `elevation`, `movingTime`, `member_id`, `routeGeoJson`) VALUES
(1, 'RUN', 15.5, 100, 50, 1.5, 1, NULL),
(2, 'CYCLE', 12, 80, 30, 2, 2, NULL),
(3, 'RUN', 18, 120, 75, 1.75, 3, NULL),
(4, 'CYCLE', 10, 50, 25, 3, 4, NULL),
(5, 'CYCLE', 10, 50, 25, 3, 1, NULL),
(6, 'RUN', 10, 50, 25, 3, 1, NULL),
(7, 'CYCLE', 10, 50, 25, 3, 1, NULL),
(8, 'CYCLE', 10, 50, 25, 3, 1, NULL),
(9, 'RUN', 10, 50, 25, 3, 1, NULL),
(10, 'RUN', 14, 90, 40, 1.25, 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int NOT NULL,
  `date` datetime NOT NULL,
  `text` text NOT NULL,
  `member_id` int NOT NULL,
  `post_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `date`, `text`, `member_id`, `post_id`) VALUES
(1, '2025-03-07 10:30:00', 'Great job on the run!', 2, 1),
(2, '2025-03-07 11:30:00', 'Keep it up!', 1, 2),
(3, '2025-03-07 12:30:00', 'Such an amazing book!', 3, 3),
(4, '2025-03-07 13:30:00', 'Yum! That pizza looks amazing!', 4, 4),
(5, '2025-03-07 14:30:00', 'That trip sounds awesome!', 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `community`
--

CREATE TABLE `community` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `community`
--

INSERT INTO `community` (`id`, `name`, `description`) VALUES
(1, 'Nature Lovers', 'A community of people who love nature and outdoor activities'),
(2, 'Tech Enthusiasts', 'A community for people interested in technology and programming'),
(3, 'Book Club', 'A community of book lovers'),
(4, 'Foodies', 'A community for people who love to cook and eat good food'),
(5, 'Travel Junkies', 'A community for people who love to travel the world');

-- --------------------------------------------------------

--
-- Table structure for table `community_membership`
--

CREATE TABLE `community_membership` (
  `member_id` int NOT NULL,
  `community_id` int NOT NULL,
  `join_date` datetime NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `community_membership`
--

INSERT INTO `community_membership` (`member_id`, `community_id`, `join_date`, `role`) VALUES
(1, 1, '2025-03-07 09:00:00', 'member'),
(2, 2, '2025-03-07 09:15:00', 'member'),
(3, 3, '2025-03-07 09:30:00', 'admin'),
(4, 2, '2025-03-07 09:15:00', 'member'),
(5, 2, '2025-03-07 09:15:00', 'member');

-- --------------------------------------------------------

--
-- Table structure for table `likes_table`
--

CREATE TABLE `likes_table` (
  `id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `likes_table`
--

INSERT INTO `likes_table` (`id`, `comment_id`, `post_id`) VALUES
(1, 1, NULL),
(2, 2, NULL),
(3, 3, NULL),
(4, 4, NULL),
(5, 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `bio` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `email`, `name`, `password`, `username`, `bio`) VALUES
(1, 'john.doe@example.com', 'John Doe', '$2b$10$voUK3K7ipLI6TGLsmfvYLeHZt.LFeWL2A6lvnebME2PzZjpdm2RP.', 'john_doe', 'John Doe bio'),
(2, 'jane.smith@example.com', 'Jane Smith', '$2b$10$p7SknVFA.cgA9CjoWuSra.ZKxm2A.uwOJiMhf9CNR.Nl3sJKQAUCy', 'jane_smith', 'Jane Smith bio'),
(3, 'alex.jones@example.com', 'Alex Jones', '$2b$10$mGJ2bSKr2gAwNRFq4s//yOogIXZ9PPtHgs8o1VfXJU2BOv..23oHu', 'alex_jones', 'Alex Jones bio'),
(4, 'maria.gonzalez@example.com', 'Maria Gonzalez', '$2b$10$ooZ01c42/XA6xqWz60rXS.4OeECsZFizkeJanoHl7aCeEYyPKt1Ju', 'maria_gonzalez', 'Maria Gonzalez bio'),
(5, 'chris.wilson@example.com', 'Chris Wilson', '$2b$10$AFuec.2hcX1TVr65dGjMyumyrnvBDnDcef6ngwjImqdHQmW6Qcu6C', 'chris_wilson', 'Chris Wilson bio');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int NOT NULL,
  `date` datetime NOT NULL,
  `text` text NOT NULL,
  `community_id` int NOT NULL,
  `writer_id` int NOT NULL,
  `activity_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `date`, `text`, `community_id`, `writer_id`, `activity_id`) VALUES
(1, '2025-03-07 10:00:00', 'Just finished a 10km run!', 1, 1, 1),
(2, '2025-03-07 11:00:00', 'Working on a new tech project', 2, 2, 2),
(3, '2025-03-07 12:00:00', 'Just finished reading a great book!', 3, 3, 3),
(4, '2025-03-07 13:00:00', 'Made a delicious pizza tonight!', 4, 4, 4),
(5, '2025-03-07 14:00:00', 'Planning my next trip to Japan!', 5, 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `reward`
--

CREATE TABLE `reward` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `requirements` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `community_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reward`
--

INSERT INTO `reward` (`id`, `name`, `requirements`, `type`, `community_id`) VALUES
(1, 'Top Contributor', 'Participate in at least 10 posts', 'Badge', 1),
(2, 'Tech Guru', 'Help 5 people in the community', 'Badge', 2),
(3, 'Bookworm', 'Read 5 books in a month', 'Certificate', 3),
(4, 'Master Chef', 'Cook 3 dishes and share with the community', 'Voucher', 4),
(5, 'Globetrotter', 'Travel to 5 different countries', 'Trophy', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `community`
--
ALTER TABLE `community`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `community_membership`
--
ALTER TABLE `community_membership`
  ADD PRIMARY KEY (`member_id`,`community_id`),
  ADD KEY `community_id` (`community_id`);

--
-- Indexes for table `likes_table`
--
ALTER TABLE `likes_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_id` (`comment_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `community_id` (`community_id`),
  ADD KEY `writer_id` (`writer_id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- Indexes for table `reward`
--
ALTER TABLE `reward`
  ADD PRIMARY KEY (`id`),
  ADD KEY `community_id` (`community_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `community`
--
ALTER TABLE `community`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `likes_table`
--
ALTER TABLE `likes_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reward`
--
ALTER TABLE `reward`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);

--
-- Constraints for table `community_membership`
--
ALTER TABLE `community_membership`
  ADD CONSTRAINT `community_membership_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  ADD CONSTRAINT `community_membership_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `community` (`id`);

--
-- Constraints for table `likes_table`
--
ALTER TABLE `likes_table`
  ADD CONSTRAINT `likes_table_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`),
  ADD CONSTRAINT `likes_table_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`community_id`) REFERENCES `community` (`id`),
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`writer_id`) REFERENCES `member` (`id`),
  ADD CONSTRAINT `post_ibfk_3` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`);

--
-- Constraints for table `reward`
--
ALTER TABLE `reward`
  ADD CONSTRAINT `reward_ibfk_1` FOREIGN KEY (`community_id`) REFERENCES `community` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
