
define([""],()=>{
    return {
        getCookie:function(key) {
            var str = document.cookie;
            var list = str.split("; ");
            for (var i = 0; i < list.length; i++) {
                var kv = list[i].split("=");
                if (kv[0] == key) return kv[1];
            }
            return null;
        },
        setCookie:function(key, value, expires, path){
            switch (arguments.length) {
                case 0:
                case 1:
                    throw new Error("参数传错了");
                case 2:
                    {
                        document.cookie = key + "=" + value;
                        break;
                    }
                case 3:
                    {
                        var param = arguments[2];
                        if (typeof param == "number") {
                            var d = new Date();
                            d.setDate(d.getDate() + expires);
                            document.cookie = key + "=" + value + ";expires=" + d;
                        } else if (typeof param == "string") {
                            document.cookie = key + "=" + value + ";path=" + param;
                        }
                        break;
                    }
                case 4:
                    {
                        var d = new Date();
                        d.setDate(d.getDate() + expires);
                        document.cookie = key + "=" + value + "; expires=" + d + "; path=" + path;
                    }
            }
        }
    }
})