var fs = require('fs');
var path = require("path");
var reQunit = require("../../lib/reQUnit").reQunit;
var sys = require('sys');
module.exports = function (argv) {
    if (argv._.length === 0) {
        console.log("Usage: reQunit qunit-test.js")
        return;
    }
    var targetFileName = argv._[0];
    var qunitData = fs.readFileSync(path.resolve(targetFileName));
    // doesn't cli option yet....
    var ruleData = fs.readFileSync(path.join(__dirname, "../../lib/rephraseRule/qunit-to-jamine-rules.js"));
    console.log(reQunit(qunitData,ruleData));

};