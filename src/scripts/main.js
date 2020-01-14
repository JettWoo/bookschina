require.config({
   // baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/', //设置模块的公共路径
    paths: {
        'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min',
        'jquerycookie': 'https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min',
        'jquerylazyload': 'https://cdnjs.cloudflare.com/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min'
    }
});


require(['jquery', 'jquerycookie'], function(){
    let targetPage = $('#currentPage').attr('target-page');
    console.log("-------:", targetPage)
    if(targetPage){
        require([targetPage], function(targetPage){
            console.log(targetPage)
            //targetPage.init();
        })
    }
})