var corem_browser = {};

(function () {
    var MIN_X = 0;
    var MAX_X = 580;
    var MIN_Y = 0;
    var MAX_Y = 200;

    var MARGIN_LEFT = 20;
    var MARGIN_RIGHT = 20;
    var MARGIN_BOTTOM = 20;
    var MARGIN_TOP = 20;

    function drawAxes(chart, options) {
        var hScale = d3.scaleLinear().domain([MIN_X, MAX_X]).range([MIN_X, MAX_X]);
        var vScale = d3.scaleLinear().domain([MIN_Y, MAX_Y]).range([MAX_Y, MIN_Y]);
        var xAxis = d3.axisBottom(hScale).ticks(10);
        var yAxis = d3.axisRight(vScale).ticks(10);
        chart.append("g").attr("class", "axis")
            .attr("transform", "translate(" + MARGIN_LEFT + "," + (options.height - MARGIN_BOTTOM) + ")")
            .call(xAxis);
        chart.append("g").attr("class", "axis")
            .attr("transform", "translate(" + (options.width - (options.width - MAX_X) + MARGIN_LEFT - 40) + "," + (170) + ")")
            .call(yAxis);
        chart.append("text")
            .attr("class", "axis-label")
            .attr("x", -250).attr("y", 600)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .attr("dy", ".1em")
            .text("GRE count");
    }

    corem_browser.init = function(selector, options) {
        var chart = d3.select(selector).attr('width', options.width)
            .attr('height', options.height);
        drawAxes(chart, options);

        var data = [{x: 10, y: 200}, {x: 60, y: 220}, {x: 80, y: 180}];
        var line = d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; });
        chart.append("path").datum(data).attr("class", "line").attr("d", line);
        var path = d3.path();
    };
}());
