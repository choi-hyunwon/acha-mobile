var front = front || {};
front.form = front.form || {};
front.form = (function () {
    var init = function() {
        // this.setSelect();
        this.onFucusText();
        this.onBlurText();
    };

    // var datepicker = function () {
        //https://uxsolutions.github.io/bootstrap-datepicker/?markup=input&format=&weekStart=&startDate=&endDate=&startView=0&minViewMode=0&maxViewMode=4&todayBtn=false&clearBtn=false&language=kr&orientation=auto&multidate=&multidateSeparator=&keyboardNavigation=on&forceParse=on#sandbox
        // $('._datepicker').datepicker({
        //     language: "kr",
        //     format: "yyyy-mm-dd",
        //     todayHighlight: true,
        //     todayBtn: false,
        //     clearBtn: false
        // });
    // };

                              $("#datepicker-day").datepicker({
                                showOn: "button",
                                buttonImage:
                                    "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
                                buttonImageOnly: true,
                                changeMonth: true,
                                changeYear: true,
                                dateFormat: "yy-mm-dd DD",
                                dayNames: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
                                dayNamesMin: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
                                monthNamesShort: [
                                    "1월",
                                    "2월",
                                    "3월",
                                    "4월",
                                    "5월",
                                    "6월",
                                    "7월",
                                    "8월",
                                    "9월",
                                    "10월",
                                    "11월",
                                    "12월",
                                ],
                                showOtherMonths: true,
                            });

    var onFucusText = function () {
        $('input[type="text"], input[type="password"], input[type="email"]').on('focus', function () {
            var tooltip = $(this).data('tooltip');
            if (tooltip !== undefined){
                $(this).after('<span class="tooltip-form">' + tooltip + '</span>');
            }
        })
    }
    var onBlurText = function () {
        $('input[type="text"], input[type="password"], input[type="email"]').on('blur', function () {
            if ( !$(this).hasClass('select-dropdown') ) {
                $(this).siblings('.tooltip-form').remove();
            }
        })
    }


    /**
     * setError validation 에러노출
     * @param target : jQuery selector
     * @param massage : string
     * @param position : 'top' (default : 'bottom')
     */
    var setError = function (target, massage, position) {
        var nTarget = $(target).outerWidth();

        $(target).wrap('<div  class="error"></div>')
            .after('<span class="help-text" style="width : '+nTarget+'px">'+massage+'</span>');
        if(position == "top") {
            $(target).parent('.error').addClass('error_top');
        }
    };

    /**
     * destroyError
     * @param target : jQuery selector
     */
    var destroyError = function  (target) {
        $(target).unwrap()
            .siblings('.help-text').remove();
    };

    /**
     * jqGridCheckBox customizing
     * @param target : jQuery selector
     */

    var jqGridCheckBox =  function (target) {
        $('.ui-jqgrid input[type=checkbox]').after('<label></label>');
    };

    return {
        datepicker : datepicker,
        onFucusText : onFucusText,
        onBlurText : onBlurText,
        setError : setError,
        destroyError : destroyError,
        jqGridCheckBox : jqGridCheckBox,
        init : init,
    }
})();
$(function () {
    front.form.init();
});

