var gulp       = require('gulp');
var webserver  = require('gulp-webserver');
var gutil      = require('gulp-util');
var path       = require('path');
var fs         = require('fs');
var browserify = require('browserify');
var babel      = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var clean      = require('gulp-clean');
var runSequence = require('run-sequence');
var webpack    = require("webpack");
var webpackConfig = require('./webpack.config');
var appDir = __dirname;

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      livereload: true
    }));
});

gulp.task('clean', () => {
  return gulp.src(['lib'], { read: false })
    .pipe(clean());
});


function getPluginConfig(src, dest) {
  return {
    entry: {
        client: src
    },
    output: {
        path: dest,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
                test: /\.js[x]?$/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2017']
                }
            }
        ]
    }  
  }  
}

function buildPlugin(name) {
  return new Promise(function(resolve, reject) {
    webpack(getPluginConfig('./plugins/'+name+'/client/index.js', path.resolve( __dirname, './plugins/'+name) ), function() {
      resolve();
    });
  });
}

var plugins = ['sample', 'explorer', 'property-editor', 'diagram-editor', 'code-generator', 'simulator', 'gme'];

gulp.task('build-plugins', function (done) {
  Promise.all(plugins.map((name) => {
    return buildPlugin(name)
  })).then(() => {
    done();
  }).catch(function(err) {
    console.error(err);
  })
});

gulp.task('babel', () => {
  return gulp.src('./src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['react','es2015']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'));
});

gulp.task('webpack', (done) => {
  webpack(webpackConfig, function() {
    done();
  });
});

gulp.task('watch', ['build'], function(){
  gulp.watch(["src/**/*.js"],["babel"]);
  gulp.watch(["lib/**/*.js"],["webpack"]);
});

gulp.task('build', ['build-plugins'], (done) => {
  runSequence('clean', 'babel', 'webpack', done);
});