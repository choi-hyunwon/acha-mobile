var front = front || {};

front.common = front.common || {};

front.common = (function () {
    var init = function() {
        this.a();
        this.makeCommaInput();
        this.makeCommaText();
        this.hideNumber();
        this.clickIconEvent();
    };

    var a = function () {
        $('a[href="#"]').on('click', function (e) {
            e.preventDefault();
        });
    };

    var clickIconEvent = function () {
        $('.card-header').on('click',function () {
            $('.card-header').removeClass('active');
            if ($(this).attr('aria-expanded')=="true") {
                console.log(true);
                $(this).removeClass('active');
            } else {
                console.log(false);
                $(this).addClass('active');
            }
        })
    };
    /*
     comma 생성 함수
    * */
    var comma = function (num){
        if(!num) {
            return "";
        }
        var len, point, str;
        num = num + "";
        point = num.length % 3 ;
        len = num.length;
        str = num.substring(0, point);
        while (point < len) {
            if (str != "") str += ",";
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
        })
    };
    /*
     span 태그에서 comma() 사용시
    * */
    var makeCommaText  = function () {
        const that = this;
        $('._commaS').each(function () {
            var num = $(this).text().split('원')[0] * 1;
            var value = that.comma(num);
            $(this).text(value).append('<span class="current">원</span>');
        })
    };
    /*
     eye 버튼 클릭 시, 숫자를 hide 해주는 함수
    * */
    var hideNumber = function () {
        var that = this;
        $('.btn-eye-on').on('click',function () {
            $('.icon-eye-on').toggleClass('icon-eye-off');

            var val = $('._value').val(); // 총 급여
            var commaRemoved = val.replace(/\,/g,'');

            var replaced;

            // * 일 때 -> 숫자로 변환
            // 개발에서 data-income 값 바인딩 필요
            if (isNaN(+(commaRemoved))) {
                replaced = Number($('._value').data('income'));
                replaced = that.comma(replaced);
            }
            // 숫자일때 -> * 로 변환
            else {
                replaced = val.replace(/[0-9]/g, '*');
            }

            $('._value').val(replaced);
        })
    };

    return {
        a : a,
        clickIconEvent : clickIconEvent,
        comma : comma,
        makeCommaInput : makeCommaInput,
        makeCommaText : makeCommaText,
        hideNumber : hideNumber,
        init : init
    }
})();
$(function () {
    front.common.init();
});