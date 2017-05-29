var GCMClient = require('../module/gcmClient');

const SERVER_API_KEYS = "AIzaSyA6kQAvIT5-_zONWamMfbdpNxc_17yMHNs";

var gcmClient = new GCMClient(SERVER_API_KEYS);

var sendPushNotification = function (req, res) {
    var body = req.body;
    gcmClient.pushToDevice(body, function (error, sent) {
        if (sent == null) {
            console.log("failed to send notification: " + error);
        }
        else {
            console.log(sent.length + " notification sent");
        }
    });
    return res.status(200).send();
}

var controller = {
    handleOutlookEvent: function (req, res) {
        try {
            var validationToken = req.query.validationtoken;
            if (validationToken != null) {
                return res.status(200).send(validationToken);
            }
            else {
                return sendPushNotification(req, res);
            }
        }
        catch (e) {
            return res.status(500).send("error " + e.body);
        }
    },

    default: function (req, res) {
        return res.status(404).send("no such api");
    }
};

module.exports = controller;
