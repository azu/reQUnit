#!/bin/bash

declare tmpdir="`basename ${0}`.$$"
mkdir -p ${tmpdir}
trap 'rm -r ${tmpdir}' 0
node "./../bin/reQUnit.js" "./../example/simple-code.js" > ${tmpdir}/simple-code.js
jasmine-node --test-dir ${tmpdir}/