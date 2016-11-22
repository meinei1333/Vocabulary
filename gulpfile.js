var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    rimraf = require('gulp-rimraf'),
    webpackStream = require('webpack-stream'),
    exec = require('child_process').exec,
    browserSync = require('browser-sync').create();

gulp.task('load_voc', ['generate-spritesheets', 'webpack'], function () {
    browserSync.init({
        browser: 'google chrome',
        server: {
            baseDir: './',
            index: 'load_voc.html'
        }
    });

    browserSync
        .watch(['app.js', 'load_vc.html', './common/**/*.*', './js/**/*.*', '*.css'])
        .on('change', browserSync.reload);
});    

gulp.task('browser-sync-for-development', ['generate-spritesheets', 'webpack'], function () {
    browserSync.init({
        browser: 'google chrome',
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });

    browserSync
        .watch(['app.js', 'index.html', './common/**/*.*', './js/**/*.*', '*.css'])
        .on('change', browserSync.reload);
});

gulp.task('clean-deploy', function () {
    return gulp.src(['./deploy'], { read: false }).pipe(rimraf());
})

// clean all compiled files and deploy folder
gulp.task('clean', ['clean-deploy'], function () {
    files = ['./app.js']
    return gulp.src(files, { read: false })
        .pipe(rimraf());
})

gulp.task('move-files-to-deploy', ['generate-spritesheets', 'webpack'], function () {
    var files = ['./app.js', '*.css', 'index.html', '*.php','./*.png', './locales/**/*.*', './assets/spritesheets/**/*.*', './assets/sound/*'];
    return gulp.src(files, { base: './' })
        .pipe(gulp.dest('deploy'));
});

// webpack
gulp.task('webpack', function () {
    return webpackRun('./webpack.config.js');
});

function webpackRun(config_file) {
    return gulp.src('./js/App.js')
        .pipe(webpackStream(require(config_file)))
        .pipe(gulp.dest('./'));
};

// generate textpacker spritesheet (.tps)
gulp.task('generate-spritesheets', function (cb) {
    var isWindows = /^win/.test(process.platform);
    command = isWindows ? 'for /R . %f in (*.tps) do texturepacker %f' :
        'find . -name "*.tps" | xargs texturepacker'
    command += ' --texture-format "png8" --dither-type "PngQuantMedium" --format "pixijs"'
    exec(command, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// for developer test and compile
gulp.task('default', ['webpack', 'browser-sync-for-development'], function () {
    gulp.watch(['./js/**/*.js'], ['webpack'], ['index.html']);
});

// deploy to production, it will move essential files to deploy folder
gulp.task('deploy', ['webpack', 'generate-spritesheets', 'move-files-to-deploy'], function () {

});