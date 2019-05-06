define(function() {
    console.log('goodspage')
    function goodspage(){
        var number = $(this).attr('number')
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
                stri += '<i>'+ goods.attr[n] +'</i>'
            }
        }else{
            stri = ''
        }
        goodstr = (`<div class="goods_page">
        <div class="swiper-container2">
          <div class="swiper-wrapper"> ${lbimg} </div>
          <div class="swiper-pagination2"></div>
          <span class="glyphicon glyphicon-menu-left back"></span>
          <span class="share"><img src="./img/share.png" alt="分享"></span>
        </div>
        <div class="intorduce">
          <h3 class="money"><img src="./img/money.png" alt="￥">${goods.price}</h3>
          <h3 class="like"><img src="./img/like.png" alt="￥">${goods.like}</h3>
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
      $('.back').on('click',back)
      $('.share').on('click',share)
    }
    function back(){
        $('.goods_page').remove();
    }
    function share(){
        $('.sharepage').fadeIn(300);
    }
    return goodspage;
});