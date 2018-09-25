define(["jquery","ajaxUrl"],function($,ajaxUrl){
    return function(){
        //头部动态效果
        //YoHO！BuY框
        $("#hover1").hover(function () {
            $(this).css("background", "#DCDCDC");
            $("#u1_a").css("display", "block");
        }, function () {
            $(this).css("background", "");
            $("#u1_a").css("display", "none");
        })
        //弹出框1内部
        var mouseover = ["YOHO!", "YOHO!BOYS", "YOHO!GIRLS", "Mars", "YO'HOOD"];
        var mouseout = ["集团官网", "男生潮流", "女生潮流", "新鲜好去处", "潮流嘉年华"];
        $("#u1_a li").on("mouseover", function () {
            $(this).text(mouseout[$(this).index()]);
        })
        $("#u1_a li").on("mouseout", function () {
            $(this).text(mouseover[$(this).index()]);
        })

        //客服服务
        $("#kh").hover(function () {
            $(this).css("background", "#EAECEB");
            $("#u2_kh").css("display", "block");
        }, function () {
            $(this).css("background", "#f4f4f4");
            $("#u2_kh").css("display", "none");
        })

        //关注有货
        $("#u2_gz").hover(function () {
            $("#box1").css("display", "block");
        }, function () {
            $("#box1").css("display", "none");
        })
        //手机版
        $("#u2_sj").hover(function () {
            $("#box2").css("display", "block");
        }, function () {
            $("#box2").css("display", "none");
        })
         //搜索框和导航栏动态效果

        //搜索框提示效果(利用jsonp接口请求) //百度接口

        $("#serach_from").on("input", function () {
            //生成一个script标签
            var sc = document.createElement("script");
            //使用接口模板
            sc.src = ajaxUrl.search(this.value);
            document.body.appendChild(sc);
        });
        //回调函数处理数据
        window.callback = function (data) {
            $("#suggestion").text("");
            data.s.forEach((item, index) => {
                if (index < 5) {
                    //限制5条记录
                    var li = document.createElement("li");
                    li.innerHTML = item;
                    $("#suggestion").append(li);
                    //划入li事件
                    $("#suggestion li").hover(function () {
                        $(this).css("background", "#D3D3D3");
                    }, function () {
                        $(this).css("background", "");
                    });
                    //点击li事件
                    $("#suggestion li").click(function () {
                        $("#serach_from").val($(this).text());
                        //点击之后隐藏ul
                        $("#suggestion").css("display", "none");
                    })
                }
                //生成一天记录之后显示ul
                $("#suggestion").css("display", "block");
            });
        }
         //鼠标划入购物车图标显示隐藏框
         $(".cart").hover(function () {
            $(".cart-hide").show();
        }, function () {
            $(".cart-hide").hide();
        })
        //头部动态完成

        
         //固定定位js效果
         $("#del_btn").on("click",function(){
            $(this).parent().css("display","none");
         })
         //滚动条滚动
         $(window).scroll(function(){
             if($(this).scrollTop()>10){
                 $(".fix2").show();
             }else{
                $(".fix2").hide();
             }
         })
         //鼠标划入二维码
         $(".box1-one").hover(function(){
            $("#box-hide").css("display","block");
         },function(){
            $("#box-hide").css("display","none");
         })
         //回到顶部
         $(".box2").on("click",function(){
             $("html,body").animate({
                 scrollTop:0
             })
         })
    }
})