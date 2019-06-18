$('.mall_save').on('click',mall_save);
$('.goods_save').on('click',goods_save);
$('.add_save').on('click',add_save);
$('.nav').on('click','li',show_content);
$('.ulbox').on('click','span',delgoods);
$('.addbut').on('click',addone);
$('.order').on('click','.pay_check',pay_check);
$('.enter_but').on('click',enterpage);
function ajax(url, type, dat, fn) {
    $.ajax({
       url: url,
       type: type,
       data: dat,
       success: function (d) {
          fn && fn(d);
       },
       error: function (err) {
          console.log(err)
       }
    })
 }
 //进入管理界面
 var passwordarr;
 function enterpage(){
    var pass = $('.putval').val().toString();
    if(passwordarr.indexOf(pass) != -1 ){
        $('.logpage').slideUp(300);
        $('.content').slideDown(300);
    }else{
        alert('验证失败')
    }
    console.log(passwordarr)
 }
//  店铺管理
 var malldat;
 ajax('/mallData','GET',null,function(dat){
    malldat = JSON.parse(dat)[0];
    var mallkey = JSON.parse(dat)[1];
    passwordarr = malldat.password;
    $('.mclass input').val(malldat.mallname||'');
    console.log(malldat.lunboimg)
    $('.lunboimg input').val(malldat.lunboimg.join('/') ||'');
    $('.star input').val(malldat.star||'');
    $('.keyword input').val(mallkey.keyword.join('/')||'');
    $('.password input').val(passwordarr.join('/')||'');
 });

 function mall_save(){
     var id = malldat._id;
     var mallobj = {};
     mallobj.mallname = $('.mallname input').val() || '不想取名字的店';
     mallobj.star = $('.star input').val() || 10;
     mallobj.lunboimg = $('.lunboimg input').val().split('/') || ['lb02.jpg','lb01.jpg','lb03.jpg'];
     mallobj.keyword = $('.keyword input').val().split('/') || ['二手书','锻炼','手机'];
     mallobj.password = $('.password input').val().split('/') || [123456];
     ajax('/mallchange','POST',{id,change:mallobj},function(e){
         console.log(e)
        if(JSON.parse(e).ok){
            alert('保存成功！')
        }
     });
 }
 function show_content(){
     var thisname = $(this).attr('name');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('.'+thisname).siblings().css('display','none');
    $('.'+thisname).css('display','block');
 }
