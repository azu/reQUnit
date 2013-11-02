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
        if (node.expression == null) {
            return false;
        }
        return (node.type === estraverse.Syntax.ExpressionStatement &&
            node.expression.type === estraverse.Syntax.CallExpression &&
            node.expression.callee.name === "test")
    },
    isModule: function isModule(node) {
        if (node.expression == null) {
            return false;
        }
        return (node.type === estraverse.Syntax.ExpressionStatement &&
            node.expression.type === estraverse.Syntax.CallExpression &&
            node.expression.callee.name === "module")
    }
};

function addFunctionNode(node, block) {
    if (node.expression == null) {
        return;
    }
    node.expression["arguments"].push(block);
}

function moveTestsToModule(moduleNote, testNodes) {
    var copyNodes = _.map(testNodes, _.clone);
    addFunctionNode(moduleNote, {
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
    traverse(tree, {
        enter: function (node, parent) {
            if (syntax.isModule(node)) {
                if (moduleNode != null) {
                    moveTestsToModule(moduleNode, testNodes);
                    deleteNodes = deleteNodes.concat(testNodes);
                    testNodes = [];
                }
                moduleNode = node;
            }
            if (syntax.isTest(node)) {
                testNodes.push(node);
            }
        },
        end: function () {
            if (moduleNode != null && testNodes.length > 0) {
                moveTestsToModule(moduleNode, testNodes);
                deleteNodes = deleteNodes.concat(testNodes);
            }
            removeNodesFromAST(tree, deleteNodes);
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

function removeFromTree(ast, node) {
    var key, child, filterMethod = function (j) {
        return !_.isEqual(j, node);
    };
    for (key in ast) {
        if (ast.hasOwnProperty(key)) {
            child = ast[key];
            if (child === node) {
                delete ast[key];
            } else if (Array.isArray(child)) {
                ast[key] = ast[key].filter(filterMethod);
            } else if (typeof child === 'object' && child !== null) {
                removeFromTree(child, node);
            }
        }
    }
}
