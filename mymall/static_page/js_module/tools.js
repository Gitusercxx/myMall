define(function() {
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
     function checkval (val, type) {
      if (type == 'tel') {
         var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
         if (reg.test(val)) {
            return true;
         } else {
            alert('手机号有误！请修改');
            return false;
         }
      } else if (type == 'password') {
         if (val.length > 6) {
            return true;
         } else {
            alert('密码必须多于6位！');
            return false;
         }
      } else if (type == 'pass_answer') {
         if (val.length > 0) {
            return true;
         } else {
            alert('密保答案不能为空！');
            return false;
         }
      } else {
         if (val.length > 0) {
            return true;
         } else {
            alert('内容不能为空！');
            return false;
         }
      }
   }
     var tools = {
      ajax,
      checkval
     }
    return tools;
});