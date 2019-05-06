define(['tools'],function(tools) {
var ajax = tools.ajax;
let bottom_tool = {
    show: 'indexpage',
    show_index: function () {
       if (bottom_tool.show != 'indexpage') {
          $('.locate').css('left', '75px');
          $('.' + bottom_tool.show).fadeOut(100);
          $('.indexpage').fadeIn(200);
          bottom_tool.show = 'indexpage';
       }
    },
    show_search: function () {
       if (bottom_tool.show != 'searchpage') {
          $('.locate').css('left', '255px');
          $('.' + bottom_tool.show).fadeOut(100);
          $('.searchpage').fadeIn(200);
          bottom_tool.show = 'searchpage';
       }
    },
    show_order: function () {
       if(sessionStorage.getItem('recordlog') == 'yes'){
         if (bottom_tool.show != 'orderpage') {
            $('.locate').css('left', '445px');
            $('.' + bottom_tool.show).fadeOut(100);
            $('.orderpage').fadeIn(200);
            bottom_tool.show = 'orderpage';
         }
       }else{
         $('.login_page').add('.logbj').css('display', 'block');
       }
       
    },
    show_self: function () {
      if(sessionStorage.getItem('recordlog') == 'yes'){
         if (bottom_tool.show != 'selfpage') {
            $('.locate').css('left', '625px');
            $('.' + bottom_tool.show).fadeOut(100);
            $('.selfpage').fadeIn(200);
            bottom_tool.show = 'selfpage';
         }
      }else{
         $('.login_page').add('.logbj').css('display', 'block');
       }
    }
 }
 return bottom_tool;
})