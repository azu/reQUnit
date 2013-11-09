#!/usr/bin/env node

var cli = require("../lib/cli"),
    argv = require("optimist")
        .usage("Usage: reQunit qunit-test.js")
        .options('d', {
            alias: "definition",
            describe :"rule definition file path"
        })
        .argv;

cli.argv(argv);