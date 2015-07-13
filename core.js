//表情插件核心功能
var bczExpresstion = {

    //初始化DOM元素
    //param
    //  - element (Dom object) : 需要添加表情按钮的元素，作为工具条
    init : function(element) {
        //设置功能条DIV高度
        $(element).css("height", "30px");
        //添加一个表情按钮
        var ele_obj = "<div style='display: inline-block; width: 28px;" +
            " height: 28px; border: 1px solid #333; margin: 1px 2px; vertical-align: top;'></div>";
        $(element).empty().append(ele_obj);
        //
    }
}