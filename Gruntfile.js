module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            html_files: {
                files: ['./index.html']
            },
            js: {
                files: [
                    './js/*.js',
                    './*.js'
                ]
            },
            css: {
                files: ['./css/*.css']
            },
            typescript: {
                files: ['<%= typescript.sourcemap.src %>'],
                tasks: ['newer:typescript']
            },
            options: {
                sourcemap: true,
                livereload: true
            }
        },
        connect: {
            options: {
                port: 1234,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true
                }
            }
        },
        typescript: {
            sourcemap: {
                src: './ts/*.ts',
                dest: './main.js',
                options: {
                    sourcemap: true
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    src: ['css/**', 'js/**', 'index.html'],
                    dest: 'build/'
                }]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-typescript");
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('build', ['typescript']);
};