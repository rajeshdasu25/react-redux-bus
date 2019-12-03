const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const ip = require('ip').address();
const packageJson = require('../package.json');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/ping', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var responseData = {
        "Server Status": "Up and Running",
        "Port": port,
        "Instance IP address": ip,
        "Environment": "Dev",
        "Application Version": packageJson.version,
        "Node Version": process.version
    };
    res.status(200).send(JSON.stringify(responseData, null, 4));
});

// An api endpoint that returns a short list of items
app.post('/getAllBuses', (req, res) => { 
    let busFrom = req.query.from;
    let busTo = req.query.to;
    let jDate = req.query.jDate;
    let jsonUrl = './data/buses.json';

    fs.readFile(jsonUrl, (err, data) => {
        if (err) throw err;
        let buses = JSON.parse(data);
        let items = buses.filter(bus => bus.fromId == parseInt(busFrom) && bus.toId == parseInt(busTo) && bus.jDate == jDate);
        res.json(items);
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/public/index.html'));
});