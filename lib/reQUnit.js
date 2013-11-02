/*
 * reQUnit
 * https://github.com/azu/reQUnit
 *
 * Copyright (c) 2013 azu
 * Licensed under the MIT license.
 */

var esprima = require("esprima");
var estraverse = require('estraverse');
var _ = require("lodash");
'use strict';
/**
 *
 * @param ast
 * @returns {*}
 */
exports.reQunit = function (ast) {
    return convertAST(ast);
};

var syntax = {
    isTest: function isTest(node) {
        return (node.type === estraverse.Syntax.ExpressionStatement &&
            node.expression.type === estraverse.Syntax.CallExpression &&
            node.expression.callee.name === "test")
    },
    isModule: function isModule(node) {

        return (node.type === estraverse.Syntax.ExpressionStatement &&
            node.expression.type === estraverse.Syntax.CallExpression &&
            node.expression.callee.name === "module")
    },
    isSetup: function isSetup(node) {
        return (node.type === estraverse.Syntax.Property &&
            node.key.type === estraverse.Syntax.Identifier &&
            node.key.name === "setup");
    },
    tearDown: function (node) {
        return (node.type === estraverse.Syntax.Property &&
            node.key.type === estraverse.Syntax.Identifier &&
            node.key.name === "teardown");
    }
};

function moveTestsToModule(moduleNote, testNodes) {
    function hasSecondObject(node) {
        return node.expression["arguments"].length > 1;
    }

    function insertNewFunctionExpression(node, block) {
        if (node.expression == null) {
            return;
        }
        node.expression["arguments"].push(block);
    }

    function addFunctionBody(functionExpression, nodes) {
        if (functionExpression.body.type !== estraverse.Syntax.BlockStatement) {
            throw new Error(functionExpression + " is really module?");
        }
        functionExpression.body.body = functionExpression.body.body.concat(nodes);
    }

    var copyNodes = _.map(testNodes, _.clone);
    if (hasSecondObject(moduleNote)) {
        var args = moduleNote.expression["arguments"];
        addFunctionBody(_.last(args), copyNodes);
    } else {
        insertNewFunctionExpression(moduleNote, {
            "type": "FunctionExpression",
            "id": null,
            "params": [],
            "defaults": [],
            "body": {
                "type": "BlockStatement",
                "body": copyNodes
            },
            "rest": null,
            "generator": false,
            "expression": false
        });
    }
}
/*
    ObjectExpression . FunctionExpression
    -> FunctionExpression . ExpressionStatement
 */
function convertModuleArguments(node) {
    var args = node.expression["arguments"];
    var objectExpression = args[1];
    if (objectExpression == null || objectExpression.type !== estraverse.Syntax.ObjectExpression) {
        return;
    }
    var expressions = _.map(objectExpression.properties, function (property) {
        var copyProperty = _.clone(property);
        return {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": copyProperty.key.name
                },
                "arguments": [
                    copyProperty.value
                ]
            }
        };
    });

    var base = {
        "type": "FunctionExpression",
        "id": null,
        "params": [],
        "defaults": [],
        "body": {
            "type": "BlockStatement",
            "body": expressions
        },
        "rest": null,
        "generator": false,
        "expression": false
    };
    args[1] = base;
}

function traverse(ast, visitor) {
    estraverse.traverse(ast, {
        enter: visitor.enter,
        leave: visitor.leave
    });
    if (visitor.end) {
        visitor.end();
    }
}

function convertAST(tree) {
    var testNodes = [];
    var deleteNodes = [];
    var moduleNode = null;
    var nodeTree = {
        currentModule: null,
        testNodes: [],
        deleteNodes: [],
        hasCurrentModule: function () {
            return nodeTree.currentModule != null &&
                nodeTree.testNodes.length > 0;
        },
        addTestNode: function (node) {
            nodeTree.testNodes.push(node);
        },
        moveTestNodesToDelete: function () {
            nodeTree.deleteNodes = nodeTree.deleteNodes.concat(nodeTree.testNodes);
            nodeTree.testNodes = [];
        }
    };
    traverse(tree, {
        enter: function (node, parent) {
            if (syntax.isModule(node)) {
                if (nodeTree.hasCurrentModule()) {
                    moveTestsToModule(nodeTree.currentModule, nodeTree.testNodes);
                    nodeTree.moveTestNodesToDelete();
                }
                convertModuleArguments(node);
                nodeTree.currentModule = node;
            }
            if (syntax.isTest(node)) {
                nodeTree.addTestNode(node);
            }
        },
        end: function () {
            if (nodeTree.hasCurrentModule()) {
                moveTestsToModule(nodeTree.currentModule, nodeTree.testNodes);
                nodeTree.moveTestNodesToDelete();
            }
            removeNodesFromAST(tree, nodeTree.deleteNodes);
        }
    });
    return tree;
}

function removeNodesFromAST(tree, removeNodes) {
    estraverse.replace(tree, {
        enter: function (node, parent) {
            _.forEach(removeNodes, function (deleteNode) {
                _.forEach(parent.body, function (currentNode, iterator) {
                    if (currentNode === deleteNode) {
                        parent.body.splice(iterator, 1);
                    }
                });
            })
        }
    });
}

