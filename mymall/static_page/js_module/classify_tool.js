define([], function() {
    let classify_tool = {
        check_class:function(){
            var index = parseInt($(this).attr('index'));
            $(this).siblings('span').removeClass('act');
            $(this).addClass('act');
            $('.listbox').css('left',-index*750+'px'); 
        },
        classify_close:function(){
            $('.classify_page').css('display','none');
        }

    }
    return classify_tool;
});