//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var connection   = require('./mariadb-connector');
const { getRandomFloat } = require('./utils.js')



const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:8100'
}));

// to parse application/json
app.use(express.json()); 
//=======[ Main module code ]==================================================

app.get('/', function(req, res, next) {
    res.send(null).status(200);
});

app.get('/api/devices', async (req, res) => {
    try {
        connection.query('SELECT d.id as id, d.name as name, d.location as location, d.valveId as valveId, v.opened as valveStatus, m.id as measurementId, m1.deviceId, m1.value, m1.date FROM `device` d inner join( select max(m.id) as id, m.deviceId as deviceId from measurement m group by deviceId order by m.id desc) m on d.id = m.deviceId inner join valve v on d.valveId = v.id inner join measurement m1 on m.id = m1.id group by d.id order by d.id ASC',
        function (error, results, fields) {
            if (error) {
                console.log(error);
                res.status(500).send({ state: "An internal server error ocurred" });
            }
            else {
                let devices = JSON.parse(JSON.stringify(results));
                devices.forEach(device => {
                        device.valveStatus = (device.valveStatus == 1) ? true : false; 
                        device.lastMeasurement = {'id': device.measurementId, 'value': device.value, 'date': device.date, 'deviceId': device.deviceId };
                        delete device.measurementId;
                        delete device.value;
                        delete device.date;
                        delete device.deviceId;
                    });
                res.status(200).send(devices);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ state: "An internal server error ocurred" });
    }
  });

app.get('/api/devices/:deviceId', function(req, res, next) {
    try {
        connection.query('SELECT d.id as id, d.name as name, d.location as location, d.valveId as valveId, v.opened as valveStatus, m.id as measurementId, m.value as value, m.date as date from `device` d inner join `valve` v on d.valveId = v.id inner join `measurement` m on d.id = m.deviceId where d.id = ? order by m.id desc limit 1', [req.params.deviceId],
        function (error, results, fields) {
            if (error) {
                console.log(error);
                res.status(500).send({ state: "An internal server error ocurred" });
            }
            else {
                let devices = JSON.parse(JSON.stringify(results));
                if (devices.length > 0) {
                let device = devices[0];
                device.valveStatus = (device.valveStatus == 1) ? true : false; 
                device.lastMeasurement = {'id': device.measurementId, 'value': device.value, 'date': device.date, 'deviceId': device.deviceId };
                delete device.measurementId;
                delete device.value;
                delete device.date;
                delete device.deviceId;
                res.status(200).send(device);
                }
                else 
                    res.status(404).send(null);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ state: "An internal server error ocurred" });
    }
  });

app.get('/api/logs/:valveId', function(req, res, next) {
    try {
        connection.query('SELECT l.id as id, l.opened as opened, l.date as date, l.valveId as valveId from `log` l where l.valveId = ? order by l.id DESC', [req.params.valveId],
        function (error, results, fields) {
            if (error) {
                console.log(error);
                res.status(500).send({ state: "An internal server error ocurred" });
            }
            else {
                let logs = JSON.parse(JSON.stringify(results));
                res.status(200).send(logs);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ state: "An internal server error ocurred" });
    }
  });

app.get('/api/measurements/:deviceId', function(req, res, next) {
    try {
        connection.query('SELECT id, value, date, value from `measurement` m where m.deviceId = ? ORDER BY m.id DESC', [req.params.deviceId],
        function (error, results, fields) {
            if (error) {
                console.log(error);
                res.status(500).send({ state: "An internal server error ocurred" });
            }
            else {
                let measurements = JSON.parse(JSON.stringify(results));
                res.status(200).send(measurements);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ state: "An internal server error ocurred" });
    }
  });

app.get('/api/valves/:valveId', function(req, res, next) {
    try {
        connection.query('SELECT id, name, opened from `valve` v where v.id = ? ORDER BY v.id ASC', [req.params.valveId],
        function (error, results, fields) {
            if (error) {
                console.log(error);
                res.status(500).send({ state: "An internal server error ocurred" });
            }
            else {
                let valves = JSON.parse(JSON.stringify(results));
                if (valves.length > 0)
                    res.status(200).send(valves[0]);
                else
                    res.status(404).send(null);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ state: "An internal server error ocurred" });
    }
  });

app.put('/api/valves/:valveId', function(req, res, next) {
    try {
        connection.query('select v.id, v.opened, d.id as deviceId from `valve` v inner join `device` d on v.id = d.valveId where v.id = ?', [req.params.valveId],
        function (error, results, fields) {
            if (error) {
                console.log(error);
                res.status(500).send({ state: "An internal server error ocurred" });
            }
            else {
                let valves = JSON.parse(JSON.stringify(results));
                if (valves.length > 0)
                    {
                     let valve = valves[0];
                     if (valve.opened == 1) {
                        // Close the valve
                        connection.query('update `valve` v set v.opened = 0 where v.id = ?', [valve.id], function (error, results, fields) {
                            if (error)
                                console.log(error);
                            else {
                                console.log("Closing valve: " + results);
                            }
                            
                        });
                        connection.query('insert into `log` (opened,valveId,`date`) VALUES (0, ?, NOW())', [valve.id], function (error, results, fields) {
                            if (error)
                            console.log(error);
                            else {
                                console.log("Logging valve: " + results);
                            }
                        });
                        connection.query('insert into `measurement` (value,deviceId,`date`) VALUES (?, ?, NOW())', [getRandomFloat(0.0, 100.0, 2), valve.deviceId], function (error, results, fields) {
                            console.log("Measurement created: " + results);
                        });
                     }
                     else {
                        // Open the valve
                        connection.query('update `valve` set opened = 1 where id = ?', [valve.id], function (error, results1, fields) {
                            if (error)
                                console.log(error);
                            else {
                                console.log("Opening valve: " + results);
                            }
                        });
                        connection.query('insert into `log` (opened,valveId,`date`) VALUES (1, ?, NOW())', [valve.id], function (error, results2, fields) {
                            if (error)
                            console.log(error);
                        else {
                            console.log("Insert logging valve: " + results2);
                        }
                        });

                     }
                     res.status(200).send(null);
                    }
                else
                    res.status(404).send(null);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ state: "An internal server error ocurred" });
    }
  });

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
