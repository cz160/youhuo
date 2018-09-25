
define([],function(){
    return {
        //搜索接口
        'search': function(val ){
            return `http://suggestion.baidu.com/?wd=${val}&cb="callback"`
        },
        //优选商品接口
        'yx':"http://localhost:9090/proxy/my.xiu.com/v3/activityExt/goodsList?jsoncallback=goodlistCB&sns=73051773%2C73051776%2C73052203%2C73052199%2C73051771%2C73051772%2C73051769%2C73051775%2C73051782%2C79002884%2C73040672%2C73051783%2C73051767%2C73052197%2C73051784%2C73051786%2C73051770%2C73051777%2C73051249%2C73051250%2C73051785%2C73051780%2C73051248%2C73034751%2C73051774%2C73052175%2C73052208&_=1536978264675&callback=goodlistCB",
        //新品商品接口
        'xp':"http://localhost:9090/proxy/my.xiu.com/v3/activityExt/goodsList?jsoncallback=cz&sns=10618029,24020292,24017499,24020294,24020271,10576917,3Q033077,61044193,10323418,65034989,61044534,61044200,10618732,24019882,10508261,11522270,10615928,10610120,10621317,13084290,13085011,72014568,65015940,10615765,63038243,62054565,24020054,10543570,82282343,11790647&_=1536991284510",
        //商品列表页接口（自己写的）
        'goodlist':"http://localhost:9090/proxy/data/goodlist.json",
        //商品评价接口
        "comment":"http://localhost:9090/proxy/comm.xiu.com/mobile/list?prodId=26982968&brandId=7832549&searchType=0&pageType=0&catgCode=0&pageNo=5&pageSize=15"
    }
})