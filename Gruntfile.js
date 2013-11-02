'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    // Default task.
    grunt.registerTask('default', ['mochaTest']);
    grunt.registerTask('test', ['mochaTest']);

};
