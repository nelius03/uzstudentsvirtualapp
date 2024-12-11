-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2024 at 08:18 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `virtualapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `faculty_chairpersons`
--

CREATE TABLE `faculty_chairpersons` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `faculty` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty_chairpersons`
--

INSERT INTO `faculty_chairpersons` (`id`, `name`, `email`, `faculty`) VALUES
(1, 'Dr. John Doe', 'chair.science@university.edu', 'Faculty of Science'),
(2, 'Dr. Jane Smith', 'chair.arts@university.edu', 'Faculty of Arts'),
(3, 'Dr. Emily Johnson', 'chair.engineering@university.edu', 'Faculty of Engineering');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `link` varchar(255) NOT NULL,
  `type` enum('pdf','document') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `title`, `description`, `link`, `type`) VALUES
(1, 'Current Fees', 'The current fees document.', 'path/to/fees.pdf', 'pdf'),
(2, 'Examination Guidelines', 'Guidelines for examinations.', 'path/to/exams.pdf', 'pdf'),
(3, 'Academic Timetable', 'Academic timetable for the semester.', 'path/to/timetable.pdf', 'pdf');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(400) NOT NULL,
  `email` varchar(400) NOT NULL,
  `regnumber` varchar(400) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `email`, `regnumber`, `password`) VALUES
('Farai', 'farie@gmail.com', 'RX12345', '1234'),
('fafie', 'fafie@gmail.com', 'RX1234578', '1234'),
('Rue', 'r@mail.com', 'RX12345', '1234'),
('raygie', 'rg@mail.com', 'RX1234578v', '1234'),
('fadzai', 'fmoyo@mmaj.com', 'R23474447', '1234'),
('', '', '', ''),
('chari', 'chari@mail.com', 'R23474447x2', '1234'),
('ksharp', 'kmail@mail.com', 'R23445W', '1234'),
('hp', 'goshv@gmail.com', 'R23474447f', '12345'),
('hpx', 'josph@gmail.comc', 'Y23345', '1234'),
('doc', 'gray@mail.com', 'R23455', '12345'),
('cj', 'cj@mail.com', '747474', '1234'),
('wtticozw', 'h', '23344', '1234'),
('soweto', 'soweto@mail.com', 'R34354T', '1234'),
('hhh', 'gggggggg', 'R23474447', '1234'),
('chipo', 'mawere', 'R2667E', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `faculty_chairpersons`
--
ALTER TABLE `faculty_chairpersons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faculty_chairpersons`
--
ALTER TABLE `faculty_chairpersons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
