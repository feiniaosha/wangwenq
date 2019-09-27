var gulp = require('gulp');

//自动加载插件:可以加载以gulp-打头的插件
var load = require('gulp-load-plugins')();
//搭建静态服务器插件
var browser = require('browser-sync').create()

// var uglify = require('gulp-uglify');//压缩js
// var minifyCss = require("gulp-minify-css");//压缩css
// var minifyHtml = require('gulp-minify-html');//压缩html
// var imageMin = require('gulp-imagemin');//压缩图片
// var babel = require('gulp-babel');//es6转es5
// var concat = require('gulp-concat');//合并js文件
// var rename = require('gulp-rename');//文件重命名
//压缩js
gulp.task('js',function(done){
	gulp.src('./src/js/*.js')
	//babel:es6转es5
	// .pipe(babel({
 	//      presets: ['@babel/env']
 	//  }))
 	.pipe(load.babel({
            presets: ['@babel/env']
    }))
	// .pipe(concat('all.js'))
	.pipe(load.concat('all.js'))
	// .pipe(uglify())
	.pipe(load.uglify())
	.pipe(gulp.dest('./dist/js/'))
	done()
})

//压缩css
gulp.task('css',function(done){
	gulp.src('./src/css/*.css')
	// .pipe(minifyCss())
	.pipe(load.minifyCss())
	.pipe(gulp.dest('./dist/css/'))

	gulp.src('./src/css/*.css')
	.pipe(loader.sass())
	.pipe(gulp.dest('./dost/css/'))
	done();
})

//压缩html
gulp.task('html',function(done){
	gulp.src('./src/*.html')
	// .pipe(minifyHtml())
	.pipe(load.minifyHtml())
	// .pipe(rename('index.min.html'))
	// .pipe(load.rename('index.min.html'))
	.pipe(gulp.dest('./dist/'))
	done()
})

//压缩image
gulp.task('image',function(done){
	gulp.src('./src/img/**')
	// .pipe(imageMin())
	.pipe(load.imagemin())
	.pipe(gulp.dest('./dist/img/'))
	done()

})

//压缩所有文件
// gulp.task('minify',gulp.parallel('js','css','html','image'));//并行
gulp.task('minify',gulp.series(gulp.parallel('js','css','html','image'),function(done){	
	browser.reload()
	done()
}));//串行


//开启静态服务器任务
gulp.task('server',function(){
	browser.init({
		server:"./dist/",
		port:'8080'
	})
	gulp.watch('./src',gulp.series('minify'))
})
