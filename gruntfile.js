module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'kdaniti@gmail.com',
                password: 'SeaShells900!',
                branch: 'default'
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}