//  商品管理
ajax('./allgoods','GET',null,goodslist);
function goodslist(d){
    var dat = JSON.parse(d);
    var str = '';
    for(var i=0;i<dat.length;i++){
        str += '<li class="row"><span class="glyphicon glyphicon-trash delete"></span><i name="_id" class="col-sm-1 col-xs-1">'+ dat[i]._id +'</i>'+
        '<input name="price" type="text" value="'+ dat[i].price +'" class="col-sm-1 col-xs-1">'+
        '<input name="residue" type="text" value="'+ dat[i].residue +'" class="col-sm-1 col-xs-1">'+
        '<input name="like" type="text" value="'+ dat[i].like +'" class="col-sm-1 col-xs-1">'+
        '<textarea name="name" type="text" class="col-sm-3 col-xs-3">'+ dat[i].name +'</textarea>'+
        '<textarea name="image" type="text"class="col-sm-3 col-xs-3">'+ dat[i].image.join('/') +'</textarea>'+
        '<input name="class" type="text" value="'+ (dat[i].class||'') +'" class="col-sm-1 col-xs-1">'+
        '<input name="attr" type="text" value="'+ (dat[i].attr?dat[i].attr.join('/'):'') +'" class="col-sm-1 col-xs-1"></li>' 
    }
    $('.ulbox').html(str);
}
function goods_save(){
    var all_goods = [];
    var goodsli = $('.ulbox>li');
    for(var i=0;i<goodsli.length;i++){
        var obj = {};
        var goods = {};
        obj.id = $(goodsli[i]).children('i').html();
        goods.price = $(goodsli[i]).children('input[name="price"]').val()|| '20';
        goods.residue = $(goodsli[i]).children('input[name="residue"]').val() || '50';
        goods.like = $(goodsli[i]).children('input[name="like"]').val() || '60';
        goods.name = $(goodsli[i]).children('textarea[name="name"]').val() || '';
        goods.image = $(goodsli[i]).children('textarea[name="image"]').val().split('/')||[];
        goods.class = $(goodsli[i]).children('input[name="class"]').val() || '';
        goods.attr = $(goodsli[i]).children('input[name="attr"]').val().split('/')||[];
        obj.goods = goods;
        all_goods.push(obj);
        
    }
    ajax('/goodschange','POST',{dat:all_goods},function(d){
        console.log(d)
    });
}
function delgoods(){
    $(this).parent().remove();
    var delgoods = $(this).siblings('i').html();
    ajax('/delete','POST',{_id:delgoods},function(d){
        console.log(d);
    })
}
// 添加商品
function addone(){
 $('.add_box').append(`<li class="row"><input name="_id" type="text" class="col-sm-1 col-xs-1">
 <input name="price" type="text" class="col-sm-1 col-xs-1">
 <input name="residue" type="text" class="col-sm-1 col-xs-1">
 <input name="like" type="text" class="col-sm-1 col-xs-1">
 <textarea name="name" type="text" class="col-sm-3 col-xs-3"></textarea>
 <textarea name="image" type="text" class="col-sm-3 col-xs-3"></textarea>
 <input name="class" type="text" class="col-sm-1 col-xs-1">
 <input name="attr" type="text" class="col-sm-1 col-xs-1"></li>`)
}
function add_save(){
    var addli = $('.add_box>li');
    ajax('./allgoods','GET',null,function(dat){
        var goods = JSON.parse(dat);
        var addgoods = [];
        var repeat = [];
        var arr;
        for(var i=0;i<addli.length;i++){
            var goodsobj = {};
            goodsobj._id = $(addli[i]).children('input[name="_id"]').val();
            goodsobj.price = $(addli[i]).children('input[name="price"]').val();
            goodsobj.residue = $(addli[i]).children('input[name="residue"]').val();
            goodsobj.like = $(addli[i]).children('input[name="like"]').val();
            goodsobj.name = $(addli[i]).children('textarea[name="name"]').val();
            goodsobj.image = $(addli[i]).children('textarea[name="image"]').val().split('/');
            goodsobj.class = $(addli[i]).children('input[name="class"]').val();
            goodsobj.attr = $(addli[i]).children('input[name="attr"]').val().split('/');
            console.log(goodsobj)

            // 这是一个臂力器，可以包治百病，药到病除，先到先得！！！book01.jpg/book02.jpg/bili03.jpg/bili04.jpg
            arr = goods.filter(function(ele){
                return (goodsobj._id == ele._id)
                });
                console.log(arr)
                if(arr.length){
                    repeat.push(i)
                }else{
                    addgoods.push(goodsobj);
                }
        }
        if(repeat.length){
            var alertstr = '第'
            for(var k=0;k<repeat.length;k++){
                alertstr += (repeat[k]+1+' , ');
            }
            alert('提交失败'+alertstr+'个编码重复')
        }else{
            ajax('/addgoods','POST',{addgoods},function(d){
                console.log(d);
            })
        }
       
    });
}
// 订单管理
ajax('/allorder','GET',null,function(d){
    var allorder = JSON.parse(d);
    var allstr1 = '';
    var allstr2 = '';
    console.log(allorder)
    for(var i = allorder.length-1;i>=0;i--){
        if(allorder[i].pay != 'yes'){
            allstr1 += '<li id="'+allorder[i]._id+'" num="'+allorder[i].ordernumber+'"><span class="pay_check"></span> <p class="ordernumber">订单号'+ allorder[i].ordernumber +'</p>'+
            '<span class="allgoods">订单商品'+JSON.stringify(allorder[i].goods)+'</span><span class="address">收货地址'+JSON.stringify(allorder[i].address)+'</span></li>'
        }else{
            allstr2 += '<li num="'+allorder[i].ordernumber+'"><span class=" glyphicon glyphicon-check"></span> <p class="ordernumber">订单号'+ allorder[i].ordernumber +'</p>'+
            '<span class="allgoods">订单商品'+JSON.stringify(allorder[i].goods)+'</span><span class="address">收货地址'+JSON.stringify(allorder[i].address)+'</span></li>'
        }
        
    }
    $('.order .pay').html(allstr2 || '<li>内容为空</li>')
    $('.order .unpay').html(allstr1 || '<li>内容为空</li>')
})
function pay_check(){
    $(this).attr('class','glyphicon glyphicon-check')
    ajax('/pay_check','POST',{id:$(this).parent('li').attr('id'),change:{pay:'yes'}},function(d){
        console.log(d);
    })
}