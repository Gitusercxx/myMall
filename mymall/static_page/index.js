(function index($) {
   require.config({
      baseUrl: "js_module",
      paths: {
         fill_mall:'mallfill',
         log:'log_tool',
         head_tool:'head_tool',
         bottom_tool:'bottom_tool',
         order_tool:'order_tool',
      }
   });
  
   
   // let log_tool = {
   //    inputup: function () {
   //       $('.log_wapper').add('.changepassword').css('margin-top', '0px');
   //    },
   //    inputdow: function () {
   //       $('.log_wapper').add('.changepassword').css('margin-top', '25%');
   //    },
   //    closelog: function () {
   //       $('.login_page').add('.logbj').css('display', 'none');
   //       $('.indexpage').add('.head').add('.bottom_nav').css('display', 'block');
   //       swiper();
   //    },
   //    log: function () {
   //       $('.log_box').css('display', 'block');
   //       $('.log').addClass('act');
   //       $('.reg').removeClass('act');
   //       $('.reg_box').css('display', 'none');
   //    },
   //    reg: function () {
   //       $('.reg_box').css('display', 'block');
   //       $('.reg').addClass('act');
   //       $('.log').removeClass('act');
   //       $('.log_box').css('display', 'none');
   //    },
   //    userlog: function () {
   //       var tel = $('.log_tel').val();
   //       var password = $('.log_password').val();
   //       if (log_tool.checkval(tel, 'tel') && log_tool.checkval(password, 'password')) {
   //          ajax('/userlog', 'POST', { _id: tel, password: password }, log_tool.logsuccess)
   //       }
   //    },
   //    userreg: function () {
   //       var tel = $('.reg_tel').val();
   //       var password = $('.reg_password').val();
   //       var pass_word = $('.reg_pass_word').val();
   //       var pass_question = $('.pass_question option:selected').val();
   //       var pass_answer = $('.pass_answer').val();
   //       if (log_tool.checkval(tel, 'tel') && log_tool.checkval(password, 'password') && log_tool.checkval(pass_answer, 'pass_answer')) {
   //          var obj = { _id: tel, password: password, pass_question: pass_question, pass_answer: pass_answer }
   //          console.log(obj);
   //          ajax('/userreg', 'POST', obj, log_tool.regsuccess)
   //       }
   //    },
   //    logsuccess: function (d) {
   //       var dat = JSON.parse(d)[0];
   //       if (dat._id) {
   //          if (log_tool.remember) {
   //             localStorage.setItem('malluser', $('.log_tel').val() + '-' + $('.log_password').val())
   //          } else {
   //             localStorage.setItem('malluser', $('.log_tel').val());
   //          }
   //          log_tool.closelog();

   //       } else if (dat == 'password_mistake') {
   //          alert('密码有误，请重新输入');
   //          $('.log_password').focus();
   //       } else {
   //          alert('该账户为注册，请先注册')
   //       }
   //    },
   //    regsuccess: function (d) {
   //       var regdat = JSON.parse(d);
   //       if (regdat[0] == 'reg_success') {
   //          log_tool.closelog();
   //       } else if (regdat[0] == 'reg_fail_repeat') {
   //          alert('该账户已注册');
   //       }
   //    },
   //    remember: true,
   //    rem_pass: function () {
   //       console.log("rem")
   //       if (log_tool.remember) {
   //          $('.rem_but').css('left', '50px');
   //          log_tool.remember = false;
   //       } else {
   //          $('.rem_but').css('left', '0px');
   //          log_tool.remember = true;
   //       }
   //    },
   //    change_pass: function () {
   //       $('.log_wapper').css('display', 'none');
   //       $('.changepassword').css('display', 'block');
   //    },
   //    change_getuser: function () {
   //       var tel = $('.change_tel').val();
   //       if (log_tool.checkval(tel, 'tel')) {
   //          ajax('/getuser', 'POST', { _id: tel }, log_tool.show_question)
   //       }
   //    },
   //    show_question: function (d) {
   //       var userinfor = JSON.parse(d);
   //       console.log(userinfor)
   //       if (userinfor[0] == 'unregistered') {
   //          alert('该账户未注册');
   //       } else {
   //          var str = '<h5 class="puestion_tit">密保问题验证:' + userinfor[0].pass_question + '?</h5>' +
   //             '<input type="text" placeholder="输入密保答案(必填)" class="answer">' +
   //             '<input type="password" class="changepass" placeholder="输入新密码">' +
   //             '<input type="password" class="change_pass" placeholder="确认密码">' +
   //             '<div class="change_but">更改&登录</div>'
   //          $('.change_box').html(str);
   //          $('.change_but').on('click', function () {
   //             var changepass = $('.changepass').val();
   //             var change_pass = $('.change_pass').val();
   //             var answer = $('.answer').val();
   //             if (log_tool.checkval(changepass, 'password')) {
   //                if (changepass == change_pass) {
   //                   if (answer == userinfor[0].pass_answer) {
   //                      ajax('/changepass', 'POST', { _id: userinfor[0]._id, password: changepass }, log_tool.change_sucess);
   //                   } else {
   //                      alert('密保验证失败');
   //                   }
   //                } else {
   //                   $('.change_pass').css('color', '#f40');
   //                   alert('密码不一致');
   //                   setTimeout(function () {
   //                      $('.change_pass').css('color', 'rgb(241, 241, 241)');
   //                   }, 4000);
   //                }
   //             }
   //          })
   //       }

   //    },
   //    change_sucess: function (d) {
   //       var result = JSON.parse(d)
   //       console.log(result);
   //       if (result.ok) {
   //          alert('修改成功,请妥善保管密码');
   //          log_tool.closelog();
   //       }
   //    },
   //    checkval: function (val, type) {
   //       if (type == 'tel') {
   //          var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
   //          if (reg.test(val)) {
   //             return true;
   //          } else {
   //             alert('手机号有误！请修改');
   //             return false;
   //          }
   //       } else if (type == 'password') {
   //          if (val.length > 6) {
   //             return true;
   //          } else {
   //             alert('密码必须多于6位！');
   //             return false;
   //          }
   //       } else if (type == 'pass_answer') {
   //          if (val.length > 0) {
   //             return true;
   //          } else {
   //             alert('密保答案不能为空！');
   //             return false;
   //          }
   //       } else {
   //          if (val.length > 0) {
   //             return true;
   //          } else {
   //             alert('内容不能为空！');
   //             return false;
   //          }
   //       }
   //    }

   // }
   // let haed_tool = {
   //    p_down: function () {
   //       let _ele = $('.intro')
   //       if (_ele.css('display') == 'none') {
   //          _ele.slideDown(350);
   //       } else {
   //          _ele.slideUp(350);
   //       }
   //    },
   //    click_star: function () {
   //       $('.star').off('click');
   //       $('.glyphicon-star-empty').css('display', 'none');
   //       $('.glyphicon-star').fadeIn(200);
   //       $('.starnum').html(parseInt($('.starnum').html()) + 1)
   //    }
   // }
   // let bottom_tool = {
   //    show: 'indexpage',
   //    show_index: function () {
   //       if (bottom_tool.show != 'indexpage') {
   //          $('.locate').css('left', '75px');
   //          $('.' + bottom_tool.show).fadeOut(100);
   //          $('.indexpage').fadeIn(200);
   //          bottom_tool.show = 'indexpage';
   //       }
   //    },
   //    show_search: function () {
   //       if (bottom_tool.show != 'searchpage') {
   //          $('.locate').css('left', '255px');
   //          $('.' + bottom_tool.show).fadeOut(100);
   //          $('.searchpage').fadeIn(200);
   //          bottom_tool.show = 'searchpage';
   //       }
   //    },
   //    show_order: function () {
   //       if (bottom_tool.show != 'orderpage') {
   //          $('.locate').css('left', '445px');
   //          $('.' + bottom_tool.show).fadeOut(100);
   //          $('.orderpage').fadeIn(200);
   //          bottom_tool.show = 'orderpage';
   //       }
   //    },
   //    show_self: function () {
   //       if (bottom_tool.show != 'selfpage') {
   //          $('.locate').css('left', '625px');
   //          $('.' + bottom_tool.show).fadeOut(100);
   //          $('.selfpage').fadeIn(200);
   //          bottom_tool.show = 'selfpage';
   //       }
   //    }
   // }
   // let order_tool = {
   //    show_pay: function () {
   //       var words = $(this).text();
   //       if (words == '已付款') {
   //          $('.pay').css('display', 'block');
   //          $('.wait_pay').css('display', 'none');
   //          $('.not_payorder').removeClass('act');
   //       } else {
   //          $('.wait_pay').css('display', 'block');
   //          $('.pay').css('display', 'none');
   //          $('.payorder').removeClass('act');
   //       }
   //       $(this).addClass('act');
   //    },
   //    moreinfor: function () {
   //       $('.showmore').css('right', '0px')
   //    },

   // }
   // let lunbo_tool = {
   //    star_x:0,
   //    rota:0,
   //    time:null,
   //    sild_star:function(e){
   //       clearInterval(lunbo_tool.time);
   //       lunbo_tool.star_x = e.targetTouches[0].clientX;
   //    },
   //    sild_end:function(e){
   //       var end_x = e.changedTouches[0].clientX;
   //       if(lunbo_tool.star_x - end_x <-50){
   //          lunbo_tool.rota += 60;
   //          $('.wapper').css('transform','translateZ(-516px) rotateY('+ lunbo_tool.rota +'deg)');
   //       }else if(lunbo_tool.star_x - end_x > 50){
   //          lunbo_tool.rota -= 60;
   //          $('.wapper').css('transform','translateZ(-516px) rotateY('+ lunbo_tool.rota +'deg)');
   //       }
   //       lunbo_tool.auto_sild();
   //    },
   //    auto_sild:function(){
   //       lunbo_tool.time = setInterval(function(){
   //          lunbo_tool.rota += 60;
   //          $('.wapper').css('transform','translateZ(-516px) rotateY('+ lunbo_tool.rota +'deg)');

   //       },3000)
   //    }
   // }

   var log_tool,haed_tool,bottom_tool,order_tool;
   require(['fill_mall','log','head_tool','bottom_tool','order_tool'],function(fill_mall,log,head,bottom,order){
      fill_mall();
      log_tool = log;
      haed_tool = head;
      bottom_tool = bottom;
      order_tool = order;
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
   $('.index').on('click', bottom_tool.show_index);
   $('.search').on('click', bottom_tool.show_search);
   $('.order').on('click', bottom_tool.show_order);
   $('.order_nav').on('click', 'span', order_tool.show_pay)
   $('.self').on('click', bottom_tool.show_self);
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
   
   //轮播图
   function swiper() {
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
   }



   function ajax(url, type, dat, fn) {
      $.ajax({
         url: url,
         type: type,
         data: dat,
         success: function (d) {
            fn(d)
            console.log(d)
         },
         error: function (err) {
            console.log(err)
         }


      })
   }
   // ajax('/user','GET');
   // ajax('/getnum','GET');
   // ajax('/userinfor','POST');
}(jQuery))