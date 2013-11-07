var esquery = require("esquery");
var builders = require("ast-types").builders;
var esprima = require("esprima");
var escodegen = require("escodegen");
var estraverse = require('estraverse');
describe("replace", function () {
    it("is test", function () {
        var selector = esquery.parse('[callee.name="assert"]');
        var code = 'function a () {equal(a, b);}'
        var ast = esprima.parse(code);
        var results = estraverse.replace(ast, {
            enter: function (node, parent) {
                var matches = esquery.finalMatches(esquery.match(node, selector, parent));
                if (matches.length > 0) {
                    console.log("matches", matches);
                }
            }
        });

//        console.log("results", results);
    });
});
