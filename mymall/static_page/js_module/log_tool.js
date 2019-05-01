define(['tools'],function(tools) {
   var checkval = tools.checkval;
   var ajax = tools.ajax;
    
        let log_tool = {
            inputup: function () {
               $('.log_wapper').add('.changepassword').css('margin-top', '0px');
            },
            inputdow: function () {
               $('.log_wapper').add('.changepassword').css('margin-top', '25%');
            },
            closelog: function () {
               $('.login_page').add('.logbj').css('display', 'none');
               $('.indexpage').add('.head').add('.bottom_nav').css('display', 'block');
               swiper();
            },
            log: function () {
               $('.log_box').css('display', 'block');
               $('.log').addClass('act');
               $('.reg').removeClass('act');
               $('.reg_box').css('display', 'none');
            },
            reg: function () {
               $('.reg_box').css('display', 'block');
               $('.reg').addClass('act');
               $('.log').removeClass('act');
               $('.log_box').css('display', 'none');
            },
            userlog: function () {
               var tel = $('.log_tel').val();
               var password = $('.log_password').val();
               if (checkval(tel, 'tel') && checkval(password, 'password')) {
                  ajax('/userlog', 'POST', { _id: tel, password: password }, log_tool.logsuccess)
               }
            },
            userreg: function () {
               var tel = $('.reg_tel').val();
               var password = $('.reg_password').val();
               var pass_word = $('.reg_pass_word').val();
               var pass_question = $('.pass_question option:selected').val();
               var pass_answer = $('.pass_answer').val();
               if (checkval(tel, 'tel') && checkval(password, 'password') && checkval(pass_answer, 'pass_answer')) {
                  var obj = { _id: tel, password: password, pass_question: pass_question, pass_answer: pass_answer }
                  console.log(obj);
                  ajax('/userreg', 'POST', obj, log_tool.regsuccess)
               }
            },
            logsuccess: function (d) {
               var dat = JSON.parse(d)[0];
               if (dat._id) {
                  if (log_tool.remember) {
                     localStorage.setItem('malluser', $('.log_tel').val() + '-' + $('.log_password').val())
                  } else {
                     localStorage.setItem('malluser', $('.log_tel').val());
                  }
                  log_tool.closelog();
      
               } else if (dat == 'password_mistake') {
                  alert('密码有误，请重新输入');
                  $('.log_password').focus();
               } else {
                  alert('该账户为注册，请先注册')
               }
            },
            regsuccess: function (d) {
               var regdat = JSON.parse(d);
               if (regdat[0] == 'reg_success') {
                  log_tool.closelog();
               } else if (regdat[0] == 'reg_fail_repeat') {
                  alert('该账户已注册');
               }
            },
            remember: true,
            rem_pass: function () {
               console.log("rem")
               if (log_tool.remember) {
                  $('.rem_but').css('left', '50px');
                  log_tool.remember = false;
               } else {
                  $('.rem_but').css('left', '0px');
                  log_tool.remember = true;
               }
            },
            change_pass: function () {
               $('.log_wapper').css('display', 'none');
               $('.changepassword').css('display', 'block');
            },
            change_getuser: function () {
               var tel = $('.change_tel').val();
               if (checkval(tel, 'tel')) {
                  ajax('/getuser', 'POST', { _id: tel }, log_tool.show_question)
               }
            },
            show_question: function (d) {
               var userinfor = JSON.parse(d);
               console.log(userinfor)
               if (userinfor[0] == 'unregistered') {
                  alert('该账户未注册');
               } else {
                  var str = '<h5 class="puestion_tit">密保问题验证:' + userinfor[0].pass_question + '?</h5>' +
                     '<input type="text" placeholder="输入密保答案(必填)" class="answer">' +
                     '<input type="password" class="changepass" placeholder="输入新密码">' +
                     '<input type="password" class="change_pass" placeholder="确认密码">' +
                     '<div class="change_but">更改&登录</div>'
                  $('.change_box').html(str);
                  $('.change_but').on('click', function () {
                     var changepass = $('.changepass').val();
                     var change_pass = $('.change_pass').val();
                     var answer = $('.answer').val();
                     if (checkval(changepass, 'password')) {
                        if (changepass == change_pass) {
                           if (answer == userinfor[0].pass_answer) {
                              ajax('/changepass', 'POST', { _id: userinfor[0]._id, password: changepass }, log_tool.change_sucess);
                           } else {
                              alert('密保验证失败');
                           }
                        } else {
                           $('.change_pass').css('color', '#f40');
                           alert('密码不一致');
                           setTimeout(function () {
                              $('.change_pass').css('color', 'rgb(241, 241, 241)');
                           }, 4000);
                        }
                     }
                  })
               }
      
            },
            change_sucess: function (d) {
               var result = JSON.parse(d)
               console.log(result);
               if (result.ok) {
                  alert('修改成功,请妥善保管密码');
                  log_tool.closelog();
               }
            },
            // checkval: function (val, type) {
            //    if (type == 'tel') {
            //       var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            //       if (reg.test(val)) {
            //          return true;
            //       } else {
            //          alert('手机号有误！请修改');
            //          return false;
            //       }
            //    } else if (type == 'password') {
            //       if (val.length > 6) {
            //          return true;
            //       } else {
            //          alert('密码必须多于6位！');
            //          return false;
            //       }
            //    } else if (type == 'pass_answer') {
            //       if (val.length > 0) {
            //          return true;
            //       } else {
            //          alert('密保答案不能为空！');
            //          return false;
            //       }
            //    } else {
            //       if (val.length > 0) {
            //          return true;
            //       } else {
            //          alert('内容不能为空！');
            //          return false;
            //       }
            //    }
            // }
      
         }
    return log_tool;
});