"use strict";

// подключаем пакеты
const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const dist = "./dist/";

// ТАСКА : HTML в src -> кладем в dist (запустит сервер)
// stream - вносим измнения в страницу браузера (без обновления)
gulp.task("copy-html", () => {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest(dist))
        .pipe(browsersync.stream());
});

// ТАСКА : АССЕТЫ в src/assets (любые подпапки, имена, форматы) -> кладем в dist/assets (запустит сервер)
// reload - обновляем страницу браузера по готовности
gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
        .pipe(gulp.dest(dist + "/assets"))
        .on("end", browsersync.reload);
});

// запускаем WEBPACK в DEV-режиме (с BABEL-LOADER c режимом debug)
// main.js - как файл точки входа, watch не используем (он в gulp)
// результат кладем в папку dist и обновляем браузер
gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'script.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(dist))
        .on("end", browsersync.reload);
});

// запускаем WEBPACK в PROD-режиме (с BABEL-LOADER)
// результат кладем в папку dist
gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(dist));
});

// СЕРВЕР (LIVE-RELOAD) : поднимаем сервер browsersync, он запускает файлы в папке dist
// при изменении определенных файлов сервер запускает определенные таски 
gulp.task("watch", () => {
    browsersync.init({
        server: "./dist/",
        port: 4000,
        notify: true
    });

    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

// чтобы ГУЛП учел изменения в src, которые произошли до его включения (отслеживания)
// даем ему одну таску по запуску трех других
gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));

// ТАСКА default не нуждается в своем вызове (можно просто вызвать в терминале gulp - она вызовется автоматически)
gulp.task("default", gulp.parallel("watch", "build"));