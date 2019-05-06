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
           var people = $('.my_address .a').val();
           var tel = $('.my_address .b').val();
           var addr = $('.my_address textarea').val();
           if(tools.checkval(tel,'tel')&&tools.checkval(people,'text')&&tools.checkval(addr,'text')){
                userdat.phone = tel;
                userdat.address = addr;
                userdat.person = person;
                sessionStorage.setItem('userdat',JSON.stringify(userdat));
               ajax('/change','POST',{id:userdat._id,change:{person:people,phone:tel,address:addr}},function(){
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
       advice:function(){
           var id = self_tool.userdat()._id;
           var advice = $('.advice textarea').val();
           if(tools.checkval(advice,'text')){
            ajax('/advice','POST',{"_id":id,advice},function(){
                alert('提交成功！');
                $('.advice textarea').val('');
             })
           }
       }
   }
    return self_tool;
});