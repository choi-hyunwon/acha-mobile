var front = front || {};

front.common = front.common || {};

front.common = (function () {

    var init = function() {
        this.comma(num);
    };

    var comma = function (num){
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

    return {
        comma : comma,
        init : init
    }
})();
$(function () {
    front.common.init();
});