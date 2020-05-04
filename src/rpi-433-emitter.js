var rpi433 = require('rpi-433');

module.exports = function (RED) {
    function Rpi433Emitter(config) {
        RED.nodes.createNode(this, config);
        var rfEmitter = rpi433.emitter({
            pin: config.pin,
            pulseLength: config.pulseLength
        });
        var node = this;
        node.on("input", function(msg) {
            rfEmitter.sendCode(msg.payload, function(error, response) {
                if (error) {
                    node.status({ fill: "red", shape: "dot", text: "sending error" });
                    node.error('Error sending code: ' + JSON.stringify(error));
                } else {
                    node.status({ fill: "green", shape: "dot", text: "data sent" });
                }
            });
        });
    }
    RED.nodes.registerType("rpi-433-emitter", Rpi433Emitter);
}