var reQunit = require("../lib/reQUnit").reQunit;
var rephrase = require("../lib/rephrase")
var assert = require('chai').assert;
var esprima = require("esprima");
var escodegen = require("escodegen");
var equalAstToFn = require("./lib/chai.assert.ast").equalAstToFn;
var fs = require("fs");
describe("rephrase", function () {
    var context = describe;
    context("When without change", function () {
        it("test", function (done) {
            fs.readFile(__dirname + "/simple-rules.js", 'utf-8', function(err, data) {
                // 読み取った結果を出力する
                console.log(rephrase.transformSource(data, data))
                done();
            });
        });
    });
});
