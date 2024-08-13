-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Agu 2024 pada 11.46
-- Versi server: 10.4.8-MariaDB
-- Versi PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marketplace`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Customer A', 'customerA@example.com', '$2a$08$YhFJaTjOKHhTzgtjC1v6q.goAnpBsoMUZj5pCAPMp2j7ZI9/7phRa', '2024-08-13 06:58:56'),
(2, 'Customer B', 'customerB@example.com', '$2a$08$YhFJaTjOKHhTzgtjC1v6q.goAnpBsoMUZj5pCAPMp2j7ZI9/7phRa', '2024-08-13 06:58:56'),
(3, 'Helmi Tazkia', 'customere@example.com', '$2a$08$YhFJaTjOKHhTzgtjC1v6q.goAnpBsoMUZj5pCAPMp2j7ZI9/7phRa', '2024-08-13 08:03:06'),
(4, 'farhan', 'farhan@example.com', '$2a$08$9cxgon5w8uFZXcBmF/Fop.Z1xYVmKiH1P1vErxsTRtQBYd8UBx6z2', '2024-08-13 08:33:44');

-- --------------------------------------------------------

--
-- Struktur dari tabel `merchants`
--

CREATE TABLE `merchants` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `merchants`
--

INSERT INTO `merchants` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Merchant A', 'merchantA@example.com', '$2a$08$YhFJaTjOKHhTzgtjC1v6q.goAnpBsoMUZj5pCAPMp2j7ZI9/7phRa', '2024-08-13 06:58:41'),
(2, 'Merchant B', 'merchantB@example.com', '$2a$08$YhFJaTjOKHhTzgtjC1v6q.goAnpBsoMUZj5pCAPMp2j7ZI9/7phRa', '2024-08-13 06:58:41'),
(3, 'Helmi Tazkia', 'customere@example.com', '$2a$08$YhFJaTjOKHhTzgtjC1v6q.goAnpBsoMUZj5pCAPMp2j7ZI9/7phRa', '2024-08-13 08:18:57'),
(4, 'farhan', 'farhan@example.com', '$2a$08$MLJe.EuKO9V.wK9sK/EpeeGvrZtdW39QxhLjbXZILztk5n0K8dwm2', '2024-08-13 08:33:58');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `MerchantId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `MerchantId`, `createdAt`, `updatedAt`) VALUES
(1, 'Product 1', '10000.00', 1, '2024-08-13 14:55:48', '2024-08-13 15:27:10'),
(2, 'Product 2', '20000.00', 1, '2024-08-13 14:55:48', '2024-08-13 15:27:12'),
(3, 'SABUN CAIR HITAM', '24000.00', 2, '2024-08-13 14:55:48', '2024-08-13 09:34:52'),
(4, 'Product 4', '50000.00', 3, '2024-08-13 14:55:48', '2024-08-13 15:27:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) DEFAULT 0.00,
  `shippingFee` decimal(10,2) DEFAULT 0.00,
  `finalAmount` decimal(10,2) NOT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `totalAmount`, `discount`, `shippingFee`, `finalAmount`, `CustomerId`, `ProductId`, `quantity`, `created_at`) VALUES
(1, '20000.00', '0.00', '0.00', '20000.00', 1, 2, 0, '2024-08-13 06:59:05'),
(2, '50000.00', '5000.00', '0.00', '45000.00', 3, 4, 0, '2024-08-13 06:59:05'),
(3, '20000.00', '0.00', '0.00', '20000.00', 3, 1, 2, '2024-08-13 09:16:36'),
(4, '90000.00', '9000.00', '0.00', '81000.00', 3, 1, 9, '2024-08-13 09:17:04');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `merchants`
--
ALTER TABLE `merchants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `merchant_id` (`MerchantId`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`CustomerId`),
  ADD KEY `product_id` (`ProductId`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `merchants`
--
ALTER TABLE `merchants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`MerchantId`) REFERENCES `merchants` (`id`);

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
