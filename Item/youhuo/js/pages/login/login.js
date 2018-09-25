require(["../../conf/config"], () => {
    require(["jquery", "cookie"], ($, cookie) => {
        $(function () {
            //滚动条滚动
            $(window).scroll(function () {
                if ($(this).scrollTop() > 5) {
                    $(".fix2").show();
                } else {
                    $(".fix2").hide();
                }
            })
            //鼠标划入二维码
            $(".box1-one").hover(function () {
                $("#box-hide").css("display", "block");
            }, function () {
                $("#box-hide").css("display", "none");
            })
            //回到顶部
            $(".box2").on("click", function () {
                $("html,body").animate({
                    scrollTop: 0
                })
            })

            //点击切换登录方式（二维码或者账号）
            $(".bg").eq(0).on("click", function () {
                $("#login1").css("display", "none");
                $(".table").css("display", "block");
            })
            $(".bg").eq(1).on("click", function () {
                $("#login1").css("display", "block");
                $(".table").css("display", "none");
            })

            //登录验证
            $(".yz").blur(function () {
                if ($(this).val() == "") {
                    $(this).parent().find(".err-tip").css("display", "block");
                    $(this).css("border-color", "red");
                } else if ($(this).val().length < 6) {
                    $(this).val("长度不合法");
                    $(this).css("border-color", "red");
                } else {
                    $(this).css("border-color", "green");
                }
            })
            //监听用户输入,不能空隐藏提示
            $(".yz").on("input", function () {
                if ($(this).val() != "") {
                    $(this).parent().find(".err-tip").css("display", "none");
                    $(this).css("border-color", "#dbdbdb");
                }
            })
            //点击图片旋转
            var index = 0;
            $(".img-check-pic").on("click", function () {
                index++;
                if (index == 1 || index == 0) {
                    $(this).find("img").css({
                        "margin-top": -10 + -70 * index
                    })
                } else {
                    $(this).find("img").css({
                        "margin-top": -30 + -70 * index
                    })
                }
                if (index >= 3) index = -1;
            })

             //点击登录时判断账号是否存在
             var user = cookie.getCookie("user");
             var pwd = cookie.getCookie("pwd");
             $(".login-Btn").on("click", function () {
                 if ($(".yz").eq(0).val() != user && $(".yz").eq(1).val() != pwd) {
                     $("#tz").attr("href", "#");
                 }
             })
        })
    })
})