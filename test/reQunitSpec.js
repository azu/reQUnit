var reQunit = require("../lib/reQUnit").reQunit;
var assert = require('chai').assert;
var esprima = require("esprima");
var escodegen = require("escodegen");
var equalAstToFn = require("./lib/chai.assert.ast").equalAstToFn;
describe("reQunit", function () {
    var context = describe;
    context("When without change", function () {
        it("should be same", function () {
            var ast = reQunit(esprima.parse('function a() {' +
                'test("test name", function () {' +
                '    ok(true, "should be true");' +
                '});' +
                '}'));
            equalAstToFn(ast, function a() {
                test("test name", function () {
                    ok(true, "should be true");
                });
            })
        });
    });
    context("When has single module()", function () {
        it("move test to module", function () {
            var ast = reQunit(esprima.parse('function a() {' +
                'module("module +TEST+");' +
                'test("test name", function () {' +
                '    ok(true, "should be true");' +
                '});' +
                '}'));
            equalAstToFn(ast, function a() {
                module("module +TEST+", function () {
                    test("test name", function () {
                        ok(true, "should be true");
                    });
                });
            })
        });
    });
    context("When has multiple module()", function () {
        it("move each test to each module", function () {
            var ast = reQunit(esprima.parse('function a() {' +
                'module("module 1");' +
                'test("test 1", function () {' +
                '    ok(true, "should be true");' +
                '});' +
                'module("module 2");' +
                'test("test 2", function () {' +
                '    ok(true, "should be true");' +
                '});' +
                '}'));
            equalAstToFn(ast, function a() {
                module("module 1", function () {
                    test("test 1", function () {
                        ok(true, "should be true");
                    });
                });
                module("module 2", function () {
                    test("test 2", function () {
                        ok(true, "should be true");
                    });
                });
            })
        });
    });
    context("When module has setup/teardown", function () {
        it("move tests to module", function () {
            var ast = reQunit(esprima.parse('function a() {' +
                'module( "module A", {' +
                '    setup: function() {' +
                '    },' +
                '    teardown: function() {' +
                '    }' +
                '});' +
                'test("test 1", function () {' +
                '    ok(true, "should be true");' +
                '});' +
                '}'));
            equalAstToFn(ast, function a() {
                module("module A", function () {
                    setup(function () {
                    });
                    teardown(function () {
                    });
                    test("test 1", function () {
                        ok(true, "should be true");
                    });
                });
            });
        });
    });
});