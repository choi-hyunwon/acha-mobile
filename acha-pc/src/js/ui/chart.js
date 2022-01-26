front.chart = front.chart || {};

front.chart = (function () {
    var init = function() {
        this.donutOpen();
    };

    /**
     * DonutChart
     * @type {DonutChart}
     *
     * 공제 화면에서 '공제한도' , '공제예상금액' 이용하여 도넛 차트 출력
     *
     * 도넛차트 영역 id = "donut"
     *
     * 공제한도 id = "_deduct_total"
     * data-amount = 공제한도금액(number type)
     *
     * 공제예상금액 id = "_deduct_estimate"
     * data-amount = 공제예상금액(number type)
     *
     * ### 라이브러리에서 100% 일 경우 1을 인식 못함 -> 0.9999 로 대체 입력시 정상 바인딩
     */
    var donutOpen = function () {
        if($('#donut').length !== 0){
            $('#donut').children('svg').remove();

            var deductTotal = $('#_deduct_total').data('amount');
            var deductEstimates = $('#_deduct_estimates').data('amount');

            // (공제 예상 금액 백분율/100)
            var val = deductEstimates/deductTotal;
            val = Number(val.toFixed(2));
            // 나머지
            var remains = Number((1 - val).toFixed(2));

            // 라이브러리에서 1 인식 못함
            if(val === 1) val = 0.9999;
            if(remains === 1) remains = 0.9999;

            var donut = document.getElementById('donut');
            var donutSize = $(donut).width();

            var myChart = new DonutChart(donut, {
                stroke: 4,
                scale: 100,
                r: (donutSize / 2), // radius
                items: [{ value: remains }, { value: val }]
            });
        }
    };

    return {
        donutOpen : donutOpen,
        init : init,
    }
})();
$(function () {
    front.chart.init();
});

