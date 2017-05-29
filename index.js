var express = require('express');
var app = express();

app.get('/', function(res, rep) {
    console.log("receive push notification");
    rep.send('Hello, word!');
});

app.listen(3300);