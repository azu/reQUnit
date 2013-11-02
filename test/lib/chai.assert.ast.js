var esprima = require("esprima");
var escodegen = require("escodegen");
var assert = require('chai').assert;
exports.equalAstToFn = function (ast, fn2) {
    var ast1 = ast;
    var ast2;
    try {
        if (typeof ast === "function") {
            ast1 = esprima.parse(ast.toString());
        }
        ast2 = esprima.parse(fn2.toString());
    } catch (e) {

        assert.fail("equalAstToFn Error", e)
    }
    console.log("actual : ", escodegen.generate(ast1), "\n");
    console.log("expect : ", escodegen.generate(ast2), "\n");

    assert.deepEqual(ast1, ast2);
};