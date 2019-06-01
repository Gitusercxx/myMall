(function index($) {
sessionStorage.setItem('recordlog','no');
   // 获取店铺信息
ajax('/mallData','GET',null,function(dat){
   sessionStorage.setItem('malldat',JSON.stringify(JSON.parse(dat)[0]));
   sessionStorage.setItem('keyword',JSON.stringify(JSON.parse(dat)[1]));
})
// 渲染商品列表
ajax('./allgoods','GET',null,goodslist)
function goodslist(dat){
sessionStorage.setItem('allgoods',dat);
var goods = JSON.parse(dat);
var rec_list = book_list = electronic_list = sport_list = life_list = '';
var len =  goods.length;
for(var i = 0;i<len;i++){
   if(i<5){
      rec_list += '<li number='+ goods[i]._id +'><img src="./img/'+ goods[i].image[0] +'"><p>'+ goods[i].name +'</p><span class="like">'+ goods[i].like +'</span><span class="price">'+ goods[i].price +'</span></li>'
   }
   switch (goods[i].class){
      case 'book':
         book_list += '<li number='+ goods[i]._id +'><img src="./img/'+ goods[i].image[0] +'"><p>'+ goods[i].name +'</p><span class="like">'+ goods[i].like +'</span><span class="price">'+ goods[i].price +'</span></li>'
         break;
      case 'electronic':
         electronic_list += '<li number=' + goods[i]._id + '><img src="./img/' + goods[i].image[0] + '"><p>' + goods[i].name + '</p><span class="like">' + goods[i].like + '</span><span class="price">' + goods[i].price + '</span></li>'
         break;
      case 'sport':
         sport_list += '<li number=' + goods[i]._id + '><img src="./img/' + goods[i].image[0] + '"><p>' + goods[i].name + '</p><span class="like">' + goods[i].like + '</span><span class="price">' + goods[i].price + '</span></li>'
         break;
      default:
         life_list += '<li number=' + goods[i]._id + '><img src="./img/' + goods[i].image[0] + '"><p>' + goods[i].name + '</p><span class="like">' + goods[i].like + '</span><span class="price">' + goods[i].price + '</span></li>'
         break;
      }
}
$('.index_list').html(rec_list);
$('.book_list').html(book_list);
$('.electronic_list').html(electronic_list);
$('.sport_list').html(sport_list);
$('.book_list').html(book_list);

}
function check_class(){
   var index = $(this).attr('index') || 2;
   $('.classify_page span[index="'+index+'"]').addClass('act');
   $('.classify_page span[index="'+index+'"]').siblings('span').removeClass('act');
   $('.listbox').css('left',-index*750+'px'); 
   $('.classify_page').slideDown(1);
}
   function ajax(url, type, dat, fn) {
      $.ajax({
         url: url,
         type: type,
         data: dat,
         success: function (d) {
            fn(d)
         },
         error: function (err) {
            console.log(err)
         }
      })
   }
   // 引用模块
   require.config({
      baseUrl: "js_module",
      paths: {
         fill_mall:'mallfill',
         log:'log_tool',
         head_tool:'head_tool',
         bottom_tool:'bottom_tool',
         order_tool:'order_tool',
         tools:'tools',
         goodspage: 'goodspage',
         search_tool:'search_tool',
         self_tool:'self_tool',
         classify_tool:'classify_tool'
      }
   });
  
   var log_tool,haed_tool,bottom_tool,order_tool,tools,goodspage,search_tool,self_tool,classify_tool;
   require(['tools','fill_mall','log','head_tool','bottom_tool','order_tool','goodspage','search_tool','self_tool','classify_tool'],function(tool,fill_mall,log,head,bottom,order,goodsp,search,self,classify){
      tools = tool;
      fill_mall.fillmall();
      log_tool = log;
      haed_tool = head;
      bottom_tool = bottom;
      order_tool = order;
      goodspage = goodsp;
      search_tool = search;
      self_tool = self;
      classify_tool = classify;
      console.log('search')
      //初始化页面及事件绑定
   $('.log_close').on('click', log_tool.closelog);
   $('.log').on('click', log_tool.log);
   $('.reg').on('click', log_tool.reg);
   $('.rem_pass').on('click', log_tool.rem_pass);
   $('.log_but').on('click', log_tool.userlog);
   $('.forget_pass').on('click', log_tool.change_pass);
   $('.tel_but').on('click', log_tool.change_getuser);
   $('.reg_but').on('click', log_tool.userreg);
   $('.pull_down').on('click', haed_tool.p_down);
   $('.star').on('click', haed_tool.click_star);
   $('.allclass').on('click','.box>div',check_class);
   $('h3.more').on('click',check_class)
   $('.classify_page .nav_bar').on('click','span',classify_tool.check_class)
   $('.classify_close').on('click',classify_tool.classify_close)
   $('.index').on('click', bottom_tool.show_index);
   $('.search').on('click', bottom_tool.show_search);
   $('.input>input').on('input',search_tool.valchange);
   $('.search_but').on('click',search_tool.getresult);
   $('.tipword').on('click','i',search_tool.getresult);
   $('.order').on('click', bottom_tool.show_order);
   $('.order_nav').on('click', 'span', order_tool.show_pay);
   $('.order_infor .sub_but').on('click',order_tool.sub_but);
   $('.order_infor .close_order_infor').on('click',order_tool.close_order_infor)
   $('.wait_pay .delete').on('click',order_tool.delorder)
   $('.sub_order').on('click',order_tool.sub_order)
   $('.self').on('click', function(){bottom_tool.show_self();self_tool.getlike();self_tool.gethistory()} );
   
   $('.parttwo').on('click','span',self_tool.partchange);
   $('.infor_nav').on('click','span',self_tool.partchange);
   $('.address_sub').on('click',self_tool.addresssub);
   $('.pass_sub').on('click',self_tool.changepass);
   $('.advice_sub').on('click',self_tool.advice);
   $('ul').on('click','li',goodspage);
   $('.sharepage').on('click',function(){$('.sharepage').fadeOut(300)})

   // 初始化页面
      //登录初始化
      var loginf = localStorage.getItem('malluser');
      if (loginf) {
         var logarr = loginf.split('-');
         $('.log_tel').val(logarr[0]);
         var password = $('.log_password').val(logarr[1] || '');
      }
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if (isAndroid) {
         $('.login_page input').on('focus', log_tool.inputup);
         $('.login_page input').on('focusout', log_tool.inputdow);
      }
   })

}(jQuery))