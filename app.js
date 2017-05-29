var express = require('express');
var bodyParser = require('body-parser');

var apiService = require('./api/api.js');

var app = express();

app.use(bodyParser.json())
app.use('/api', apiService);

module.exports = app;