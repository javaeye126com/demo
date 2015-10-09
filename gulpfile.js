/*
 * Nodewebx Gulp构建配置
 * */

var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var shutils = require("shutils");
var filesystem = shutils.filesystem;
var StringUtils = require("underscore.string");

var uglify = require('gulp-uglify');
var GulpCmdNice = require("gulp-cmd-nice");
var rename = require("gulp-rename");
var gulpFilter = require('gulp-filter');
var gulpif = require('gulp-if');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var GulpChanged = require('gulp-changed');
var extend = require("extend");
var packageJson = require("./package.json");
var CmdNice = require("cmd-nice");

var argv = require('yargs').argv;

var isNotDebugFile = function(file) {
    var stats = fs.lstatSync(file.path);
    return stats.isFile() && !/\-debug.*?\.js/.test(file.path);
};

var isAbsolutePath = function(filePath) {
    return path.resolve(filePath) === path.normalize(filePath);
};

var findAllFilePathsByExtName = function(rootPath, extName) {
    return _.uniq(_.filter(filesystem.listTreeSync(rootPath), function(filePath) {
        return path.extname(filePath) === extName;
    }));
};

var filterByRequire = function(filePath, dependencyUtils, rootPath) {
    var keywords = StringUtils.lstrip(fs.realpathSync(filePath), {source: rootPath});
    keywords = StringUtils.lstrip(keywords, {source: "/"});
    var whoDepend = dependencyUtils.analyseWhoDepend(keywords);
    return whoDepend.length > 0;
};

