define(['tools'],function(tools){
    let mallfill = {
        fillmall:function (){
            var malldat = JSON.parse(sessionStorage.getItem('malldat'));
            $('.name').text(malldat.mallname);
            $('.active .act1').text(malldat.active[0]);
            $('.active .act2').text(malldat.active[1]);
            $('.active .act3').text(malldat.active[2]);
            $('.starnum').text(malldat.star);
            var lbstr = "";
            for(var i = 0;i<malldat.lunboimg.length;i++){
                lbstr += '<a class="swiper-slide" href="#"><img src="./img/'+ malldat.lunboimg[i] +'"></a>'
            }
            $('.swiper-container1>.swiper-wrapper').html(lbstr);
            var mySwiper1 = new Swiper('.swiper-container1', {
                direction: 'horizontal',
                loop: true, // 循环模式选项
                // 如果需要分页器
                pagination: {
                   el: '.swiper-pagination1',
                },
                speed: 1000,
                autoplay: {
                   disableOnInteraction: false,
                   delay: 2000,
                },
             })
       
        }
    }
    return mallfill;
})