/*

REQUIRED
========
*/

var gulp = require('gulp');
    browserSync = require('browser-sync').create();
    postcss = require('gulp-postcss');
    atImport = require('postcss-import');
    simplevars = require('postcss-simple-vars');
    atExtend = require('postcss-extend');
    nestedcss = require('postcss-nested');
    autoprefixer = require('autoprefixer');
    cssnano = require('cssnano');
    mqpacker = require('css-mqpacker');
    mixins = require('postcss-mixins');
    sourcemaps = require('gulp-sourcemaps');
    lost = require('lost');
    type = require('postcss-responsive-type');
    customMedia = require("postcss-custom-media");
    colorFunction = require("postcss-color-function");
    rename = require('gulp-rename');
    rimraf = require('gulp-rimraf');
    exec = require('child_process').exec;

/*

FILE PATHS
==========
*/

var paths = {
    bsProxy: 'localhost/m2/',
    rootPath: '/srv/http/m2/',
    cssSrc: 'app/design/frontend/Trive/theme/web',
    cssParentSrc: 'app/design/frontend/Trive/blank/web',
    cssDest: 'pub/static/frontend/Trive/theme/',
    lang: 'en_US'
}

/*

CSS
===
*/

gulp.task('css', function () {
    var processors = [
        atImport({path: [paths.rootPath + paths.cssParentSrc + "/src/preCSS"]}),
        customMedia,
        mixins, /* Needs to go before postcss-simple-vars & postcss-nested! */
        autoprefixer,
        simplevars,
        nestedcss,
        mqpacker, /* Needs to go after nestedcss! */
        atExtend, /* Needs to go after nestedcss! */
        lost,
        type,
        colorFunction
        //cssnano
    ];
    return gulp.src(paths.rootPath + paths.cssSrc + '/src/preCSS/style.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.rootPath + paths.cssSrc + '/css'))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(paths.rootPath + paths.cssDest + paths.lang + '/css'));
});

/*

HTML, IMAGES & JS
=================
*/

var files = [paths.rootPath + paths.cssSrc + '/../**/*.{gif,jpg,png,svg,html,js}',
            '!./node_modules/**'];

gulp.task('static', function() {
    gulp.src(files)
    .pipe(rename(function (path) {
        path.dirname = path.dirname.replace("web/", "/");
    }))
    .pipe(gulp.dest(paths.rootPath + paths.cssDest + paths.lang));
});

/*

BROWSERSYNC
===========
*/

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: paths.bsProxy,
        notify: true,
        port: 8080
    });
});

/*

CLEAN
=====
*/

gulp.task('clean', function(cb) {
    return gulp.src([
        paths.rootPath + 'pub/static/*',
        '!' + paths.rootPath + 'pub/static/.htaccess',
        '!' + paths.rootPath + 'pub/static/frontend/',
        paths.rootPath + 'pub/static/frontend/*',
        '!' + paths.rootPath + 'pub/static/frontend/Magento/',
        paths.rootPath + 'var/cache/*',
        paths.rootPath + 'var/generation/*',
        paths.rootPath + 'var/view_preprocessed/*'
    ], {read: false})
    .pipe(rimraf({ force: true }));
});

/*

DEPLOY
======
*/

gulp.task('deploy', function (cb) {
    exec(paths.rootPath + 'bin/magento setup:static-content:deploy',
        function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
    });
})

/*

WATCH
=====
*/

gulp.task('watch', ['browser-sync'], function() {
    // Watch css files
    gulp.watch(paths.rootPath + paths.cssSrc + '/src/preCSS/**/*.css', ['css']);
    //Watch html, images & js
    gulp.watch(files, ['static']);
});

gulp.task('default', ['css', 'static', 'watch'], function() {
});
