$(function(){
    $('article p code').each(function(){
        var content = $(this).text();
        if(content[0] === '[' && content[content.length-1] === ']'){
            $(this).addClass('cover');
            $(this).text(content.slice(1,-1))
        }
    })
    $('article p').each(function(){
        var reg = /([ \n]{1})(http|https)(:\/\/[\w\-_]+)(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])([ \n]{1})/g;
        content = $(this).html();
        $(this).html(content.replace(reg, '$1<a href="$2$3$4$5">$1$2$3$4$5</a>$6'));
    })
    $('article a').each(function(){
        var href = $(this).attr('href').trim();
        if(href.slice(0,4) === 'http' && href[4] != 's')
            href = '<strong>不安全 http</strong>' + href.slice(4)
        $(this).tooltip({
            html: true,
            title: href
        })
    })
    $('article pre code.language-shell').each(function(i,e){
        $(this).removeClass('language-shell').addClass('language-bash')
        hljs.highlightBlock(e)
    })
    $('article pre code').each(function () {
        var lines = $(this).text().split('\n').length - 1;
        var $numbering = $('<ul/>').addClass('hljs').addClass('hljs-line-number');
        $(this)
            .parent()
            .addClass('hljs').addClass('hljs-line-numbered')
            .prepend($numbering);
        if(lines > 3){
            $(this).parent().addClass('control-bar')
            for (i = 1; i <= lines; i++) {
                $numbering.append($('<li/>').text(i));
            }
        }
    });
    $('article img').each(function(){
        if($(this).attr('alt').length === 0) return 0;
        var $imgalt = $('<div/>').addClass('alt').text($(this).attr('alt'));
        $(this).parent().append($imgalt);
    })
    $('article thead').addClass('thead-light')
    $('article table').addClass('table table-striped table-hover table-borderless')
    $('article input[type="checkbox"]').parent().each(function(){
        var input = $(this).children('input').addClass('custom-control-input').prop('outerHTML');
        $(this).children('input').remove();
        $(this).addClass('custom-checkbox')
        var label = $('<label/>').addClass('custom-control-label')
        $(this).prepend(label).prepend(input);
    })

    $('.search input').focus(function(){
        $('.search').addClass('active');
    }).blur(function(){
        $('.search').removeClass('active');
    })

    $('.card-sidebar-control').click(function(){
        if($('.sidebar').hasClass('active'))
            $('.sidebar').removeClass('active');
        else $('.sidebar').addClass('active');
    })
    $('.card-fullscreen-control').click(function(){
        if($('body').hasClass('fullscreen'))
            $('body').removeClass('fullscreen');
        else $('body').addClass('fullscreen');
    })
    lastWindowWidth = 0;
    $(window).resize(function(){
        if($(window).width() === lastWindowWidth || $(window).width() >= 768) return;
        lastWindowWidth = $(window).width();
        $('body').removeClass('fullscreen');
        $('.sidebar').removeClass('active');
    })

    $('.site-controls div[data-tab]').click(function(){
        $('.site-controls div[data-tab]').removeClass('active');
        $(this).addClass('active');
        $('.site-control div[data-tab]').removeClass('active');
        $('.site-control div[data-tab='+$(this).attr('data-tab')+']').addClass('active')
    })

    $('.theme-control .col div').click(function(){
        $('body').attr('class',$(this).attr('class'))
    })
})