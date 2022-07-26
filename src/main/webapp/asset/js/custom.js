function bluring(){
   if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG"||event.srcElement.tagName=="button")
   document.body.focus();
}
document.onfocusin=bluring;

var mFeaSlide,
downSlise,
mPrefSlide;
$(function(){

    if($("#wrap").hasClass("index")){
        //메인
        var mVis = $('#indexwrap').fullpage({
            anchors: ['intro', 'index01', 'index02', 'index05'],
            menu: '#gnb',
            dragAndMove: true,
            scrollOverflow: true,
            afterLoad: function(anchorLink, index){
                if(index == 1){
                    $('#wrap').attr('class','');
                    $('#wrap').addClass('w1');
                }
                if(index == 2){
                    $('#wrap').attr('class','');
                    $('#wrap').addClass('w2');
                }
                if(index == 5){
                    $('#wrap').attr('class','');
                    $('#wrap').addClass('w5');
                }
                if(index == 6){
                    $('#wrap').attr('class','');
                    $('#wrap').addClass('w6');
                }
            }
        });

        //slide 이벤트
        var mTxSlide = new Swiper('.index01 .tx-slide .side-bx', {
            speed: 400,
            spaceBetween: 100,
            pagination: {
                el: '.index01 .pager',
                clickable: true,
            },
            autoplay: {
                delay:5000,
                disableOnInteraction: false,
            },
            //loop: true,
        });


        var mAtSlide = new Swiper('.index05 .part-bx .side-bx', {
            speed: 400,
            spaceBetween: 60,
            pagination: {
                el: '.index05 .pager',
                type: 'bullets',
            clickable: true,
            },
            breakpoints: {
                767: {
                    spaceBetween: 0
                },
            }
        });

        mFeaSlide = new Swiper('.index02 .fea-lst .slide-bx', {
            pagination: {
                el: '.index02 .pager',
                type: 'bullets',
            clickable: true,
            },
        });

        // index event
        $('.index02 .item').click(function(e){
            e.preventDefault();
            if($(this).hasClass("active")){
                $(this).removeClass('active');
            }else{
                $(this).addClass('active').siblings().removeClass('active');
            }
            return false;
        });

        // if($(window).width() < 1023){ //mobile
        //     mFeaSlide.update();
        // } else { //pc
        //     mFeaSlide.destroy(true, true);
        //     $('.fea-lst .swiper-wrapper').removeAttr('style');
        //     $('.fea-lst .swiper-slide').removeAttr('style');
        // }


        //$('#indexwrap .section .inner').mCustomScrollbar({
        //    theme: 'minimal-dark'
        //});

    } else if($("#wrap").hasClass("down")){

        //slide 이벤트
        downSlise = new Swiper('.down-slide', {
            slidesPerView:3,
            speed: 400,
            spaceBetween: 30,
            pagination: {
                el: '.down-slide .pager',
                clickable: true,
            },
            autoplay: {
                delay:5000,
                disableOnInteraction: false,
            },
            breakpoints: {
                1023: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                }
            },
        });

      if($(window).width() < 1023){ //mobile
      } else { //pc
         downSlise.destroy(true, true);
      }

        $('.inst-bt .bt-open').click(function(){
            $(this).toggleClass('active').parent().find('.inst-guide').slideToggle();
        })
      $('#back-top').click(function () {
         $('body,html').animate({
            scrollTop: 0
         }, 200);
         return false;
      });

    } else {
      $('#back-top').click(function () {
         $('body,html').animate({
            scrollTop: 0
         }, 200);
         return false;
      });
   }

    // 파일박스
    var fileTarget = $('.filebox .upload-hidden');

    fileTarget.on('change', function(){
        if(window.FileReader){
            var filename = $(this)[0].files[0].name;
        }
        else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        };
        $(this).siblings('.upload-name').val(filename);
    });

    // var conOff = $( '#container' ).offset();
    // $( window ).scroll( function() {
    //     if ( $( document ).scrollTop() > conOff.top ) {
    //         $("header").addClass('fixed');
    //     }
    //     else {
    //         $("header").removeClass('fixed');
    //     }
    // });

   var con2Off = $( '.s-content:first' ).offset();
   var sv = $('.sub-vis').height();
    $( window ).scroll( function() {
        if ( $( document ).scrollTop() > sv ) {
            $(".bt-mn").addClass('color');
        }
        else {
            $(".bt-mn").removeClass('color');
        }
    });

    aniEff();

    //select
    $('.select').niceSelect();

   videoResize();

    $(window).resize(function(){
       videoResize();
    });

});

