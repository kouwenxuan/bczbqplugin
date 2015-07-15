//表情插件核心功能
function bczExpresstion() {

    //应用路径
    this.expressBaseUrl = "../imgs";
    //关联文本域DIV
    this.expressArea = null;
    //文本域本身
    this.textArea = null;

}

//原型定义

//按钮所关联的文本框
bczExpresstion.prototype.link = null;
//初始化
bczExpresstion.prototype.init = function(btn, area, imgURL) {
    //图片加载路径
    this.expressBaseUrl = imgURL;
    //获取按钮节点元素
    var element = $('#'+btn).get(0);
    //获取文本域节点元素
    this.textArea = $('#'+area).get(0);
    //判断节点是否有效
    if(typeof(element) == "undefined" || typeof(this.textArea) == "undefined") {
        console.error("无效的初始化节点");
        return;
    }
    //文本域之后添加DIV，并隐藏文本域，样式赋予DIV
    var _class = $('#'+area).attr("class");
    var _style = $('#'+area).attr("style");
    $('#'+area).hide();
    var textDiv = "<div id='bcz_express_area_div' contenteditable='true' class='"+_class+"' style='"+_style+"'></div>";
    $('#'+area).after(textDiv);
    this.expressArea = $('#bcz_express_area_div').get(0);
    $('#bcz_express_area_div').removeAttr("id");
    //DIV与文本域同步
    var _textArea = this.textArea;
    var _expressArea = this.expressArea;
    $(this.expressArea).on("keyup", function() {
        $(_textArea).val($(_expressArea).html());
    }).on("DOMNodeInserted", function() {
        $(_textArea).val($(_expressArea).html());
    });

    //生成表情选择框
    this.createExpressWineow();
    //将element初始化为表情按钮
    $(element).css("background-color", "#ccc");
    //表情按钮点击事件
    //  - 点击之后弹出表情选择框
    $(element).on('click', function(event) {
        //改变当前表情控件对象原型变量 使弹出表情框关联到相应文本框
        bczExpresstion.prototype.link = _expressArea;
        //表情框若已弹出则取消操作
        if($('#expressWindow').is(":visible")) {
            //关闭弹窗
            $('#expressWindow').hide();
            //结束
            return;
        }
        //获取按钮位置 － 用于计算弹出框起点位置
        var left = element.offsetLeft;
        //计算出弹出框位置
        var top = element.offsetTop;
        var begin_left = Math.floor(Number(left + element.offsetWidth/2));
        var begin_top = Math.floor(Number(top + element.offsetHeight/2));
        //默认表情
        $("#expressWindow .bcz_express_nav li").eq(0).click();
        //显示表情框
        $("#expressWindow").css("left", begin_left + "px").css("top", begin_top + "px").show();
        //取消event冒泡
        event.stopPropagation();
    });
    //表情选择框切换选项卡事件
    //表情选择事件
    //页面点击隐藏表情框
    $(document).on('click', function() {
        $('#expressWindow').hide();
    });
}
//生成表情弹出框
bczExpresstion.prototype.createExpressWineow = function() {
    if(typeof($("#expressWindow").get(0)) != "undefined") {
        return ;
    }
    //添加弹出框到指定位置
    var pop_obj = "<div id='expressWindow' style='display: none;'><div class='bcz_express_nav'></div><div class='bcz_express_content'></div></div>";
    $("body").append(pop_obj);
    //生成表情
    var bcz_express_nav = $("#expressWindow div[class*='bcz_express_nav']");
    var bcz_express_content = $("#expressWindow div[class*='bcz_express_content']");
    //添加表情选项卡
    var ul_obj = "<ul>"
    bcz_express_nav.empty();
    $.each(this.expressList, function(i, o) {
        if(o != null) {
            ul_obj += "<li data-id='"+i+"'>"+ o.title +"</li>";
        }
    });
    ul_obj += "</ul>";
    bcz_express_nav.append(ul_obj);
    //添加表情 - 迭代表情数据集合
    bcz_express_content.empty();
    var _expressBaseUrl = this.expressBaseUrl;
    $.each(this.expressList, function(i, o) {
        var express_obj = "<div data-id='"+i+"' style='display: none;'><table><tr>";
        var index = 0;
        if(o != null) {
            $.each(o.data, function(k, v) {
                express_obj += "<td><img title='"+ v.name +"' alt='"+ v.name +"' src='"+ _expressBaseUrl + v.url +"'></td>";
                if(index == 7) {
                    express_obj += "</tr><tr>";
                    index = -1;
                }
                index++;
            });
            express_obj += "</tr></table></div>";
            bcz_express_content.append(express_obj);
        }
    });
    //为表情选项卡绑定点击事件
    bcz_express_nav.find("li").on('click', function() {
        //选中状态样式
        $(this).siblings().removeClass("express_list_on");
        $(this).addClass("express_list_on");
        //显示选项卡中表情
        $("#expressWindow .bcz_express_content div[data-id='"+$(this).attr("data-id")+"']").siblings().hide();
        $("#expressWindow .bcz_express_content div[data-id='"+$(this).attr("data-id")+"']").show();
        //取消event冒泡
        event.stopPropagation();
    });
    //绑定表情选中事件
    bcz_express_content.find("td").on('click', function() {
        var expressImg = $(this).html();
        var old_html = $(bczExpresstion.prototype.link).html();
        var new_html = old_html + expressImg;
        $(bczExpresstion.prototype.link).html(new_html);
    });
}
bczExpresstion.prototype.expressList = {
    "jx2" : {
        "title" : "兔斯基",
        "data" : [
            {
                "url" : "/tsj/t_0001.gif",
                "name" : "Kiss"
            },
            {
                "url" : "/tsj/t_0002.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0003.gif",
                "name" : "Kiss"
            },
            {
                "url" : "/tsj/t_0004.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0005.gif",
                "name" : "Kiss"
            },
            {
                "url" : "/tsj/t_0006.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0007.gif",
                "name" : "Kiss"
            },
            {
                "url" : "/tsj/t_0008.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0009.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0010.gif",
                "name" : "Kiss"
            },
            {
                "url" : "/tsj/t_0011.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0012.gif",
                "name" : "Kiss"
            },
            {
                "url" : "/tsj/t_0013.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0014.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0015.gif",
                "name" : "Kiss"
            },
            {
                "url" : "/tsj/t_0016.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0017.gif",
                "name" : "Kiss"
            },
            {
                "url" : "/tsj/t_0018.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0019.gif",
                "name" : "Kiss"
            },
            {
                "url" : "/tsj/t_0020.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0021.gif",
                "name" : "Kiss"
            },
            {
                "url" : "/tsj/t_0022.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0023.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0024.gif",
                "name" : "Kiss"
            },
            {
                "url" : "/tsj/t_0025.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0026.gif",
                "name" : "Kiss"
            },
            {
                "url" : "/tsj/t_0027.gif",
                "name" : "Love"
            },
            {
                "url" : "/tsj/t_0028.gif",
                "name" : "Love"
            }
        ]
    },
    "babycat" : {
        "title" : "baby猫",
        "data" : [
            {
                "url" : "/babycat/C_0001.gif",
                "name" : "发财了"
            },
            {
                "url" : "/babycat/C_0002.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/babycat/C_0003.gif",
                "name" : "发财了"
            },
            {
                "url" : "/babycat/C_0004.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/babycat/C_0005.gif",
                "name" : "发财了"
            },
            {
                "url" : "/babycat/C_0006.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/babycat/C_0007.gif",
                "name" : "发财了"
            },
            {
                "url" : "/babycat/C_0008.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/babycat/C_0009.gif",
                "name" : "发财了"
            },
            {
                "url" : "/babycat/C_0010.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/babycat/C_0011.gif",
                "name" : "发财了"
            },
            {
                "url" : "/babycat/C_0012.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/babycat/C_0013.gif",
                "name" : "发财了"
            },
            {
                "url" : "/babycat/C_0014.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/babycat/C_0015.gif",
                "name" : "发财了"
            },
            {
                "url" : "/babycat/C_0016.gif",
                "name" : "吃西瓜"
            }
        ]
    },
    "ldw" : {
        "title" : "绿豆蛙",
        "data" : [
            {
                "url" : "/ldw/w_0001.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0002.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0003.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0004.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0005.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0006.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0007.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0008.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0009.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0010.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0011.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0012.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0013.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0014.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0015.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0016.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0017.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0018.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0019.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0020.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0021.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0022.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0023.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0024.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0025.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0026.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0027.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0028.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0029.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0030.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/ldw/w_0031.gif",
                "name" : "发财了"
            },
            {
                "url" : "/ldw/w_0032.gif",
                "name" : "吃西瓜"
            }
        ]
    },
    "face" : {
        "title" : "泡泡",
        "data" : [
            {
                "url" : "/face/i_f01.gif",
                "name" : "发财了"
            },
            {
                "url" : "/face/i_f02.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/face/i_f03.gif",
                "name" : "发财了"
            },
            {
                "url" : "/face/i_f04.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/face/i_f05.gif",
                "name" : "发财了"
            },
            {
                "url" : "/face/i_f06.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/face/i_f07.gif",
                "name" : "发财了"
            },
            {
                "url" : "/face/i_f08.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/face/i_f09.gif",
                "name" : "发财了"
            },
            {
                "url" : "/face/i_f10.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/face/i_f11.gif",
                "name" : "发财了"
            },
            {
                "url" : "/face/i_f12.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/face/i_f13.gif",
                "name" : "发财了"
            },
            {
                "url" : "/face/i_f14.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/face/i_f15.gif",
                "name" : "发财了"
            },
            {
                "url" : "/face/i_f16.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/face/i_f17.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/face/i_f18.gif",
                "name" : "发财了"
            },
            {
                "url" : "/face/i_f19.gif",
                "name" : "吃西瓜"
            },
            {
                "url" : "/face/i_f20.gif",
                "name" : "发财了"
            },
            {
                "url" : "/face/i_f21.gif",
                "name" : "吃西瓜"
            }
        ]
    }
}

//定义requireJS模块 支持CMD模块化规范
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
    define( "bczExpresstion", [], function () { return new bczExpresstion(); } );
}