var build = function(gulp, opt) {
    var options = {
        transport: {
            total: null,
            success: null,
            fail: null
        },
        debug: {
            total: null,
            success: null,
            fail: null
        },
        concat: {
            total: null,
            success: null,
            fail: null
        },
        sourcePath: argv.src || "src",
        distPath: argv.dist || "dist"
    };

    // seajs config
    options.configFile = options.sourcePath + '/config.js';

    if (_.isObject(opt)) {
        extend(true, options, opt);
    }
    var sourcePath = options.sourcePath;
    var distPath = options.distPath;
    if (!isAbsolutePath(sourcePath)) {
        sourcePath = path.normalize(path.join(process.cwd(), sourcePath));
    }
    if (!isAbsolutePath(distPath)) {
        distPath = path.normalize(path.join(process.cwd(), distPath));
    }

    // seajs的别名和路径
    var configFileContent = {
        alias: {},
        paths: {}
    };
    var configFile = options.configFile || argv.config || path.join(sourcePath, "config.js");
    var isConfigFileExist = fs.existsSync(configFile);
    if (isConfigFileExist) {
        configFileContent = fs.readFileSync(configFile, "utf-8");
        configFileContent = eval(configFileContent);
    }

    var dependencyUtils = new CmdNice.DependencyUtils({
        rootPath: sourcePath,
        alias: configFileContent.alias,
        aliasPaths: configFileContent.paths
    });

    var transportConfig = {
        debug: true,
        useCache: true,
        rootPath: sourcePath,
        paths: [
            sourcePath
        ],
        alias: configFileContent.alias,
        aliasPaths: configFileContent.paths,
        handlebars: {
            id: configFileContent.alias.handlebars || 'alinw/handlebars/1.3.0/runtime'
        },
        lessOptions: {
            paths: findAllFilePathsByExtName(sourcePath, ".less")
        },
        cssOptions: {
            paths: findAllFilePathsByExtName(sourcePath, ".css")
        },
        idRule: function(name) {
            return packageJson.family + "/" + packageJson.name + "/" + packageJson.version + "/" + name;
        },
        total: options.transport.total,
        success: options.transport.success,
        fail: options.transport.fail
    };

    var debugOptions = {
        paths: [
            distPath
        ],
        total: options.debug.total,
        success: options.debug.success,
        fail: options.debug.fail
    };

    var getTransportSource = function() {
        return gulp.src([
            sourcePath + "/**/*.js",
            sourcePath + "/**/*.handlebars",
	    sourcePath + "/**/*.tpl"
        ]);
    };

    var handleTransport = function(source) {
        return source
            .pipe(GulpChanged(distPath))
            .pipe(gulpFilter(function(file) {
                var extName = path.extname(file.path);
                if (extName === ".js" || extName === '.handlebars' || extName === '.tpl'){
                    return true;
                }else{
                    if(extName === '.css') return false;
                }
                return filterByRequire(file.path, dependencyUtils, transportConfig.rootPath);
            }))
            .pipe(GulpCmdNice.cmdTransport(transportConfig))
            .pipe(uglify({
                mangle: false,
                compress: {
                    warnings: false,
                    drop_console: true
                },
                beautify: false,
                report: "min",
                preserveComments: false
            }))
            .pipe(rename(function(file) {
                var extName = file.extname;
                if(extName === ".handlebars"){
                    file.extname = ".handlebars.js";
                }else if(extName === '.tpl'){
                    file.extname = ".tpl.js";
                }else{
		    file.extName = ".js";
		}
            }))
            .pipe(gulp.dest(distPath))
            .pipe(GulpCmdNice.cmdDebug(debugOptions))
            .pipe(rename(function(file) {
                var extName = path.extname(file.basename);
                if (!extName) {
                    file.extname = "-debug.js"
                }
                else {
                    file.basename = StringUtils.rstrip(file.basename, {source: extName});
                    file.extname = "-debug" + extName + file.extname;
                }
            }))
            .pipe(gulp.dest(distPath))
    };

    gulp.task('transport', function() {
        return handleTransport(getTransportSource());
    });

    gulp.task("concat_scripts", ["transport"], function() {
        return gulp.src(distPath + "/**/*.js")
            .pipe(GulpCmdNice.cmdConcat({
                paths: [
                    distPath
                ],
                useCache: true,
                idExtractor: function(name) {
                    var pattern = packageJson.family +
                        "/" +
                        packageJson.name +
                        "/" +
                        packageJson.version +
                        "/" +
                        "(.*)";
                    pattern = new RegExp(pattern, "g");
                    var matched = pattern.exec(name);
                    if (matched) {
                        return matched[1];
                    }
                    else {
                        return name;
                    }
                },
                total: options.concat.total,
                success: options.concat.success,
                fail: options.concat.fail
            }))
            .pipe(gulp.dest(distPath))
            .pipe(gulpif(isNotDebugFile, uglify({
                mangle: false,
                compress: {
                    warnings: false,
                    drop_console: true
                },
                beautify: false,
                report: "min",
                preserveComments: false
            })))
            .pipe(gulp.dest(distPath));
    });

    gulp.task("less", function() {
        return gulp.src(sourcePath + "/**/*.less")
            .pipe(less({
                paths: findAllFilePathsByExtName(sourcePath, ".less"),
                cleancss: true,
                compress: false,
                ieCompat: true
            }))
            .pipe(gulp.dest(sourcePath));
    });

    gulp.task("cssmin", ["less"], function() {
        return gulp.src(sourcePath + "/**/*.css")
            .pipe(minifyCSS({
                keepBreaks:false,
                keepSpecialComments: 0,
                benchmark: false,
                debug: false,
                compatibility: true,
                noAdvanced: true,
                processImport: true
            }))
            .pipe(gulp.dest(distPath));
    });

    gulp.task("copy", function() {
        return gulp.src([
            sourcePath + "/**/*.jpg",
            sourcePath + "/**/*.jpeg",
            sourcePath + "/**/*.gif",
            sourcePath + "/**/*.png",
            sourcePath + "/**/*.woff",
            sourcePath + "/**/*.swf",
            sourcePath + "/**/*.html"
        ]).pipe(gulp.dest(distPath));
    });

//    gulp.task("default", ["concat_scripts", "cssmin", "copy"]);
    gulp.task("default", ["transport", "cssmin", "copy"]);
};

if (require.main && !_.isEmpty(require.main)) {
    build(require("gulp"));
}

module.exports = build;
