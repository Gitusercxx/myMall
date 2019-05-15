define(['tools'],function(tools) {
    var ajax = tools.ajax;
    let order_tool = {
         userdat:function(){
            return JSON.parse(sessionStorage.getItem('userdat')) 
         },
        show_pay: function () {
           var words = $(this).text();
           if (words == '已提交') {
              $('.paybox').css('display', 'block');
              $('.wait_pay').css('display', 'none');
              $('.not_payorder').removeClass('act');
           } else {
              $('.wait_pay').css('display', 'block');
              $('.paybox').css('display', 'none');
              $('.payorder').removeClass('act');
           }
           $(this).addClass('act');
        },
        moreinfor: function () {
           $('.showmore').css('right', '0px')
        },
        delorder:function(e){
         e.stopPropagation();
         var id =order_tool.userdat()._id; 
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

        },
        sub_but:function(){
           var person = $('.order_infor input.a').val();
           var phone = $('.order_infor input.b').val();
           var address = $('.order_infor textarea').val();
           if(tools.checkval(person,'text') && tools.checkval(phone,'tel') && tools.checkval(address,'text')){
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() > 8 ? date.getMonth()+1 : '0'+(date.getMonth()+1);
            var d = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
            var ordernumber = order_tool.userdat()._id+y+m+d+$('.order_infor .all_sum').text()+$('.order_infor .goods').text();
            $('.order_infor .order_ok h6').text(ordernumber);
            var goods = JSON.parse(sessionStorage.getItem('order_goods'));
            var address = {person,phone,address}
            var orderobj = {id:order_tool.userdat()._id,ordernumber,goods:goods,address:address}
            ajax('buy','POST',orderobj,function(dat){
               if(dat != '{"n":1,"nModified":1,"ok":1}'){
                  alert(dat);
               }else $('.order_infor .order_ok').css('display','block');
            })
           }
        },
        close_order_infor:function(){
         $('.order_infor').fadeOut(200);
         $('.order_infor .order_ok').css('display','none');
        }
     }
    return order_tool;
})