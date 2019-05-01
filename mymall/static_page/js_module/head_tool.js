define(['tools'],function(tools) {
    var ajax = tools.ajax;
    let haed_tool = {
        p_down: function () {
           let _ele = $('.intro')
           if (_ele.css('display') == 'none') {
              _ele.slideDown(350);
           } else {
              _ele.slideUp(350);
           }
        },
        click_star: function () {
           $('.star').off('click');
           $('.glyphicon-star-empty').css('display', 'none');
           $('.glyphicon-star').fadeIn(200);
           $('.starnum').html(parseInt($('.starnum').html()) + 1)
        }
     }
     return haed_tool;
    
});