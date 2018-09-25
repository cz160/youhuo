require(["./conf/config"], () => {
    //引入jq模块 Swiper模块 公共头部动态模块 字符串模板模块
    require(["jquery", "Swiper", "CommntUse", "ajaxUrl","tempstr","cookie"], ($, Swiper, CommntUse, ajaxUrl,tempstr,cookie) => {
        //公共js
        CommntUse();
        //轮播图
        var index = 0;
        var lock = true;
        //向右滚动
        function move_left() {
            //lock开关锁思想： 防止用户快速点击按钮，出现动画未结束就进行下一个动画，以致轮播出现混乱。
            if (lock) {
                lock = false;
                index++;
                //小图跟随大图运动
                $("#banner_sm li").removeClass("active");
                $("#banner_sm li").eq(index).addClass("active");
                //大图运动
                $("#banner_bg").animate({
                    left: -1150 * index
                }, function () {
                    if (index >= 8) {
                        $(this).css("left", "0");
                        index = 0;
                    }
                    //当前运动结束，打开锁
                    lock = true;
                });
            }
        }
        //向左滚动
        function move_right() {
            if (lock) {
                lock = false;
                index--;
                if (index < 0) {
                    index = 7;
                    $("#banner_bg").css("left", "-1150*8");
                }
                //小图跟随大图运动
                $("#banner_sm li").removeClass("active");
                $("#banner_sm li").eq(index).addClass("active");
                //大图运动
                $("#banner_bg").animate({
                    left: -1150 * index
                }, function () {
                    lock = true;
                });
            }

        }
        var timer = setInterval(move_left, 3000);
        //鼠标划入大图片
        $("#banner_bg li").hover(function () {
            clearInterval(timer);
        }, function () {
            timer = setInterval(move_left, 3000);
        })
        //鼠标划入小图片
        $("#banner_sm li").hover(function () {
            clearInterval(timer);
            //让当前小图片的透明度变为1
            $(this).addClass("active").siblings().removeClass("active");
            //对应大图
            index = $(this).index() - 1;
            move_left();
        }, function () {
            timer = setInterval(move_left, 3000);
        })
        //鼠标划入左右箭头
        $("#leftBtn,#rightBtn").hover(function () {
            clearInterval(timer);
            $(this).css("opacity", "0.9");
        }, function () {
            timer = setInterval(move_left, 3000);
            $(this).css("opacity", "0.55");
        })
        //点击右箭头
        $("#rightBtn").click(function () {
            move_left();
        })
        //点击左箭头
        $("#leftBtn").click(function () {
            move_right();
        })

        //尾部js效果
        var num = 0;
        setInterval(function () {
            num++;
            if (num % 2 == 0) {
                $(".four-right").animate({
                    top: "-48px"
                });
            } else {
                $(".four-right").animate({
                    top: "-0"
                });
            }
        }, 3000);

        //利用Swiper的小轮播图
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: {
                delay: 3000,
                //用户操作之后是否禁止autoplay
                disableOnInteraction: false,
            },
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        //引入模板字符串
        //优选商品
         $(".import1").load("./pages/templates/index/yx.html");
         $(".import2").load("./pages/templates/index/xp.html");
        //优选商品ajax请求
        var flag = 0;//请其只发送一次请求
        var flag2=0;
        $(window).scroll(function () {
            var scroll_val=$("html,body").scrollTop();
            console.log(scroll_val);
            if(scroll_val>20){
                if(flag==0){
                    $.ajax({
                        url: ajaxUrl.yx,
                        dataType: "jsonp",
                        jsonpCallback: "goodlistCB",
                        success: function (data) {
                            var arr=[];
                            var list=data[0];
                            for(var i in list){
                                arr.push(list[i]);
                            }
                            var htmlstr=tempstr("yx",{
                                list:arr
                            });
                            $(".lodo-brand").html($(".lodo-brand").html()+htmlstr);
                        }
                    })
                    flag=1;  
                }
            }

            var xp_top=$("#xp").offset().top;
            if(scroll_val >100){
                if(flag2==0){
                    $.ajax({
                            url: ajaxUrl.xp,
                            dataType: "jsonp",
                            jsonpCallback: "cz", 
                            success:function(data){
                                var arr1=[];
                                for(var i in data[0]){
                                    arr1.push(data[0][i]);
                                }
                                console.log(arr1);
                               var htmlstr1=tempstr("xinping",{
                                   list1:arr1
                               })
                               $("#new").html($("#new").html()+htmlstr1);
                            }
                    })
                flag2=1;
            }
        }
           

        })
        window.goodlistCB = function (data) {
            // console.log(data)
        }
        window.cz=function(data){
            // console.log(data);
        }
        //判断是否存在cook
        var user=cookie.getCookie("user");
        if(user!=null){
            $("#user").text(user);
            $("#user").attr("href","http://localhost:9090/pages/personage/person.html");
            $("#tc").text("退出");
            //点击退出删除cookie
            $("#tc").on("click",function(){
                cookie.setCookie("user",user,-100,"/");
                cookie.setCookie("pwd",user,-100,"/");
            })
        }
       
    })
})