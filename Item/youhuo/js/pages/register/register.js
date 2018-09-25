require(["../../conf/config"], () => {
    require(["jquery","cookie"], ($,cookie) => {
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
            //点击图片旋转
            var index=0;
            $(".img-check-pic").on("click",function(){
                index++;
                if(index==1 || index==0){
                    $(this).find("img").css({
                        "margin-top":-10+-70*index
                    })
                }else{
                    $(this).find("img").css({
                        "margin-top":-30+-70*index
                    })
                }
                if(index>=3)index=-1;
            })

            //当下拉框的值发生改变,改变手机前缀
            $("#region").change(function(){
                $("#country-code").text($(this).val());
            })
            //验证手机号码
            var flag1=0;
            var flag2=0;
            var reg=/^[0-9]{11}$/;
            $("#phone-num").blur(function(){
                if(reg.test($(this).val())){
                    flag1=1;
                    $(this).css("border-color","green");
                }else{
                    $(this).css("border-color","red");
                    $(this).val("");
                    $(this).attr("placeholder","手机号码格式不正确");
                }
            })
            //设置密码
            //必须由密码和数字组成，长度在6-20位之间
            //先预测后面不全为数字或字母
            var reg1=/^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,20}$/;
            $(".pwd").on("focus",function(){
                $(".ts_hide").css("display","block");
            })
            $(".pwd").on("blur",function(){
                if(reg1.test($(this).val())){
                    $(".ts_hide").css("display","none");
                    $(this).css("border-color","green");
                }else{
                    $(this).css("border-color","red");
                }
            })
            //检测值得改变，改变密码强度
            $(".pwd").on("input",function(){
                var length=$(this).val().length;
                //验证通过
                if(reg1.test($(this).val())){
                    flag2=1;
                    $(".pwdQd").css("display","block");
                    $(".ts_hide").css("display","none");
                    //低
                    if(length<8){
                        $(".low").css({
                            "background":"red",
                            color:"white"
                        });
                        $(".mid").css("color","red");
                        $(".hige").css("color","red");
                    }else if(length<15){
                    //中
                        $(".low").css({
                            "background":"yellow",
                            color:"white"
                        });
                        $(".mid").css({
                            "background":"yellow",
                            color:"white"
                        });
                        $(".hige").css("color","yellow");
                    }else{
                    //高
                        $(".low").css({
                            "background":"green",
                            color:"white"
                        });
                        $(".mid").css({
                            "background":"green",
                            color:"white"
                        });
                        $(".hige").css({
                            "background":"green",
                            color:"white"
                        });    
                    }
                }else{
                    $(".pwdQd").css("display","none");
                }
            })

            //点击注册设置cookie,保存用户名和密码
            $("#zcBtn").on("click",function(){
                if(flag1==1&&flag2==1){
                    var username=$("#phone-num").val();
                    var password=$(".pwd").val();
                    cookie.setCookie("user",username,10,"/");
                    cookie.setCookie("pwd",password,10,"/");
                }else{
                    alert("请输入正确的用户名和密码");
                }
            })
        })
    })
})