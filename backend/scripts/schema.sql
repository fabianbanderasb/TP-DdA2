-- db.valve definition

CREATE TABLE `valve` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `opened` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- db.device definition

CREATE TABLE `device` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `valveId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `device_UN` (`valveId`),
  KEY `devices_FK` (`valveId`),
  CONSTRAINT `devices_FK` FOREIGN KEY (`valveId`) REFERENCES `valve` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- db.measurement definition

CREATE TABLE `measurement` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` float NOT NULL,
  `deviceId` int(11) unsigned NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `measurement_FK` (`deviceId`),
  CONSTRAINT `measurement_FK` FOREIGN KEY (`deviceId`) REFERENCES `device` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- db.log definition

CREATE TABLE `log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `opened` tinyint(3) unsigned NOT NULL,
  `valveId`int(11) unsigned NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `log_FK` (`valveId`),
  CONSTRAINT `log_FK` FOREIGN KEY (`valveId`) REFERENCES `valve` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
