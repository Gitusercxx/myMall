define(['tools'],function(tools) {
var ajax = tools.ajax;
let bottom_tool = {
   userdat:function(){
     return (JSON.parse(sessionStorage.getItem('userdat'))); 
   },
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
            ajax('/getuser?id='+bottom_tool.userdat()._id,'GET',null,function(dat){
               sessionStorage.setItem('userdat',JSON.stringify(JSON.parse(dat)[0]));
               draw_order(dat);
            })
            $('.locate').css('left', '445px');
            $('.' + bottom_tool.show).fadeOut(100);
            $('.orderpage').fadeIn(200);
            bottom_tool.show = 'orderpage';
         }
       }else{
         $('.login_page').add('.logbj').css('display', 'block');
       }
       function draw_order (dat){
         var allgoods = JSON.parse(sessionStorage.getItem('allgoods')); 
         var order = JSON.parse(dat)[0].order;
         var buy = JSON.parse(dat)[0].buy;
         var orderstr = '';
         var buystr = '';
         for(var i=0;i<order.length;i++){
            var goods = allgoods.filter(function(ele){
               return (ele._id == order[i].number)
            })[0]
            orderstr += `<li number="${order[i].number}" obj="${JSON.stringify(order[i])}">
            <span class="glyphicon glyphicon-trash delete"></span>
            <img src="./img/${goods.image[0]}"><p>${goods.name}</p><span class="price">${goods.price}</span>
            <span class="attr">${order[i].attr || ''}</span><span class="num_box"><i class="red">-</i><i class="num">${order[i].num}</i><i class="add">+</i></span>
            </li>`
         }
         $('.wait_pay').html(orderstr);
         for(var n=0;n<buy.length;n++){
            buystr = `<h5 class="order_number">单号：${buy[i].ordernumber}</h5>`
            var goodsarr = buy[n].goods;
            for(var k=0;k<goodsarr.length;k++){
               var goods = allgoods.filter(function(ele){
                  return (ele._id == goodsarr[k].number)
               })[0]
               buystr += `<li number="${goodsarr[k].number}">
               <img src="./img/${goods.image[0]}"><p>${goods.name}</p><span class="price">${goods.price}</span>
               <span class="attr">${goodsarr[k].attr || ''}</span><span class="num_box">*${goodsarr[k].num}</span></li>`
            }
            $('.paybox').append('<ul class="pay">'+buystr+'</ul>')
         }
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