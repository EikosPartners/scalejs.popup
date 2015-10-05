module.exports =
    release:
        expand: true
        flatten: true
        src: ['build/<%= package.name %>.js', 'build/<%= package.name %>.min.js', 'src/styles/popup-styles.css']
        dest: 'dist'
        filter: 'isFile'
