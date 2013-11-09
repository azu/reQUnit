var reStructure = require("../lib/reQUnit").reStructure;
var reQunit = require("../lib/reQUnit").reQunit;
var rephrase = require("../lib/rephrase");
var assert = require('chai').assert;
var esprima = require("esprima");
var escodegen = require("escodegen");
var equalAstToFn = require("./lib/chai.assert.ast").equalAstToFn;
var fs = require("fs");
var path = require("path");
describe("rephrase", function () {
    var context = describe;
    context("When without change", function () {
        var ruleData = fs.readFileSync(path.join(__dirname, "../lib/rephraseRule/qunit-to-jamine-rules.js"));
        var qunitData = fs.readFileSync(path.join(__dirname, "../example/simple-code.js"));
        it("test", function () {
            var structAST = reStructure(esprima.parse(qunitData));
            var transformedAST = rephrase.astTransformSource(escodegen.generate(structAST), ruleData);
            console.log(escodegen.generate(transformedAST));
        });
    });
});
describe("reQunit", function () {
    var context = describe;
    context("When without change", function () {
        var ruleData = fs.readFileSync(path.join(__dirname, "../lib/rephraseRule/qunit-to-jamine-rules.js"));
        var qunitData = fs.readFileSync(path.join(__dirname, "../example/simple-code.js"));
        it("test", function () {
            console.log(reQunit(qunitData, ruleData));
        });
    });
});
