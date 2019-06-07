CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `uid` bigint(20) NOT NULL DEFAULT '0',
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `qq` int(20) NOT NULL,
  `createTime` timestamp NULL DEFAULT NULL,
  `createIp` varchar(100) NOT NULL DEFAULT 'fff',
  `updateIp` varchar(100) NOT NULL DEFAULT 'fff',
  `updateTime` timestamp NULL DEFAULT NULL,
  `loginCount` int(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;