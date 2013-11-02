var fs = require('fs');

module.exports = function (argv) {
    if (process.argv.length > 2) {
        var args = process.argv.slice(2);
        var filename = args[0];
        var defineFileName = args[1];

        var source = fs.readFileSync(filename, 'utf8');
        var defineFile = fs.readFileSync(defineFileName, 'utf8');
        console.log(rephrase.transformSource(source, defineFile));
        return;
    }

    require("../reQUnit").awesome();
};