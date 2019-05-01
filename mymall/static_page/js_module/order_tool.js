define(['tools'],function(tools) {
    var ajax = tools.ajax;
    let order_tool = {
        show_pay: function () {
           var words = $(this).text();
           if (words == '已付款') {
              $('.pay').css('display', 'block');
              $('.wait_pay').css('display', 'none');
              $('.not_payorder').removeClass('act');
           } else {
              $('.wait_pay').css('display', 'block');
              $('.pay').css('display', 'none');
              $('.payorder').removeClass('act');
           }
           $(this).addClass('act');
        },
        moreinfor: function () {
           $('.showmore').css('right', '0px')
        },
     }
    return order_tool;
})