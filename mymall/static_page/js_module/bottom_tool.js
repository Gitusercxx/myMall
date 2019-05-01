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
       if (bottom_tool.show != 'orderpage') {
          $('.locate').css('left', '445px');
          $('.' + bottom_tool.show).fadeOut(100);
          $('.orderpage').fadeIn(200);
          bottom_tool.show = 'orderpage';
       }
    },
    show_self: function () {
       if (bottom_tool.show != 'selfpage') {
          $('.locate').css('left', '625px');
          $('.' + bottom_tool.show).fadeOut(100);
          $('.selfpage').fadeIn(200);
          bottom_tool.show = 'selfpage';
       }
    }
 }
 return bottom_tool;
})