var gulp = require('gulp') // assign its package to the variable 'gulp'
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()

gulp.task('info', function() {
    console.log('General information: ')
    console.log('1) ... ')
    console.log('2) ... ')
    console.log('3) ... ')
    console.log('4) ... ')
})

gulp.task('sass', function() {
    //console.log('}}}}--Strart-sass--{{{{')
    return gulp.src('app/scss/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('watch', ['browserSync', 'sass'], function() {
    //console.log('}}}}--Watch-init--{{{{')
    gulp.watch('app/scss/**/*.+(scss|sass)', ['sass'])
    gulp.watch('app/*.html',     browserSync.reload)
    gulp.watch('app/js/**/*.js', browserSync.reload)
})

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
})