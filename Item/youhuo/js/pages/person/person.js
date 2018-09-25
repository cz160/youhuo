require(["http://localhost:9090/js/conf/config.js"],()=>{
    require(["jquery"],()=>{
        //导入公共头部
        $("#a").load("http://localhost:9090/pages/common/head.html");
        //导入公共尾部
        $("#f").load("http://localhost:9090/pages/common/foot.html");
    })
})