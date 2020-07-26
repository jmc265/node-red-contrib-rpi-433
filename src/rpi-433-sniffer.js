var rpi433 = require('rpi-433-v3');

module.exports = function (RED) {
    function Rpi433Sniffer(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var rfSniffer = rpi433.sniffer({
            pin: config.pin,
            pulseLength: config.pulseLength,
            debounceDelay: config.debounceDelay
        });
        node.status({ fill: "green", shape: "dot", text: "listening" });
        rfSniffer.on('data', function (data) {
            node.send({payload: data});
        });
        rfSniffer.on('error', function (error) {
            node.status({ fill: "red", shape: "dot", text: "receiving error" });
            node.error('Error receiving: ' + JSON.stringify(error));
        })
    }
    RED.nodes.registerType("rpi-433-sniffer", Rpi433Sniffer);
}
