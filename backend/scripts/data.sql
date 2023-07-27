INSERT INTO db.valve (id,name,opened) VALUES
	 (1,'Válvula 32',1),
	 (2,'Válvula 5',0);

INSERT INTO db.device (id,name,location,valveId) VALUES
	 (1,'Sensor A','Patio Trasero',1),
	 (2,'Sensor B2','Jardín',2);

INSERT INTO db.measurement (id,value,deviceId,`date`) VALUES
	 (1,5.0,1,'2023-04-19 06:20:50.000'),
	 (2,5.5,1,'2023-04-19 06:20:50.000'),
	 (3,15.0,1,'2023-04-19 06:20:50.000'),
	 (4,4.0,2,'2023-04-19 06:20:50.000'),
	 (5,7.0,2,'2023-04-19 06:20:50.000');

INSERT INTO db.log (id,opened,valveId,`date`) VALUES
	 (1,1,1,'2023-04-19 06:23:20.000'),
	 (2,0,1,'2023-04-19 06:23:20.000'),
	 (3,1,1,'2023-04-19 06:23:20.000'),
	 (4,1,2,'2023-04-19 06:23:20.000'),
	 (5,0,2,'2023-04-19 06:23:20.000');
