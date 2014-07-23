var query = window.location.search.substring(1);
var _page = query.split('&')[0];
var _param = query.split('&')[1];
$(function(){
    //initialize
    if (_page == 'home'||_page == null||_page == '')
        _page = 'none';
    changeContent();
        
    $('#button_donate').click(function(){
        $('#dialog-overlay').css('display','block');
        $('#dialog_donate_content').load('html/index/donate.html');
        $('#dialog_donate').slideDown();
    });
    $('#button_contact').click(function(){
        $('#dialog-overlay,#dialog-box iframe').css('display','none');
        $('#dialog-overlay,#dialog-div').css('display','block');
        $('#dialog-div').load('html/index/message.html');
        $('#dialog-box').slideDown();
    });
    $('#address').click(function(){
        $('#dialog-overlay,#dialog-div').css('display','none');
        $('#dialog-overlay,#dialog-box iframe').css('display','block');
        $('#dialog-box').slideDown();
    });
    $('#dialog-close').live('click',function(){
        $('#dialog-overlay').css('display','none');
        $('#dialog-box,#dialog_donate').slideUp();
    });
    $('#dialog-overlay').live('click',function(){
        $('#dialog-overlay').css('display','none');
        $('#dialog-box,#dialog_donate').slideUp();
    });
    $('.block_content').click(function(){
        link = location.href.split('?')[1];
        page = this.id;
        var isHomePage;
        if (link == 'home'||link == null){
            isHomePage = true;
        }else {
            isHomePage = false;
        }
        loadMenuContent(page,false,isHomePage);
    });
    
    //prevent Drag IMG
    $('img').live('dragstart', function(e){ e.preventDefault();});
    
    //Back or Foward Button Action
    window.addEventListener('popstate', function(e) {
        page = location.href.split('?')[1];
        if (page == 'home'||page == null){
            returnHome(true,null);
        }else{
            var isHomePage;
            if (_page == 'none'){
                isHomePage = true;
            }else {
                isHomePage = false;
            }
            loadMenuContent(page,true,isHomePage);
        }
    });
    
    //Back 2 Top
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
    $('#toTop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });
});
function changeContent() {
    if (_page == 'none'){
        $('#pic_frame').css('display','block');
        $('marquee').css('display','block');
        $('.block').width('25%');
        return false;
    }
    else{
        $('#pic_frame').css('display','none');
        $('marquee').css('display','none');
        $('.block').width('16.66666%');
        $('.block a').css('font-size','22px').css('line-height','2em').css('font-weight','500');
        $('.video').hide();
        if (_param == null){
            $(".container").load('html/'+_page+'/'+_page+'.html');
        }else {
            $(".container").load('html/'+_page+'/'+_param+'.html');
        }
        $('#sidebar').load('html/sidebar.html').css('left','0px');
        $('html,body').scrollTop(0);
        return false;
    }
}
function returnHome(isPopState,e) {
    if (e != null)
        e.preventDefault();
    if (_page == 'none'){
        return false;
    }
    else {
        _page = 'none';
        title = document.title;
        $('#pic_frame').slideDown();
        $('marquee').slideDown();
        $('.block a').animate({
            fontSize:'28px',
            lineHeight:'1.5em',
            fontWeight:'700'
        });
        $(".container").slideUp();
        $('.video').slideDown();
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        $('.block').animate({
            width: '25%'
        },500);
        $('#sidebar').animate({
            left: '-200px'
        },800);
        if (isPopState == false){
            setTimeout(function(){
                history.pushState('',title,'?home');
            },500);
        }
        return false;
    }
}
function loadMenuContent(query,isPopState,isHomePage) {
    _page = query.split('&')[0];
    _param = query.split('&')[1]
    title = document.title;
    if (isHomePage == true){
        $('#pic_frame').slideUp();
        $('marquee').slideUp();
        $('.video').slideUp();
        $('.block a').animate({
            fontSize:'22px',
            lineHeight:'2em',
            fontWeight:'500'
        });
        $('.block').animate({
            width: '16.666666%'
        },500);
        if (_param == null){
        $(".container").load('html/'+_page+'/'+_page+'.html').slideDown(1000);
        }else {
            $(".container").load('html/'+_page+'/'+_param+'.html').slideDown(1000);
        }
        $('#sidebar').load('html/sidebar.html').animate({left:'0px'},1000);
    }else {
        if (_param == null){
            $(".container").load('html/'+_page+'/'+_page+'.html');
        }else {
            $(".container").load('html/'+_page+'/'+_param+'.html');
        }
        $('#sidebar').load('html/sidebar.html');
    }
    $('body,html').animate({
        scrollTop: 318
    }, 800);
    if (isPopState == false){
        if (_param == null){
            history.pushState('',title,'?'+_page);
        }else {
            history.pushState('',title,'?'+_page+'&'+_param);
        }
    }
    return false;
}