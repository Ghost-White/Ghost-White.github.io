var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),				//sass编译
	fileinclude  = require('gulp-file-include'),	//html嵌套
	autoprefixer = require('gulp-autoprefixer'),	//css自动前缀
    minifycss = require('gulp-minify-css'),			//css压缩
    jshint = require('gulp-jshint'),				//js校验
    uglify = require('gulp-uglify'),				//js压缩
    imagemin = require('gulp-imagemin'),			//图片压缩
    rename = require('gulp-rename'),				//
    concat = require('gulp-concat'),				//js合并
    notify = require('gulp-notify'),				//更新提醒
    cache = require('gulp-cache'),					//图片缓存，只有图片替换了才压缩
    livereload = require('gulp-livereload'),		//自动刷新
    del = require('del');							//清除文件

//html嵌套
gulp.task('f-i', function() {   //fileinclude
    gulp.src(['src/pages/**/**.html','!src/pages/includes/**.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
    .pipe(gulp.dest(''))
  //  .pipe(notify({ message: 'F-i task complete' }));
});


//scss编译
gulp.task('styles', function() {
  return gulp.src('src/styles/*.css')
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    /*.pipe(gulp.dest('dist/assets/css'))*/
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
   // .pipe(notify({ message: 'Styles task complete' }));
});


//js校验、合并、压缩
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    /*.pipe(jshint('.jshintrc'))*/
    /*.pipe(jshint.reporter('default'))*/
    /*.pipe(concat('main.js'))*/
    /*.pipe(gulp.dest('dist/assets/js'))*/
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
   // .pipe(notify({ message: 'Scripts task complete' }));
});

//图片压缩
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
   // .pipe(notify({ message: 'Images task complete' }));
});


//清除文件
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb);
});

//设置默认任务
gulp.task('default', ['clean'], function() {	//要clean执行完成才能执行后面的三个任务
    gulp.start('styles', 'scripts', 'images');
});


//监听文件
gulp.task('watch', function() {
  //当.sass、.js和图片修改时将执行对应的任务。
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});


//测试
gulp.task('test',function(){
  gulp.start('styles', 'scripts', 'images','f-i');
});