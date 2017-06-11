var request = require('request');
var gcm = require('node-gcm');

class GCMClient {
    constructor(apiKey) {
        this.sender = new gcm.Sender(apiKey);
    }

    pushToDevice(outlookNotificationPayload, callback) {

        var sendGCMNotification = function (sender, deviceSpecificToken) {
            // Prepare a message to be sent 
            var message = new gcm.Message({
                data: { key1: 'msg1' }
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
            var value = outlookNotificationPayload.value;
            if (!Array.isArray(value)) {
                callback("failed. no notification", null);
                return;
            }
            for (var notification in value) {
                var clientState = value[notification].ClientState;
                if (clientState != null) {
                    sent.push(clientState);
                    sendGCMNotification(this.sender, clientState);
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