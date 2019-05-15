define(['tools'], function(tools) {
   var ajax = tools.ajax;
   let self_tool = {
       userdat: function(){
         return JSON.parse(sessionStorage.getItem('userdat'))
       },
       partchange:function(){
           var thisname = $(this).attr('name');
           $(this).siblings().removeClass('act');
            $(this).addClass('act');
            $('.'+thisname).siblings().css('display','none');
            $('.'+thisname).css('display','block');
       },
       addresssub:function(){
           var userdat = self_tool.userdat();
           var person = $('.my_address .a').val();
           var tel = $('.my_address .b').val();
           var addr = $('.my_address textarea').val();
           if(tools.checkval(tel,'tel')&&tools.checkval(person,'text')&&tools.checkval(addr,'text')){
                userdat.phone = tel;
                userdat.address = addr;
                userdat.person = person;
                sessionStorage.setItem('userdat',JSON.stringify(userdat));
               ajax('/change','POST',{id:userdat._id,change:{person:person,phone:tel,address:addr}},function(){
                   alert('地址提交成功！');
                })
           }
       },
       changepass:function(){
        var userdat = self_tool.userdat();
        var newpassb = $('.my_password .b').val();
        var newpassc = $('.my_password .c').val();
           if($('.my_password .a').val() == userdat.password){
               if(tools.checkval(newpassb,'password')){
                if(newpassb == newpassc){
                    ajax('/changepass','POST',{_id:userdat._id,password:newpassb},function(){
                        alert('修改成功！');
                        $('.my_password .b').add($('.my_password .c')).val('');
                    });
                   } else {
                    $('.my_password .c').focus();
                    alert('新密码不一致！')
                   }
               }
           }else{
               alert('密码错误！')
           }
           $('.my_password .a').val()
       },
      getlike:function(){
          var likestr = '';
          var likelist = self_tool.userdat().like;
          console.log(likelist)
          for(var i=0;i<likelist.length;i++){
              var allgoods = JSON.parse(sessionStorage.getItem('allgoods'));
              var likearr = allgoods.filter(function(ele){
                    return (ele._id == likelist[i])
              })[0]
              console.log(likearr)
              likestr += '<li number="'+ likearr._id +'"><img src="./img/'+ likearr.image[0] +'"><p>'+ likearr.name +'</p><span class="like">'+ likearr.like +'</span><span class="price">'+ likearr.price +'</span></li>'
          }
          $('.like_list').html(likestr);
      },
      gethistory:function(){
        var historystr = '';
        var historylist = self_tool.userdat().historylist;
        for(var i=0;i<historylist.length;i++){
            var allgoods = JSON.parse(sessionStorage.getItem('allgoods'));
            var historyarr = allgoods.filter(function(ele){
                  return (ele._id == historylist[i])
            })[0]

            historystr += '<li number="'+ historyarr._id +'"><img src="./img/'+ historyarr.image[0] +'"><p>'+ historyarr.name +'</p><span class="like">'+ historyarr.like +'</span><span class="price">'+ historyarr.price +'</span></li>'
        }
        $('.history_list').html(historystr);
    }
   }
    return self_tool;
});