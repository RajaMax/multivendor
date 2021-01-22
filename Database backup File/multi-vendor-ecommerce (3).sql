-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2020 at 08:04 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `multi-vendor-ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `banner_id` int(11) NOT NULL,
  `banner_name` varchar(255) DEFAULT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`banner_id`, `banner_name`, `banner_image`, `status`, `created_by`, `created_date`, `updated_date`) VALUES
(2, 'name', 'image4.jpg', 0, NULL, '2020-07-02 08:49:51', '2020-07-02 08:49:51'),
(3, 'name1', 'image4.jpg', 0, NULL, '2020-07-07 04:14:34', '2020-07-07 04:14:34');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` longtext DEFAULT NULL,
  `category_image` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_image`, `status`, `created_by`, `created_date`, `updated_date`) VALUES
(3, 'categorydemo123', 'download.jpg', 1, NULL, '2020-06-26 11:24:59', '2020-06-26 11:24:59'),
(4, 'category4', 'download.jpg', 1, NULL, '2020-06-26 12:04:54', '2020-06-26 12:04:54'),
(5, 'category6', 'download.jpg', 1, NULL, '2020-07-07 04:29:02', '2020-07-07 04:29:02'),
(6, 'category_name', 'image_2020_04_07T13_45_47_557Z.png', 0, NULL, '2020-07-14 09:01:45', '2020-07-14 09:01:45');

-- --------------------------------------------------------

--
-- Table structure for table `demo1`
--

CREATE TABLE `demo1` (
  `id` int(11) NOT NULL,
  `name` varchar(220) NOT NULL,
  `address` varchar(200) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `demo2`
--

CREATE TABLE `demo2` (
  `id` int(11) NOT NULL,
  `demo_id` int(11) NOT NULL,
  `aaa` varchar(100) NOT NULL,
  `aaartt` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `manufacturer_id` int(11) NOT NULL,
  `manufacturer_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`manufacturer_id`, `manufacturer_name`) VALUES
(1, 'abc'),
(2, 'xyz');

-- --------------------------------------------------------

--
-- Table structure for table `payment_modes`
--

