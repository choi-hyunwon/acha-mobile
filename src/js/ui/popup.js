front.popup = front.popup || {};

front.popup = (function () {

    var _btnOpen = $('._popupOpen');
    var _btnClose = $('._popupClose');

    var init = function() {
        this.checkOpen();
        this.claimCheck();
        this.open();
        this.close();
    };
    var open = function () {
        _btnOpen.on('click', function () {
            var id = $(this).data('id');
            $("#" + id).show();
            // $(document.body).css({
            //     "overflow" : "hidden"
            // })
        });
    };
    var close = function () {
        _btnClose.on('click', function () {
            $(this).parents('.popup_wrap').hide();
            // $(document.body).css({
            //     "overflow" : "visible"
            // })
        });
    };

    var claimCheck = function () {
        $('._toggleCheck').on('click', function () {
            var product = $(this).parents('.product');
            if ($(this).is(':checked')) {
                product.next('._cancelArea').show();
                product.find('.wrap_input').show();
                product.find('.price .checked').show();
                $('.text_calc').append('<em></em>')
            } else {
                product.next('._cancelArea').hide();
                product.find('.wrap_input').hide();
                product.find('.price .checked').hide();
                $('.text_calc em').remove()
            }
        });
    };

    var checkOpen = function () {
        $('._checkOpen').on('click', function () {
            if ($(this).is(':checked')) {
                var id = $(this).data('id');
                $("#" + id).show();
                // $(document.body).css({
                //     "overflow" : "hidden"
                // })
            } else {
                $("#" + id).hide();
            }
        });
    };

    return {
        checkOpen : checkOpen,
        claimCheck : claimCheck,
        open : open,
        close : close,
        init : init,
    }
})();
$(function () {
    front.popup.init();
})

