define(['tools'], function(tools) {
    var ajax = tools.ajax;
    let search_tool = {
        keyword:JSON.parse(sessionStorage.getItem('keyword')).keyword,
        allgoods:JSON.parse(sessionStorage.getItem('allgoods')),
        valchange:function(){
           var val = $('.input>input').val();
           $('.search_list').html('');
           if(val != ''&& val != ' '){
            var keyarr = [];
            keyarr = search_tool.keyword.filter(function(ele,index){
                if(ele.indexOf(val) != -1){
                    return ele;
                }
            })
            var stri = ''
            for(var i=0;i<keyarr.length;i++){
                stri += '<i>'+ keyarr[i] +'</i>'
           }
           $('.tipword').html(stri);
           }else {
            $('.tipword').html('');
           }
        },
        getresult:function(){
            if($(this).attr('class') != 'search_but'){
                $('.input>input').val($(this).text());
            }
            var inputval = $('.input>input').val();
            var goods = [];
            goods = search_tool.allgoods.filter(function(ele){
                if(ele.name.indexOf(inputval) != -1 || ele.class.indexOf(inputval) != -1){
                    return ele;
                }
            })
            var len = goods.length;
            var searchstr = ''
            if(len > 0){
                for(var i=0;i<len;i++){
                    searchstr += '<li number='+ goods[i]._id +'><img src="./img/'+ goods[i].image[0] +'"><p>'+ goods[i].name +'</p><span class="like">'+ goods[i].like +'</span><span class="price">'+ goods[i].price +'</span></li>'
                }
            }else{
                searchstr = '<h3 class="no_more">暂无搜索内容，看看其他商品吧~ @_@ ~</h3>';
            }
            $('.tipword').html('');
            $('.search_list').html(searchstr);
        },
    }
    return search_tool;
});