CREATE TABLE `payment_modes` (
  `payment_mode_id` int(11) NOT NULL,
  `payment_mode_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_details`
--

CREATE TABLE `product_details` (
  `product_id` int(11) NOT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `product_name` varchar(1000) DEFAULT NULL,
  `product_description` longtext DEFAULT NULL,
  `product_meta_title` longtext DEFAULT NULL,
  `product_meta_description` longtext DEFAULT NULL,
  `model` varchar(500) DEFAULT NULL,
  `sku` varchar(500) DEFAULT NULL,
  `featured_product` int(11) DEFAULT NULL,
  `recommended_product` int(11) DEFAULT NULL,
  `base_price` double DEFAULT NULL,
  `tax_type_id` double DEFAULT NULL,
  `total_quantity` int(11) DEFAULT NULL,
  `minimum_quantity` int(11) DEFAULT NULL,
  `stock_status_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `manufacturer_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `unit_id` int(11) NOT NULL,
  `option_required_id` int(11) DEFAULT NULL,
  `product_image` varchar(500) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_details`
--

INSERT INTO `product_details` (`product_id`, `vendor_id`, `product_name`, `product_description`, `product_meta_title`, `product_meta_description`, `model`, `sku`, `featured_product`, `recommended_product`, `base_price`, `tax_type_id`, `total_quantity`, `minimum_quantity`, `stock_status_id`, `status`, `manufacturer_id`, `brand_id`, `category_id`, `sub_category_id`, `unit_id`, `option_required_id`, `product_image`, `created_by`, `created_date`, `updated_date`) VALUES
(1, 1, 'fdgfd', 'asdsa', 'dsfsd', 'sdfsd', '232', '32423', 1, 1, 34324, 1, 32432, 23234, 2, 1, 1, 1, 3, 8, 2, 0, 'image4.jpg', 1, '2020-07-15 06:40:56', '2020-07-15 10:32:21'),
(2, 1, 'er445', 'sdsf', 'sdf', 'sdfsd', '24', '45', 1, 1, 454, 1, 43534, 3454, 2, 0, 1, 1, 3, 8, 2, 0, 'image4.jpg', 1, '2020-07-15 06:50:07', '2020-07-15 09:19:05'),
(3, 1, 'er4451', 'sdsf', 'sdf', 'sdfsd', '24', '45', 1, 1, 454, 1, 43534, 3454, 2, 0, 1, 1, 3, 8, 2, 0, 'image4.jpg', 1, '2020-07-15 07:59:43', '2020-07-15 09:19:07'),
(4, 1, 'er44512', 'sdsf', 'sdf', 'sdfsd', '24', '45', 1, 1, 454, 1, 43534, 3454, 2, 0, 1, 1, 3, 8, 2, 0, 'image4.jpg', 1, '2020-07-15 08:03:23', '2020-07-15 09:19:09'),
(5, 2, 'rterertre', 'retertre', '', '', '', '', 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, '', 1, '2020-07-15 08:21:17', '2020-07-15 09:19:13'),
(6, 2, 'werertgrg', 'tgfg', '', '', '', '', 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, '', 1, '2020-07-15 08:31:17', '2020-07-15 09:19:15'),
(7, 2, 'fdfg', 'rgdfg', '', '', '', '', 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, '', 1, '2020-07-15 08:40:20', '2020-07-15 09:19:17'),
(8, 2, 'fvbfd', 'bfghfgh', '', '', '', '', 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, '', 1, '2020-07-15 08:40:59', '2020-07-15 09:19:19');

-- --------------------------------------------------------

--
-- Table structure for table `product_discounts`
--

CREATE TABLE `product_discounts` (
  `product_discount_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_discount_qty` int(11) DEFAULT NULL,
  `product_discount_priority` double DEFAULT NULL,
  `product_discount_price` int(11) DEFAULT NULL,
  `product_discount_start_date` varchar(255) DEFAULT NULL,
  `product_discount_end_date` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_discounts`
--

INSERT INTO `product_discounts` (`product_discount_id`, `product_id`, `product_discount_qty`, `product_discount_priority`, `product_discount_price`, `product_discount_start_date`, `product_discount_end_date`, `status`, `created_by`, `created_date`, `updated_date`) VALUES
(1, 3, 345, 45, 43, '2020-07-18', '2020-07-27', 0, 1, '2020-07-15 07:59:43', '2020-07-15 07:59:43'),
(2, 4, 345, 45, 43, '2020-07-18', '2020-07-27', 0, 1, '2020-07-15 08:03:23', '2020-07-15 08:03:23'),
(3, 5, 0, 0, 0, '0000-00-00', '0000-00-00', 0, 1, '2020-07-15 08:21:17', '2020-07-15 08:21:17'),
(4, 6, 0, 0, 0, '0000-00-00', '0000-00-00', 0, 1, '2020-07-15 08:31:17', '2020-07-15 08:31:17'),
(5, 7, 0, 0, 0, '0000-00-00', '0000-00-00', 0, 1, '2020-07-15 08:40:20', '2020-07-15 08:40:20'),
(6, 8, 0, 0, 0, '0000-00-00', '0000-00-00', 0, 1, '2020-07-15 08:40:59', '2020-07-15 08:40:59');

-- --------------------------------------------------------

--
-- Table structure for table `product_options`
--

CREATE TABLE `product_options` (
  `product_option_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `sub_unit_id` int(11) DEFAULT NULL,
  `unit_value_id` int(11) DEFAULT NULL,
  `product_option_qty` int(11) DEFAULT NULL,
  `product_option_price` double DEFAULT NULL,
  `product_option_image` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `creatd_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_options`
--

INSERT INTO `product_options` (`product_option_id`, `product_id`, `sub_unit_id`, `unit_value_id`, `product_option_qty`, `product_option_price`, `product_option_image`, `status`, `created_by`, `creatd_date`, `updated_date`) VALUES
(1, 3, 3, 6, 45, 4543, 'image4.jpg', 0, 1, '2020-07-15 07:59:43', '2020-07-15 11:43:03'),
(2, 4, 3, 6, 45, 4543, 'image4.jpg', 0, 1, '2020-07-15 08:03:23', '2020-07-15 08:03:23');

-- --------------------------------------------------------

--
-- Table structure for table `product_specials`
--

CREATE TABLE `product_specials` (
  `product_special_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_special_priority` int(11) DEFAULT NULL,
  `product_special_price` double DEFAULT NULL,
  `product_special_start_date` varchar(255) DEFAULT NULL,
  `product_special_end_date` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_specials`
--

INSERT INTO `product_specials` (`product_special_id`, `product_id`, `product_special_priority`, `product_special_price`, `product_special_start_date`, `product_special_end_date`, `status`, `created_by`, `created_date`, `updated_date`) VALUES
(1, 3, 435, 43534, '0000-00-00', '0000-00-00', 0, 1, '2020-07-15 07:59:43', '2020-07-15 07:59:43'),
(2, 4, 435, 43534, '2020-07-16', '2020-08-06', 0, 1, '2020-07-15 08:03:23', '2020-07-15 08:03:23'),
(3, 5, 0, 0, '0000-00-00', '0000-00-00', 0, 1, '2020-07-15 08:21:17', '2020-07-15 08:21:17'),
(4, 6, 0, 0, '0000-00-00', '0000-00-00', 0, 1, '2020-07-15 08:31:17', '2020-07-15 08:31:17'),
(5, 7, 0, 0, '0000-00-00', '0000-00-00', 0, 1, '2020-07-15 08:40:20', '2020-07-15 08:40:20'),
(6, 8, 0, 0, '0000-00-00', '0000-00-00', 0, 1, '2020-07-15 08:40:59', '2020-07-15 08:40:59');

-- --------------------------------------------------------

--
-- Table structure for table `product_sub_images`
--

CREATE TABLE `product_sub_images` (
  `product_sub_image_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_sub_image_name` varchar(255) NOT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_sub_images`
--

INSERT INTO `product_sub_images` (`product_sub_image_id`, `product_id`, `product_sub_image_name`, `sort_order`, `status`, `created_by`, `created_date`, `updated_date`) VALUES
(1, 3, 'IMAGE6.jpg', 43534, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 4, 'IMAGE6.jpg', 43534, 0, 1, '2020-07-15 08:03:23', '2020-07-15 08:03:23');

-- --------------------------------------------------------

--
-- Table structure for table `related_products`
--

CREATE TABLE `related_products` (
  `related_product_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `related_product` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `related_products`
--

INSERT INTO `related_products` (`related_product_id`, `product_id`, `related_product`, `status`, `created_by`, `created_date`, `updated_date`) VALUES
(1, 3, 1, 0, 1, '2020-07-15 07:59:43', '2020-07-15 07:59:43'),
(2, 3, 2, 0, 1, '2020-07-15 07:59:43', '2020-07-15 07:59:43'),
(3, 3, 3, 0, 1, '2020-07-15 07:59:43', '2020-07-15 07:59:43'),
(4, 3, 4, 0, 1, '2020-07-15 07:59:43', '2020-07-15 07:59:43'),
(5, 3, 5, 0, 1, '2020-07-15 07:59:43', '2020-07-15 07:59:43'),
(6, 4, 1, 0, 1, '2020-07-15 08:03:23', '2020-07-15 08:03:23'),
(7, 4, 2, 0, 1, '2020-07-15 08:03:23', '2020-07-15 08:03:23'),
(8, 4, 3, 0, 1, '2020-07-15 08:03:23', '2020-07-15 08:03:23'),
(9, 4, 4, 0, 1, '2020-07-15 08:03:23', '2020-07-15 08:03:23'),
(10, 4, 5, 0, 1, '2020-07-15 08:03:23', '2020-07-15 08:03:23');

-- --------------------------------------------------------

--
-- Table structure for table `stock_status`
--

CREATE TABLE `stock_status` (
  `stock_status_id` int(11) NOT NULL,
  `stock_status_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stock_status`
--

INSERT INTO `stock_status` (`stock_status_id`, `stock_status_name`) VALUES
(1, '2-3 days'),
(2, 'In Stock'),
(3, 'Out Of Stock'),
(4, 'Pre-Order');

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `sub_category_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category_name` longtext NOT NULL,
  `sub_category_image` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`sub_category_id`, `category_id`, `sub_category_name`, `sub_category_image`, `status`, `created_by`, `created_date`, `updated_date`) VALUES
(8, 3, 'sub_category_name12', 'IMAGE6.jpg', 1, 0, '2020-07-14 07:18:08', '2020-07-07 04:35:08');

-- --------------------------------------------------------

--
-- Table structure for table `sub_unit_master`
--

CREATE TABLE `sub_unit_master` (
  `sub_unit_id` int(11) NOT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `sub_unit_name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sub_unit_master`
--

INSERT INTO `sub_unit_master` (`sub_unit_id`, `unit_id`, `sub_unit_name`, `status`, `created_by`, `created_date`, `updated_date`) VALUES
(3, 2, 'xyz1', 1, NULL, '2020-07-14 08:16:17', '2020-07-01 08:04:23');

-- --------------------------------------------------------

--
-- Table structure for table `unit_master`
--

CREATE TABLE `unit_master` (
  `unit_id` int(11) NOT NULL,
  `unit_name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `unit_master`
--

INSERT INTO `unit_master` (`unit_id`, `unit_name`, `status`, `created_by`, `created_date`, `updated_date`) VALUES
(2, 'xyz', 1, NULL, '2020-07-14 08:15:50', '2020-07-01 07:56:20');

-- --------------------------------------------------------

--
-- Table structure for table `unit_value_master`
--

CREATE TABLE `unit_value_master` (
  `unit_value_id` int(11) NOT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `sub_unit_id` int(11) DEFAULT NULL,
  `unit_value_name` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `updated_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `unit_value_master`
--

INSERT INTO `unit_value_master` (`unit_value_id`, `unit_id`, `sub_unit_id`, `unit_value_name`, `status`, `created_by`, `created_date`, `updated_date`) VALUES
(6, 2, 3, 200, 1, NULL, NULL, '2020-07-14 08:03:15'),
(7, 2, 3, 300, 1, NULL, NULL, '2020-07-14 08:03:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`banner_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `demo1`
--
ALTER TABLE `demo1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `demo2`
--
ALTER TABLE `demo2`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_foreign_key_name` (`demo_id`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`manufacturer_id`);

--
-- Indexes for table `payment_modes`
--
ALTER TABLE `payment_modes`
  ADD PRIMARY KEY (`payment_mode_id`);

--
-- Indexes for table `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_discounts`
--
ALTER TABLE `product_discounts`
  ADD PRIMARY KEY (`product_discount_id`),
  ADD KEY `prod_disc_ibfk_1` (`product_id`);

--
-- Indexes for table `product_options`
--
ALTER TABLE `product_options`
  ADD PRIMARY KEY (`product_option_id`),
  ADD KEY `prod_opt_ibfk_1` (`product_id`);

--
-- Indexes for table `product_specials`
--
ALTER TABLE `product_specials`
  ADD PRIMARY KEY (`product_special_id`),
  ADD KEY `prod_spl_ibfk_1` (`product_id`);

--
-- Indexes for table `product_sub_images`
--
ALTER TABLE `product_sub_images`
  ADD PRIMARY KEY (`product_sub_image_id`),
  ADD KEY `prod_sub_img_ibfk_1` (`product_id`);

--
-- Indexes for table `related_products`
--
ALTER TABLE `related_products`
  ADD PRIMARY KEY (`related_product_id`),
  ADD KEY `rel_prod_ibfk_1` (`product_id`);

--
-- Indexes for table `stock_status`
--
ALTER TABLE `stock_status`
  ADD PRIMARY KEY (`stock_status_id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`sub_category_id`),
  ADD KEY `category_fk_1` (`category_id`);

--
-- Indexes for table `sub_unit_master`
--
ALTER TABLE `sub_unit_master`
  ADD PRIMARY KEY (`sub_unit_id`),
  ADD KEY `sub_unit_ibfk_1` (`unit_id`);

--
-- Indexes for table `unit_master`
--
ALTER TABLE `unit_master`
  ADD PRIMARY KEY (`unit_id`);

--
-- Indexes for table `unit_value_master`
--
ALTER TABLE `unit_value_master`
  ADD PRIMARY KEY (`unit_value_id`),
  ADD KEY `unit_value_ibfk_1` (`unit_id`),
  ADD KEY `unit_value_sub_ibfk_1` (`sub_unit_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `banner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `demo1`
--
ALTER TABLE `demo1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `demo2`
--
ALTER TABLE `demo2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `manufacturer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_modes`
--
ALTER TABLE `payment_modes`
  MODIFY `payment_mode_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_details`
--
ALTER TABLE `product_details`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product_discounts`
--
ALTER TABLE `product_discounts`
  MODIFY `product_discount_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product_options`
--
ALTER TABLE `product_options`
  MODIFY `product_option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_specials`
--
ALTER TABLE `product_specials`
  MODIFY `product_special_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product_sub_images`
--
ALTER TABLE `product_sub_images`
  MODIFY `product_sub_image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `related_products`
--
ALTER TABLE `related_products`
  MODIFY `related_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `stock_status`
--
ALTER TABLE `stock_status`
  MODIFY `stock_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `sub_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sub_unit_master`
--
ALTER TABLE `sub_unit_master`
  MODIFY `sub_unit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `unit_master`
--
ALTER TABLE `unit_master`
  MODIFY `unit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `unit_value_master`
--
ALTER TABLE `unit_value_master`
  MODIFY `unit_value_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `demo2`
--
ALTER TABLE `demo2`
  ADD CONSTRAINT `fk_foreign_key_name` FOREIGN KEY (`demo_id`) REFERENCES `demo1` (`id`);

--
-- Constraints for table `product_discounts`
--
ALTER TABLE `product_discounts`
  ADD CONSTRAINT `prod_disc_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_details` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_options`
--
ALTER TABLE `product_options`
  ADD CONSTRAINT `prod_opt_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_details` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_specials`
--
ALTER TABLE `product_specials`
  ADD CONSTRAINT `prod_spl_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_details` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_sub_images`
--
ALTER TABLE `product_sub_images`
  ADD CONSTRAINT `prod_sub_img_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_details` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `related_products`
--
ALTER TABLE `related_products`
  ADD CONSTRAINT `rel_prod_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_details` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `category_fk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

--
-- Constraints for table `sub_unit_master`
--
ALTER TABLE `sub_unit_master`
  ADD CONSTRAINT `sub_unit_ibfk_1` FOREIGN KEY (`unit_id`) REFERENCES `unit_master` (`unit_id`) ON DELETE CASCADE;

--
-- Constraints for table `unit_value_master`
--
ALTER TABLE `unit_value_master`
  ADD CONSTRAINT `unit_value_ibfk_1` FOREIGN KEY (`unit_id`) REFERENCES `unit_master` (`unit_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `unit_value_sub_ibfk_1` FOREIGN KEY (`sub_unit_id`) REFERENCES `sub_unit_master` (`sub_unit_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
