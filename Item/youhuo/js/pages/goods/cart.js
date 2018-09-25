require(["http://localhost:9090/js/conf/config.js"], () => {
    require(["jquery", "cookie", "tempstr"], ($, cookie, tempstr) => {
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

            //load是ajax请求(异步方法)
            $(".cart_t").load("http://localhost:9090/pages/templates/cart/t_cart.html", function () {
                //获取gookie
                var str = cookie.getCookie("goods");
                console.log(str);
                var arr = JSON.parse(str);
                console.log(arr);
                //判断cookie是否存在
                if (str) {
                    var htmlstr = tempstr("cart_t", {
                        list: arr
                    });
                    $(".table").html(htmlstr);
                    //当页面一加载时计算一下总价/总数量
                    var sum = 0
                    $(".five span").each(function (i) {
                        sum += parseInt(($(".five span").eq(i).text().substring(1)));
                    })
                    $("strong").text("￥" + sum);
                    var count = sum / 1699;
                    $(".number").text(count);

                    //让复选框跟随全选框变化
                    $(".evevy").click(function () {
                        $("input[type='checkbox']").prop("checked", $(this).prop("checked"));
                    })
                    //所有复选框被选中，复选框也选中
                    $(".table input[type='checkbox']").click(function () {
                        //全被选中返回false
                        var isAll = $(".table input[type='checkbox']").is(function () {
                            return !$(this).prop("checked");
                        })
                        if (isAll == false) {
                            $(".evevy").prop("checked", true);
                        } else {
                            $(".evevy").prop("checked", false);
                        }
                    })
                    //点击减
                    $(".d").click(function () {
                        //获取当前表单值
                        var value = parseInt($(this).parent().find("input").val());
                        if (value > 1) {
                            $(this).parent().find("input").val(value - 1);
                            //改变小计
                            $(this).parent().parent().find(".five span").text("￥" + 1699 * (value - 1));
                            //取出所有的小计
                            var sum = 0
                            $(".five span").each(function (i) {
                                sum += parseInt(($(".five span").eq(i).text().substring(1)));
                            })
                            //改变总计
                            $("strong").text("￥" + sum);
                            //计算数量
                            var count = sum / 1699;
                            $(".number").text(count);
                        }
                    })
                    //点击加
                    $(".a").click(function () {
                        var value = parseInt($(this).parent().find("input").val());
                        $(this).parent().find("input").val(value + 1);
                        $(this).parent().parent().find(".five span").text("￥" + 1699 * (value + 1));
                        //取出所有小计
                        var sum = 0
                        $(".five span").each(function (i) {
                            sum += parseInt(($(".five span").eq(i).text().substring(1)));
                        })
                        //改变总计
                        $("strong").text("￥" + sum);
                        //计算数量
                        var count = sum / 1699;
                        $(".number").text(count);
                    })
                    //点击删除商品
                    $(".six").each(function (i) {
                        $(".six").eq(i).find("p").first().click(function () {
                            $(this).parent().parent().remove();
                        })
                    })
                    //点击删除选中商品
                    $(".fixed-option a").eq(0).click(function () {
                        $(".table input[type='checkbox']").each(function () {
                            if ($(this).prop("checked") == true) {
                                $(this).parent().parent().remove();
                            }
                        })
                    })
                }
            });
        })
    })
})