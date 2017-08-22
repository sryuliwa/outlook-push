var request = require('request');
var gcm = require('node-gcm');

class GCMClient {
    constructor(apiKey) {
        this.sender = new gcm.Sender(apiKey);
    }

    pushToDevice(req, callback) {

        var sendGCMNotification = function (sender, payload,deviceSpecificToken) {
            // Prepare a message to be sent 
            var message = new gcm.Message({
                data: { key1: payload }
            });

            // Specify which registration IDs to deliver the message to 
            var regTokens = [];
            regTokens.push(deviceSpecificToken);
            // Actually send the message 
            console.log("send to " + deviceSpecificToken);
            sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                if (err) console.error(err);
                else console.log(response);
            });

        }

        var sent = [];
        try {
            var clientState=req.headers['clientstate'];
            var value = req.body.value;
            if (!Array.isArray(value)) {
                callback("failed. no notification", null);
                return;
            }
            for (var notification in value) {
                if (clientState != null) {
                    sent.push(clientState);
                    sendGCMNotification(this.sender, JSON.stringify(value[notification]),clientState);
                }

            }
        }
        catch (e) {
            callback(e, sent);
            return;
        }
        callback(null, sent);

    }
}

module.exports=GCMClient;