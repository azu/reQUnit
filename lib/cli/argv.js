var fs = require('fs');
var path = require("path");
var reQunit = require("../../lib/reQUnit").reQunit;
var sys = require('sys');
module.exports = function (argv) {
    if (argv._.length === 0) {
        console.log(require("optimist").help());
        return;
    }
    var targetFileName = argv._[0];
    var qunitData = fs.readFileSync(path.resolve(targetFileName));

    var definitionFilePath;
    if ("definition" in argv) {
        definitionFilePath = path.normalize(argv["definition"]);
    } else {
        definitionFilePath = path.join(__dirname, "../rephraseRule/qunit-to-jamine-rules.js");
    }
    var ruleData = fs.readFileSync(definitionFilePath);
    console.log(reQunit(qunitData, ruleData));
};