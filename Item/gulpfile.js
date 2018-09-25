//gulp模块
let gulp=require("gulp"); 
//编译压缩js模块
let minifyJs=require("gulp-babel-minify"); 
 //压缩css模块
let minifyCss=require("gulp-clean-css");
 //服务器模块
let connect=require("gulp-connect");   
//scss模块
let sass=require("gulp-sass");
//复制压缩所有的html,css,js
gulp.task("build",()=>{
    //翻译压缩js
    gulp.src("./youhuo/**/*.js")//读取文件
    .pipe(minifyJs()) //编译压缩处理
    .pipe(gulp.dest("./dit")) //生成到指定目录
    //复制html
    gulp.src("./youhuo/**/*.html") //读取html文件
    .pipe(gulp.dest("./dit")) //复制到指定目录
    //压缩css
    gulp.src("./youhuo/**/*.css") //读取css文件
    .pipe(minifyCss()) //压缩处理
    .pipe(gulp.dest("./dit")) //生成到指定文件
});

//当html发生改变，将要执行的任务
gulp.task("updataHtml",()=>{
    gulp.src("./youhuo/**/*.html")
    .pipe(gulp.dest("./dit"))
    .pipe(connect.reload())
})
//当css发生改变，将要执行的任务
gulp.task("updataJs",()=>{
    gulp.src("./youhuo/**/*.js")
    .pipe(minifyJs())
    .pipe(gulp.dest("./dit"))
    .pipe(connect.reload());
})
//当js发生改变，将要执行的任务
gulp.task("updataCss",()=>{
    gulp.src("./youhuo/**/*.css")
    .pipe(minifyCss())
    .pipe(gulp.dest("./dit"))
    .pipe(connect.reload())
})
//scss发生改变执行任务
gulp.task("updataScss",()=>{
    gulp.src("./youhuo/**/*.scss")
    .pipe(sass({
        outputStyle:"expanded"
    }).on("error",sass.logError))
    .pipe(gulp.dest("./dit"))
    .pipe(connect.reload())
})

//创建一个服务器
gulp.task("server", ()=>{
    connect.server({
        root : "dit", //指定服务器根目录在哪
        port : 8080, 
        livereload : true  //服务器是否可以热部署（即时刷新）
    });
})
//代理服务器
gulp.task("proxyserver", ()=>{
    connect.server({
        root: "dit",
        port: 9090,
        livereload: true,
        middleware: function (connect, opt) {
          var Proxy = require('gulp-connect-proxy');
          opt.route = '/proxy';
          var proxy = new Proxy(opt);
          return [proxy];
        }
    });
})
//监听所有变化
gulp.watch("./youhuo/**/*.html",["updataHtml"]); 
gulp.watch("./youhuo/**/*.js",["updataJs"]); 
gulp.watch("./youhuo/**/*.css",["updataCss"]); 
gulp.watch("./youhuo/**/*.scss",["updataScss"]); 