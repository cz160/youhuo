require(["http://localhost:9090/js/conf/config.js"],()=>{
    require(["jquery","cookie","ajaxUrl","tempstr"],($,cookie,ajaxUrl,tempstr)=>{
        //加载公共头部
        $("#h").load("http://localhost:9090/pages/common/head.html");
        //加载公共尾部
        $("#f").load("http://localhost:9090/pages/common/foot.html");
        //放大镜效果
        $(".move-over").on("mousemove",function(e){
            //粉色框显示
            $(".move-obj").css("display","block");
            //大框显示
            $(".big-img").css("display","block");
            var move={
                x:e.offsetX,
                y:e.offsetY
            }
            var _left=move.x-$(".move-obj").width()/2;
            var _top=move.y-$(".move-obj").height()/2;
            //限制范围
            var limit_left=Math.max(0,Math.min(_left,106));
            var limit_top=Math.max(0,Math.min(_top,246))
            $(".move-obj").css({
                "left":limit_left,
                "top":limit_top
            })
            //大框运动
            $(".big-img").scrollTop(limit_top);
            $(".big-img").scrollLeft(limit_left);
        });
        $(".move-over").on("mouseout",function(){
            $(".move-obj").css("display","none");
            $(".big-img").css("display","none");
        })

        //鼠标划入右边小图片
        $(".thumbs-img").mouseover(function(){
            $(this).addClass("border").siblings().removeClass("border");
            if($(this).index()==1){
                $("#img-show").attr("src","//img10.static.yhbimg.com/goodsimg/2017/11/21/16/012000a5456934e94be87e6c45653bc0d9.jpg?imageMogr2/thumbnail/420x560/background/d2hpdGU=/position/center/quality/80");
                $("#big").attr("src","//img10.static.yhbimg.com/goodsimg/2017/11/21/16/012000a5456934e94be87e6c45653bc0d9.jpg?imageMogr2/thumbnail/750x1000/background/d2hpdGU=/position/center/quality/80");
            }else{
                $("#img-show").attr("src","//img11.static.yhbimg.com/goodsimg/2017/11/21/16/016d223fadc5da74ad6d22f777ebb156c9.jpg?imageMogr2/thumbnail/420x560/background/d2hpdGU=/position/center/quality/80");
                $("#big").attr("src","//img11.static.yhbimg.com/goodsimg/2017/11/21/16/016d223fadc5da74ad6d22f777ebb156c9.jpg?imageMogr2/thumbnail/750x1000/background/d2hpdGU=/position/center/quality/80");
            }
        });

        //选择尺寸
        $(".size li").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
        })
        //选择购买数量
        //点击加号
        $(".desc").on("click",function(){
            $("#num").text(parseInt($("#num").text())+1);
        })
        //点击减号
        $(".aesc").on("click",function(){
            if(parseInt($("#num").text())>1){
                $("#num").text(parseInt($("#num").text())-1);
            }
        });
        //点击加入购物车,生成cookie
        $(".g_btn1").on("click",function(){
            //获取商品信息
            //商品名字
            var goods_name=$(".name").eq(0).text();
            //商品单价
            var p=$(".p").text();
            //去除单位
            var price=p.substring(1);
            //商品颜色
            var color=$(".color-name").text();
            //商品尺寸
            var size=$(".active").text();
            //购买数量
            var count=parseInt($("#num").text());
            //总价格
            var sum=parseInt(price)*count;
            var obj={
                "goods_name":goods_name,
                "price":price,
                "color":color,
                "size":size,
                "count":count,
                "sum":sum
            };
            //获取cookie
            var  str=cookie.getCookie("goods");
            if(!str){
                var arr=[];
            }else{
                var arr=JSON.parse(str);
            }
            var isExit=arr.some((item)=>{
                var res= (item.goods_name==obj.goods_name&&item.size==obj.size);
                if(res){
                    item.count=item.count+parseInt($("#num").text());
                    item.sum=item.count*item.price;
                }
                return res;
            })
            if(!isExit)arr.push(obj);
            //设置cookie
            cookie.setCookie("goods",JSON.stringify(arr),10,"/");
        })
        //点击收藏
        var flag=0;
        $(".g_btn2").click(function(){
            if(flag==0){
                $(this).text("已收藏");
                flag=1;
                $(this).hover(function(){
                    $(this).text("取消收藏");
                },function(){
                    $(this).text("已收藏");
                })
            }else{
                $(this).text("点击收藏");
                flag=0; 
            }
           
        })

        //动态生成评价
        $(".con").load("http://localhost:9090/pages/templates/goods/comment.html",function(){
            $.ajax({
                url:ajaxUrl.comment,
                dataType:"json",
                success:function(data){
                    var arr=data.comBO;
                    // console.log(arr);
                    var htmlstr=tempstr("com",{
                        list:arr
                    });
                    $("#pl").html( $("#pl").html()+htmlstr);
                    //将时间戳转化格式
                    $(".detail span").each(function(){
                        $(this).text(new Date( parseInt($(this).text())).toLocaleString())
                    })
                }
            })
        });

    })
})