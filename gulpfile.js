const { series, src, dest, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const del = require('del');
const precompile = require('gulp-copy-content');

sass.compiler = require('node-sass')

// 编译sass
function compileSass() {
	return src('./src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(dest('./dist/css'))
}

// 编译ES6
function compileJS() {
	return src('./src/js/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(dest('./dist/js'))
}

// 添加浏览器前缀
function autoprefixerFn() {
	return src('./dist/css/*.css')
		.pipe(autoprefixer())
		.pipe(dest('./dist/css'))
}

// 压缩css文件
function cleanCssFn() {
	return src('./dist/css/*.css')
		.pipe(cleanCss({
			compatibility: 'ie8'
		}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest('./dist/css'))
}

// 压缩图片
function minImage() {
	return src('./src/images/*')
		.pipe(imagemin())
		.pipe(dest('./dist/images'))
}

// 复制html模板
function htmlFileinClude() {
	return src('./src/*.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			context: {
				sideNav: [
					{ name: '概述', url: 'index.html', iconCls: 'gaishu' },
					{ name: '直播间', url: '###', iconCls: 'zhibojian' },
					{ name: '导播台', url: '###', iconCls: 'daobotai' },
					{ name: '商品', url: '###', iconCls: 'shangpin' },
					{ name: '用户', url: '###', iconCls: 'yonghu' },
					{ name: '数据', url: '###', iconCls: 'shuju' },
					{ name: '资产', url: '###', iconCls: 'zichan' },
					{ name: '营销', url: 'market.html', iconCls: 'shezhi' },
					{ name: '设置', url: '###', iconCls: 'sucai' }
				]
			}
		}))
		.pipe(dest('./dist'))
}

// 删除文件和文件夹
function delFn(cb) {
	return del([
		'./dist/*.html',
		'./dist/css/*',
		'./dist/images/*',
		'./dist/js/*',
		'./dist/lib/*',
	], cb)
}

// 复制文件
function copyFile() {
	return src('./src/lib/**/*')
		.pipe(precompile({
			reg: /<!\-\-copyContent\s+"([^"]+)"\s+\-\->/g,  // 匹配的文件正则.
			baseSrc: '', // 设置根目录之后不需要编写完整的路径.
		}))
		.pipe(dest('./dist/lib'))
}

// 本地服务器
function devServer() {
	return connect.server({
		root: 'dist/',
		port: 8999,
		host: '0.0.0.0',
		livereload: true
	})
}

// 服务器重加载
function serverReload() {
	return src(['./src/*.html', './src/js/*.js', './src/scss/*.scss'])
		.pipe(connect.reload());
}

// 压缩JS代码
function uglifyFn() {
	return src('./dist/js/main.js')
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest('./dist/js'))
}

// 监听任务
function watchFn() {
	watch(['./src/scss/*.scss', './src/js/*.js', './src/*.html', './images/*'], series(delFn, htmlFileinClude, compileJS, compileSass, minImage, copyFile, serverReload));
}

// 开发环境
function defaultTask() {
	return series(delFn, htmlFileinClude, compileJS, compileSass, autoprefixerFn, minImage, copyFile, devServer);
}

// 生产环境
function buildTask() {
	setTimeout(() => {
		watchFn();
	}, 1500);
	return series(delFn, htmlFileinClude, compileJS, compileSass, autoprefixerFn, cleanCssFn, uglifyFn, minImage, copyFile);
}


exports.default = defaultTask();
exports.build = buildTask();
