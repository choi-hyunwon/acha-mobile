var front = front || {};

front.common = front.common || {};

front.common = (function () {
  var init = function () {
    this.a();
    this.makeCommaInput();
    this.makeCommaText();
    this.hideNumber();
    this.clickIconEvent();
    this.popupEvent();
    this.commonHandler();
  };

  var a = function () {
    $('a[href="#"]').on('click', function (e) {
      e.preventDefault();
    });
  };
  /*
    2020-02-14
    수정사항
     accordion 클릭시 버그 수정
    * */
  var clickIconEvent = function () {
    $('.accordion').on('show.bs.collapse', function (e) {
      var eTarget = $(e.target).prev();
      eTarget.addClass('active').parent().siblings().find('.card-header').removeClass('active');
    });
    $('.accordion').on('hide.bs.collapse', function (e) {
      var eTarget = $(e.target).prev();
      eTarget.removeClass('active');
    });
  };
  /*
     comma 생성 함수
    * */
  var comma = function (num) {
    if (!num) {
      return '';
    }
    var len, point, str;
    num = num + '';
    point = num.length % 3;
    len = num.length;
    str = num.substring(0, point);
    while (point < len) {
      if (str != '') str += ',';
      str += num.substring(point, point + 3);
      point += 3;
    }
    return str;
  };
  /*
     input 태그에서 comma() 사용시
    * */
  var makeCommaInput = function () {
    const that = this;
    $('._commaI').each(function () {
      var num = $(this).val() * 1;
      var value = that.comma(num);
      $(this).val(value);
    });
  };
  /*
     html 태그에서 comma() 사용시
    * */
  var makeCommaText = function () {
    const that = this;
    $('._commaS').each(function () {
      var num = $(this).text().split('원')[0] * 1;
      var value = that.comma(num);
      $(this).text(value);
      // $(this).text(value).append('<span class="current">원</span>');
    });
  };
  /*
     eye 버튼 클릭 시, 숫자를 hide 해주는 함수
    * */
  var hideNumber = function () {
    var that = this;
    $('.btn-eye-on').on('click', function () {
      $('.icon-eye-on').toggleClass('icon-eye-off');

      var val = $('._value').val(); // 총 급여
      var commaRemoved = val.replace(/\,/g, '');

      var replaced;

      // * 일 때 -> 숫자로 변환
      // 개발에서 data-income 값 바인딩 필요
      if (isNaN(+commaRemoved)) {
        replaced = Number($('._value').data('income'));
        replaced = that.comma(replaced);
      }
      // 숫자일때 -> * 로 변환
      else {
        replaced = val.replace(/[0-9]/g, '*');
      }

      $('._value').val(replaced);
    });
  };
  /*
    팝업
    * */
  var popupEvent = function () {
    $('._btnPopup').on('click', function () {
      $('body').removeClass('scrOff').addClass('scrOn');
      $('#requiredPerformance').addClass('active');
      $('#performanceCalculation').addClass('active');
      $('#automaticPaymentDetails').addClass('active');
      $('#annualFee').addClass('active');
      $('#changeRequiredPerformance').addClass('active');
      $('#inputIncomeInformation').addClass('active');
      $('#selectMonthPopup').addClass('active');
      $('#popupTaxTip').addClass('active');
      $('#popupEvent').addClass('active');
      $('#popupEventSmall').addClass('active');
    });
    $('._btnClose').on('click', function () {
      $('body').removeClass('scrOn').addClass('scrOff');
      $('#requiredPerformance').removeClass('active');
      $('#performanceCalculation').removeClass('active');
      $('#automaticPaymentDetails').removeClass('active');
      $('#annualFee').removeClass('active');
      $('#changeRequiredPerformance').removeClass('active');
      $('#inputIncomeInformation').removeClass('active');
      $('#selectMonthPopup').removeClass('active');
      $('#popupTaxTip').removeClass('active');
      $('#popupEvent').removeClass('active');
      $('#popupEventSmall').removeClass('active');
    });
    $('._btnRefresh').on('click', function () {
      $('._refresh').val('');
    });
    $('._dimClose').on('click', function (e) {
      if ($('.popup-normal').has(e.target).length === 0) {
        $('body').removeClass('scrOn').addClass('scrOff');
        $('#automaticPaymentDetails').removeClass('active');
        $('#performanceCalculation').removeClass('active');
        $('#annualFee').removeClass('active');
        // $('#popupTaxTip').removeClass('active');
      }
    });

    /*
        -/+ count
        * */
    $('.qty-plus').on('click', function () {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
      $(this).prev().prev().find('.sprite').removeClass('ico_minus_dim').addClass('ico_minus_nor');
    });
    $('.qty-minus').on('click', function () {
      if ($(this).next().val() > 0)
        $(this)
          .next()
          .val(+$(this).next().val() - 1);
      if ($(this).next().val() == 0) {
        $(this).find('.sprite').removeClass('ico_minus_nor').addClass('ico_minus_dim');
      }
    });
    $('.qty').each(function () {
      if ($(this).val() == 0) {
        $(this).prev().find('.sprite').removeClass('ico_minus_nor').addClass('ico_minus_dim');
      }
    });

    /*
        있음/없음 클릭 이벤트
        * */
    $('.btn-no').on('click', function () {
      $(this).next().removeClass('active');
      $(this).addClass('active');
    });
    $('.btn-yes').on('click', function () {
      $(this).prev().removeClass('active');
      $(this).addClass('active');
    });
  };

  var commonHandler = function () {
    // sortable
    $(function () {
      $('.sortable').sortable({
        axis: 'y',
        handle: '.handle',
        containment: 'parent',
        forcePlaceholderSize: true,
        scrollSensitivity: 100,
        scrollSpeed: 20
      });
      
      // 자산목록 타이틀 disable
      $(".total-sum").sortable({
        disabled: false
      });
      $(".assets-total-box .total-sum").sortable({
        disabled: true
      });

      $('._sticky').sticky({ topSpacing: 0 }).css('background-color', '#ffffff');

      // 더보기 - 1:1문의내역 : badge 있을 경우, 말 줄임 width 조정
      $('.list_group.multi > .list_group_item > .badge-pill').siblings().filter('.item_title').find('.title').css('width', 'calc(100% - 40px)');

      // select 커스텀
      var selectTarget = $('.select_box select');
      selectTarget.change(function () {
        var select_name = $(this).children('option:selected').text();
        $(this).siblings('label').text(select_name);
      });

      // _btnTop 클릭시, scrollTop(0)
      $('._btnTop').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 200);
      });

      // 지출 카테고리 선택 이벤트
      $('.box_ex_connect_item .box_connect_list .group-item').on('click', function () {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $('.box_ex_connect_item .btn_area .btn').addClass('dim');
        } else {
          $(this).addClass('active');
          $(this).siblings().removeClass('active');
          $('.box_ex_connect_item .btn_area .btn').removeClass('dim');
        }
        $('.box_ex_connect_item .box_connect_list .group-item').hasClass('active') ? $('.box_ex_connect_item .btn_area .btn').removeClass('dim') : $('.box_ex_connect_item .btn_area .btn').addClass('dim');
      });

      // 지출관리 아코디언 메뉴 클릭 이벤트
      $('._btnOpen').on('click', function () {
        if ($(this).hasClass('collapsed')) {
          $(this).html(`접기<i class="sprite arrow_folding_off"></i>`);
          $(this).parent().siblings().find($('._btnOpen')).html(`펼치기<i class="sprite arrow_folding_on"></i>`);
        } else {
          $(this).html(`펼치기<i class="sprite arrow_folding_on"></i>`);
          $(this).parent().siblings().find($('._btnOpen')).html(`펼치기<i class="sprite arrow_folding_on"></i>`);
        }
      });

      // 카드 비율 유지
      var winWidth = $(window).width();
      var box = $('.main-card-empty');
      var boxWidth = box.width();

      box.height(boxWidth * 0.539);

      $(window).resize(function () {
        var box = $('.main-card-empty');
        var boxWidth = box.width();

        box.height(boxWidth * 0.539);
      });
    });
  };

  return {
    a,
    clickIconEvent,
    comma,
    makeCommaInput,
    makeCommaText,
    hideNumber,
    popupEvent,
    commonHandler,
    init,
  };
})();
$(function () {
  front.common.init();
});

/*
실시간 콤마 적용
* */
function comma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function unComma(str) {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}

function inputNumberFormat(obj) {
  obj.value = comma(unComma(obj.value));
}

/*
토스트 팝업 이벤트
* */
function toastPopupShow() {
  $('._toastPopup').fadeIn();
}

function toastPopupHide() {
  $('._toastPopup').fadeOut();
}
