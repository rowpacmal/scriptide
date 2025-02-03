import gulp from 'gulp';
import zip from 'gulp-zip';
import app from './package.json' assert { type: 'json' };

export default gulp.series((cb) => {
  gulp
    .src('build/**')
    .pipe(zip(`${app.name}_${Date.now()}.mds.zip`))
    .pipe(gulp.dest('minidapp'));

  cb();
});
