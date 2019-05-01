define(['tools'],function(tools){
    function mymall(){
        tools.ajax('/mallData','GET',null,fillmall)
    }
    function fillmall(dat){
        console.log(JSON.parse(dat)[0])
        var malldat = JSON.parse(dat)[0];
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
    }
    return mymall;
})