//풀사이즈 영상사이즈 조정
function videoResize() {
    w_w = $(window).width();
    w_h = $(window).height();
    w_r = w_h / w_w;
    v_w = 1920;
    v_h = 1080;
    v_r = v_h / v_w;
    if(w_w > v_w ){
        $('#indexwrap .intro .video-bg ').css({width:'100%', 'height':'1080px'});
    }else{
        $('#indexwrap .intro .video-bg ').css({width:'1920px', 'height':'1080px'});
    }
}


function adjustScript() {
    if($("#wrap").hasClass("index")){
        if($(window).width() < 1023){ //mobile
            $('.index02 .fea-lst .slide-bx > div').addClass('swiper-wrapper');
            $('.fea-lst .item').removeClass('pc');
            mFeaSlide = new Swiper('.index02 .fea-lst .slide-bx', {
                pagination: {
                    el: '.index02 .pager',
                    type: 'bullets',
                },
            });

        } else { //pc
            
            $('.fea-lst .swiper-wrapper').removeAttr('style');
            $('.fea-lst .item').addClass('pc').removeAttr('style');
        }
    } else if($("#wrap").hasClass("down")){
      if($(window).width() < 1023){ //mobile
         downSlise = new Swiper('.down-slide', {
            slidesPerView:3,
            speed: 400,
            spaceBetween: 30,
            pagination: {
               el: '.down-slide .pager',
               clickable: true,
            },
            autoplay: {
               delay:5000,
               disableOnInteraction: false,
            },
            breakpoints: {
               1023: {
                  slidesPerView: 2,
                  spaceBetween: 20,
               },
               480: {
                  slidesPerView: 1,
                  spaceBetween: 0,
               }
            },
         });
      } else { //pc
         downSlise.destroy(true, true);
            $('.down-slide .swiper-wrapper').removeAttr('style');
            $('.down-slide .swiper-slide').removeAttr('style');
      }
    }
}

var ua = window.navigator.userAgent;
var winW = $(window).width();

$(window).bind('resize', function(){
    adjustScript();
   setTimeout(function(){

      if(winW != $(window).width()){
         winW = $(window).width();
      }
   }, 500);
});

$(document).on("click", ".bt-mn a,#lm .close", menuCtr);

function menuCtr(e){
   e.preventDefault();

   $(".bt-mn a,#lm .close").toggleClass("open");

   if(ua.indexOf('MSIE 7') > -1 || ua.indexOf('MSIE 8') > -1){
      $("body").toggleClass("ovf_hdn");
   }else{
      $("html, body").toggleClass("ovf_hdn");
   }

   if(!$(this).hasClass("open")){
        $("#lm").stop().removeClass('open');
      lm_open = false;

      if(ua.indexOf('MSIE 7') > -1 || ua.indexOf('MSIE 8') > -1){
         $("html").css({"height" : "100%"});
         $("body").css({"height" : "100%", "overflow" : "visible", "position" : "static"});
      }
   }else{
        $("#lm").stop().addClass('open');
      lm_open = true;

      if(ua.indexOf('MSIE 7') > -1 || ua.indexOf('MSIE 8') > -1){
         $("html").css({"height":$(window).height() + "px"});
         $("body").css({"height":$(window).height() + "px", "overflow" : "hidden", "position" : "relative"});
      }
   }

    // Scrollbar
//   $('#lm .inner').mCustomScrollbar({
//      theme: 'minimal-dark'
//   });
}

/*// 레이어팝업
function callBpop(classId){
   $(classId).bPopup();
}

function callVdo(classId){
   $(classId).bPopup({
      onOpen: function() {
         $('.pop-video .mov iframe').attr('src', 'https://www.youtube.com/embed/noIc_hPc0yQ?autoplay=0&rel=0&cc_load_policy=0');
      },
        onClose: function() {
         $(".pop-video .mov iframe").attr("src","");
      }
   });
}*/


function aniEff(){

    // Animations
    //-----------------------------------------------
    if (($("[data-animation-effect]").length>0) && !Modernizr.touch) {
        $("[data-animation-effect]").each(function() {
            var $this = $(this),
            animationEffect = $this.attr("data-animation-effect");
            if(Modernizr.csstransitions) {
            $this.appear(function() {
                var delay = ($this.attr("data-effect-delay") ? $this.attr("data-effect-delay") : 1);
                if(delay > 1) $this.css("effect-delay", delay + "ms");
                    setTimeout(function() {
                        $this.addClass('animated object-visible ' + animationEffect);
                    }, delay);
                }, {accX: 0, accY: -130});
                } else {
                    $this.addClass('object-visible');
            }
        });
    };


}