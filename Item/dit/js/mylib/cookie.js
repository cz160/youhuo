define([""],()=>({getCookie:function(a){for(var b,c=document.cookie,d=c.split("; "),e=0;e<d.length;e++)if(b=d[e].split("="),b[0]==a)return b[1];return null},setCookie:function(a,b,c,e){switch(arguments.length){case 0:case 1:throw new Error("\u53C2\u6570\u4F20\u9519\u4E86");case 2:{document.cookie=a+"="+b;break}case 3:{var f=arguments[2];if("number"==typeof f){var g=new Date;g.setDate(g.getDate()+c),document.cookie=a+"="+b+";expires="+g}else"string"==typeof f&&(document.cookie=a+"="+b+";path="+f);break}case 4:{var g=new Date;g.setDate(g.getDate()+c),document.cookie=a+"="+b+"; expires="+g+"; path="+e}}}}));