/**
 * --------------------------------------------------------------------------
 *  common.js
 * --------------------------------------------------------------------------
 */

var front = front || {};

front.common = front.common || {};

front.common = (function () {

  var init = function() {
    this.a();
    this.inputFile();
    this.aside();
    this.sortTable();
    this.commonHandler();
  };

  var a = function () {
    $('a[href="#"]').on('click', function (e) {
      e.preventDefault();
    });
  }

  var inputFile = function () {
    $('.custom-file-input').on('change', function() {
      let fileName = $(this).val().split('\\').pop();
      $(this).siblings('.custom-file-label').addClass('selected').html(fileName);
      // $(this).siblings('.custom-file-label').addClass('selected').html(fileName).css({'color':'#333','border-color':'#333'});
    });
  }

  var sortTable = function () {
    var $sortable = $('.sortable');
    $sortable.on('click', function(){
      var $this = $(this);
      var asc = $this.hasClass('asc');
      var desc = $this.hasClass('desc');
      $sortable.removeClass('asc').removeClass('desc');
      if (desc || (!asc && !desc)) {
        $this.addClass('asc');
      } else {
        $this.addClass('desc');
      }
    });
  }

  var aside = function () {

    var $depthFirst = $('._depth_first');
    var $depthSecond = $('._depth_second');

    // $depthFirst.css('height',$('.wrap').height() - 182);

    $('#panel_aside_2').hide();

    $depthFirst.on('click','li', function(){

      var $tabId = $("#"+$(this).data('id'));
      var value = 'active';

      $(this).addClass(value).siblings().removeClass(value);
      $depthSecond.find('.panel').hide();
      $tabId.show().addClass(value);
      $depthSecond.find('li').eq(0).addClass(value).siblings().removeClass(value);
      $depthSecond.find('#panel_aside_1').show();
      $depthSecond.find('#panel_aside_2').hide();
    });

    $('.snb').each(function() {

      $depthBtn = $(this).find('._3depthBtn');
      $depthThird = $(this).find('._depth_third');
      $depthThirdBtn = $(this).find('._depth_third li a');


      $depthBtn.click(function() {
        if(!$(this).hasClass('active')){
          $(this).addClass('active');
          $(this).find('.fal.fa-chevron-down').addClass('fa-chevron-up').removeClass('fa-chevron-down');
        } else {
          $(this).removeClass('active');
          $(this).find('.fal.fa-chevron-up').addClass('fa-chevron-down').removeClass('fa-chevron-up');
        }
      });

      $depthThird.click(function() {
        return false;
      });

      $depthThirdBtn.click(function() {
          $(this).addClass('active');
      });
    });
  };

  var asideInit = function (d1,d2,d3) {
    let index = d1;
    $('li[data-id="_panel'+index+'"]').addClass('active').siblings().removeClass('active');
    $('#_panel'+index).show().siblings().hide();
    //2뎁스 선택
    let index2 = d2;
    var btn = $('#panel_aside_1').find('.panel:visible').find('._3depthMenu > li');
    btn.find('._3depthBtn').removeClass('focus');
    btn.eq(index2-1).find('._3depthBtn').addClass('focus');
    //3뎁스 선택  ​
    let index3 = d3;
    $('#panel_aside_1').find('.panel:visible').find('._3depthBtn.focus').next().find('li').eq(index3-1).find('a').addClass('active');
  }



  var commonHandler = function () {

    // 다중 팝업 dim처리
    $(document).on('show.bs.modal', '.modal', function () {
      var zIndex = 1040 + (10 * $('.modal:visible').length);
      $(this).css('z-index', zIndex);
      setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
      }, 0);
    });

    // 레이어 팝업
    $('.btnPopupLayer').click(function(e) {
      var sWidth = window.innerWidth;
      var sHeight = window.innerHeight;

      var oWidth = $('.popupLayer').width();
      var oHeight = $('.popupLayer').height();

      console.log(sWidth);
      console.log(sHeight);
      console.log(oWidth);
      console.log(oHeight);

      var divLeft = e.clientX - 100;
      var divTop = e.clientY + 30;

      if( divLeft + oWidth > sWidth ) divLeft -= oWidth;
      if( divTop + oHeight > sHeight ) divTop -= oHeight;

      if( divLeft < 0 ) divLeft = 0;
      if( divTop < 0 ) divTop = 0;

      $('.popupLayer').css({
        "top": divTop,
        "left": divLeft,
        "position": "absolute"
      }).show();
    });

    // input value clear 이벤트
    $('._inputClear').click(
      function(){
        $(this).siblings().val('');
      });


    // 링크용 함수
    // ex)   <div data-href="http://google.com">
    // ex)   <div data-href="todayStudy.html">
    // ex)   <div data-href="todayStudy.html, window_name"> // 새창
    // ex)   <div data-href="todayStudy.html, _blank"> // 새창
    $("body").on("click", "[data-href]", function(){
      var href = $(this).attr("data-href");
      if (!href) return;
      href = href.split(",").map(function(item){ return item.trim();});
      if (href.length > 1) {
        window.open(href[0], href[1]);
      } else {
        location.href = href[0];
      }
    });


    $('.custom-control-input[type="checkbox"]').on('change', function () {
      if ($(this).parent().siblings().length > 0) {
        return false;
      }
      if ( $(this).prop('checked')){
        $(this).parents('tr').addClass('active');
      }else {
        $(this).parents('tr').removeClass('active');
      }
    })
  };

  return {
    a,
    sortTable,
    aside,
    asideInit,
    commonHandler,
    inputFile,
    init
  }
})();

$(function () {
  front.common.init();
});

// 팝업 close
function closeLayer( obj ) {
  $(obj).parent().parent().parent().hide();
}

