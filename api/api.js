var express = require('express');
var bodyParser = require('body-parser');

var outlookController = require('./controller/outlookController')

var router = express.Router();
router.use(bodyParser.json());

router.post('/outlook', function (req, res) {
    return outlookController.handleOutlookEvent(req, res);
});

router.use('/', function (req, res) {
    return outlookController.default(req, res);
});

module.exports = router;
