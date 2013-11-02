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
        },
        watch: {
            test: {
                files: '<%= mochaTest.test.src %>',
                tasks: ['mochaTest']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-mochaTest');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    // Default task.
    grunt.registerTask('default', ['mochaTest']);

};
