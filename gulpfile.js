var gulp       = require('gulp');
var webserver  = require('gulp-webserver');
var gutil      = require('gulp-util');
var path       = require('path');
var fs         = require('fs');
var browserify = require('browserify');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var appDir = __dirname;

function build(src, dist, is_watch) {
  var b = browserify(path.join(appDir, src || './src/index.js'), {}).transform("babelify", {presets: ['react', 'es2015']});

  if(is_watch) b.plugin(watchify);

  if(is_watch) {
    b.on('update', bundleFunction);
    b.on('log', gutil.log);
  }
  return bundleFunction();

  function bundleFunction() {
    if(is_watch) return b.bundle().on("error", function (err) { console.log("Error : " + err.message); })
                          .pipe(fs.createWriteStream(path.join(appDir, (dist || 'dist')+'/bundle.js')));

    else return b.bundle().on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    //.pipe(buffer())
    //.pipe(uglify({mangle: false}))
    .pipe(gulp.dest(path.join(appDir, dist || 'dist')));
  }
}

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      livereload: true
    }));
});

function buildPlugin(name, isWatch) {
  build('./plugins/'+name+'/client/index.js', './plugins/'+name, isWatch);
}

function buildPlugins(isWatch) {
  buildPlugin('sample', isWatch);
  buildPlugin('explorer', isWatch);
  buildPlugin('property-editor', isWatch);
  buildPlugin('diagram-editor', isWatch);
  buildPlugin('code-generator', isWatch);
  buildPlugin('simulator', isWatch);
  buildPlugin('gme', isWatch);  
}

gulp.task('watch-plugins', function () {
  buildPlugins(true);
});

gulp.task('build-plugins', function () {
  buildPlugins(false);
});

gulp.task('watch', ['watch-plugins'], function () {
  return build('./src/client/index.js', 'dist', true);
});

gulp.task('build', ['build-plugins'], function () {
  return build('./src/client/index.js', 'dist', false);
});