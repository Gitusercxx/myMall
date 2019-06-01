define(['tools'],function(tools) {
    var ajax = tools.ajax;
    function goodspage(){
        var number = $(this).attr('number')
        var userdat = JSON.parse(sessionStorage.getItem('userdat'));
        var goods = (JSON.parse(sessionStorage.getItem('allgoods')).filter(function(ele){
            return (ele._id == number)
        }))[0];
        var goodstr = ''
        var imglen = goods.image.length;
        var lbimg = '';
        var showimg = '';
        var stri ='';
        if(imglen > 3){
            for(var i = 0;i<3;i++){
                lbimg += '<img class="swiper-slide" src="./img/'+ goods.image[i] +'">'
            }
            for(var k = imglen-3;k<imglen;k++){
                showimg += '<img src="./img/'+ goods.image[k] +'">'
            }
        }else{
            for(var i = 0;i<imglen;i++){
                lbimg += '<img class="swiper-slide" src="./img/'+ goods.image[i] +'">'
                showimg += '<img src="./img/'+ goods.image[i] +'">'
            }
        }
        if(goods.attr.length){
            for(var n = 0;n<goods.attr.length;n++){
                if(n == 0){
                    stri += '<i class="g_attr act">'+ goods.attr[n] +'</i>';
                }else{
                    stri += '<i class="g_attr">'+ goods.attr[n] +'</i>';
                }
                
            }
        }else{
            stri = ''
        }
        goodstr = (`<div number=${number} class="goods_page">
        <div class="swiper-container2">
          <div class="swiper-wrapper"> ${lbimg} </div>
          <div class="swiper-pagination2"></div>
          <span class="glyphicon glyphicon-menu-left back"></span>
          <span class="share"><img src="./img/share.png" alt="分享"></span>
        </div>
        <div class="intorduce">
          <h3 class="money"><img src="./img/money.png" alt="￥">${goods.price}</h3>
          <h3 class="like"><img src="./img/like.png">${goods.like}</h3>
          <h4 class="title"> ${goods.name} </h4>
        </div>
        <div class="show_goods"> ${showimg} </div>
        <div class="buy">
          <h4>商品选择购买</span></h4>
          ${stri}
          <span class="num_box"><i class="red">-</i><i class="num">1</i><i class="add">+</i></span><span class="residue">(库存：${goods.residue})</span>
          <div class="butbox">
            <span class="likethis">收藏</span>
            <span class="addorder">加入订单</span>
            <span class="buythis">立即购买</span>
          </div>
        </div>
      </div>` )
      $('body').append(goodstr);
      if(havelike().length){
          $('.likethis').addClass('act');
      }
      function havelike(){
       var likearr = userdat.like.filter(function(ele){
            return (ele == number)
        })
        return likearr;
    }
      var mySwiper2 = new Swiper('.swiper-container2', {
        direction: 'horizontal',
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
           el: '.swiper-pagination2',
        },
        speed: 1000,
        autoplay: {
           disableOnInteraction: false,
           delay: 2000,
        },
     })
     history()
     function history(){
       var h_list = userdat.historylist || [];
       var historylist = h_list.filter(function(ele){
        return (ele != number)
       }) 
       historylist.unshift(number);
       userdat.historylist = historylist;
       sessionStorage.setItem('userdat',JSON.stringify(userdat));
       ajax('/history','POST',{id:userdat._id,change:{historylist}},function(){})
     }
      $('.back').on('click',back);
      $('.share').on('click',share);
      $('.num_box').on('click','i',buynum);
      $('.g_attr').on('click',scel_this);
      $('.butbox .likethis').on('click',likethis);
      $('.butbox .addorder').on('click',addorder);
      $('.butbox .buythis').on('click',buythis);
    
    function back(){
        $('.goods_page').remove();
    }
    function share(){
        $('.sharepage').fadeIn(300);
    }
    function buynum(){
        var n = parseInt($('.buy .num_box .num').text());
        console.log($(this).attr('class'))
        console.log( n)
        if($(this).attr('class') == 'red'&& n>1){
            $('.buy .num_box .num').text(n-1);
        }else if($(this).attr('class') == 'add' && n < goods.residue){
            $('.buy .num_box .num').text(n+1);
        }
    }
    function scel_this(){
        $('.g_attr').removeClass('act');
        $(this).addClass('act');
    }
    function likethis(){
        $('.butbox .likethis').toggleClass('act');
        var userdat = JSON.parse(sessionStorage.getItem('userdat'));
        var id ='id='+userdat._id; 
        var control;
        var number = 'number='+$('.goods_page').attr('number');
        userdat.like = userdat.like || [];
        if($('.butbox .likethis.act').length){
            $('.intorduce .like').html('<img src="./img/like.png">'+(parseInt($('.intorduce .like').text())+1));
            userdat.like.push($('.goods_page').attr('number'));
            control = 'control=add';
        }else{
            $('.intorduce .like').html('<img src="./img/like.png">'+(parseInt($('.intorduce .like').text())-1));
            userdat.like = userdat.like.filter(function(ele){
                return (ele != $('.goods_page').attr('number'))
            })
            control = 'control=red';
        }
        sessionStorage.setItem('userdat',JSON.stringify(userdat))
        ajax('/like?'+id+'&'+control+'&'+number,'GET',null,function(dat){});
    }
    function addorder(){
        var id =userdat._id; 
            if($('.g_attr.act').length){
                var goods = {number:$('.goods_page').attr('number'),num:$('.buy .num_box .num').text(),attr:$('.g_attr.act').text()};
            }else{
                var goods = {number:$('.goods_page').attr('number'),num:$('.buy .num_box .num').text()};
            }
            userdat.order =userdat.order || [];
            userdat.order.push(goods);
            sessionStorage.setItem('userdat',JSON.stringify(userdat))
        var control = 'add';
        var order ={id,goods,control};
        console.log(order)
        ajax('/order','POST',order,function(dat){alert('成功加入订单！')});
    }
    function buythis(){
        $('.order_infor input.a').val(userdat.person || '');
        $('.order_infor input.b').val(userdat.phone || '');
        $('.order_infor textarea').val(userdat.address || '');
        var goodsnum = parseInt($('.buy .num_box .num').text());
        var goodsmoney = parseInt($('.goods_page .money').text())*goodsnum;
        $('.order_infor .goods').text(goodsmoney);
        $('.order_infor').css('display','block');
            if($('.g_attr.act').length){
                var goods =[{number:$('.goods_page').attr('number'),num:$('.buy .num_box .num').text(),attr:$('.g_attr.act').text()}];
            }else{
                var goods =[{number:$('.goods_page').attr('number'),num:$('.buy .num_box .num').text()}];
            }
        sessionStorage.setItem('order_goods',JSON.stringify(goods));
        sessionStorage.setItem('del_order','no');
        // var id ='id='+JSON.parse(sessionStorage.getItem('userdat'))._id; 
        // var control = 'control=add';
        // console.log($('.g_attr.act'))
        // if($('.g_attr.act').length){
        //     var order ="order={goods:"+$('.goods_page').attr('number')+",num:"+$('.buy .num_box .num').text()+",attr:"+$('.g_attr.act').text()+"}";
        // }else{
        //     var order ="order={goods:"+$('.goods_page').attr('number')+",num:"+$('.buy .num_box .num').text()+"}";
        // }
        // console.log(order)
        // ajax('/buy?'+id+'&'+control+'&'+order,'GET',null,function(dat){alert('')});
    }
}
    return goodspage;
});