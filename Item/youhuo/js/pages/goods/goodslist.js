require(["http://localhost:9090/js/conf/config.js"], () => {
    require(["jquery", "ajaxUrl", "tempstr"], ($, ajaxUrl, tempstr) => {
        //导入公共头部
        $("#h").load("http://localhost:9090/pages/common/head.html");
        //导入公共尾部
        $("#f").load("http://localhost:9090/pages/common/foot.html");
        //导入字符串模板模块
        $("#goodslist").load("http://localhost:9090/pages/templates/goods/gooddlist.html", function () {
            //请求商品列表数据
            for (var i = 0; i <3; i++) {
                $.ajax({
                    url: ajaxUrl.goodlist,
                    dataType: "json",
                    success: function (data) {
                        var arr1=[];
                        var arr2=[];
                        var arr3=[];
                        for(var i=0;i<data.length;i++){
                            if(i<4){
                                arr1.push(data[i]);
                            }else if(i<8){
                                arr2.push(data[i]);
                            }else{
                                arr3.push(data[i]);
                            }
                        }
                        var htmlstr1 = tempstr("cz", {
                            list: arr1
                        });
                        var htmlstr2 = tempstr("cz", {
                            list: arr2
                        });
                        var htmlstr3 = tempstr("cz", {
                            list: arr3
                        });
                        $("#goods").html($("#goods").html() + htmlstr1);
                        $("#goods2").html($("#goods2").html() + htmlstr2);
                        $("#goods3").html($("#goods3").html() + htmlstr3);
                    }
                })
            }
            //分页
            $(".pager a").click(function(){
                //上一页
                if($(this).index()==0 && $(".cur").text()!=1){
                    $(".pager a").eq($(".cur").text()-1).addClass("cur").siblings().removeClass("cur");
                    //显示对应的页面
                     $(".goods-container").eq(parseInt($(".cur").text())-1).addClass("show").siblings().removeClass("show");
                }else if($(this).index()==4 && $(".cur").text()!=3){
                     //下一页
                    $(".pager a").eq(parseInt($(".cur").text())+1).addClass("cur").siblings().removeClass("cur");
                    //显示对应的页面
                     $(".goods-container").eq(parseInt($(".cur").text())-1).addClass("show").siblings().removeClass("show");
                }else{
                    //点击页面序号
                    if($(this).index()!=0 &&$(this).index()!=4){
                        $(this).addClass("cur").siblings().removeClass("cur");
                        $(".goods-container").eq(parseInt($(".cur").text())-1).addClass("show").siblings().removeClass("show");
                    }
                }
               
            })
        });
        //点击展开二级列表
        var count = 0;
        $(".trangle").on("click", function () {
            count++;
            if (count % 2 != 0) {
                $(this).addClass("transform");
                $(this).parent().parent().find(".child-list").fadeIn(300);
            } else {
                $(this).removeClass("transform");
                $(this).parent().parent().find(".child-list").fadeOut(300);
            }
        })
    })
})