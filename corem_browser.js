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

    // module global chart scale, we might want to switch to an instance
    var xScale = d3.scaleLinear().domain([MIN_X, MAX_X]).range([MIN_X, MAX_X]);
    var yScale = d3.scaleLinear().domain([MIN_Y, MAX_Y]).range([MAX_Y, MIN_Y]);
    var xAxis = d3.axisBottom(xScale).ticks(10);
    var yAxis = d3.axisRight(yScale).ticks(10);

    // just for prototyping
    var GRE_COUNTS = [{x: 10, y: 0}, {x: 20, y: 30}, {x: 30, y: 50}, {x: 40, y: 70}, {x: 50, y: 0}];

    function baseline(options) { return options.height - MAX_Y - 20; }
    function yAxisX(options) { return (options.width - (options.width - MAX_X) + MARGIN_LEFT); }

    function drawAxes(chart, options) {

        chart.append("g").attr("class", "axis")
            //.attr("transform", "translate(" + MARGIN_LEFT + "," + (options.height - MARGIN_BOTTOM) + ")")
            .call(xAxis);
        chart.append("g").attr("class", "axis")
            //.attr("transform", "translate(" + yAxisX(options) + "," + baseline(options) + ")")
            .call(yAxis);

        chart.append("text")
            .attr("class", "axis-label")
            .attr("x", -150).attr("y", 635)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .attr("dy", ".1em")
            .text("GRE count");
    }

    function drawCurves(chart, options) {
        var data = GRE_COUNTS;
        var line = d3.line()
            .x(function(d) { return xScale(d.x); })
            .y(function(d) { return yScale(d.y); })
            .curve(d3.curveCardinal);

        chart.append("path").datum(data).attr("class", "line").attr("d", line)
            //.attr('transform', "translate(" + MARGIN_LEFT + "," + baseline(options) + ")")
            .style('stroke', 'red');
    }

    corem_browser.init = function(selector, options) {
        var chart = d3.select(selector).attr('width', options.width)
            .attr('height', options.height);
        drawAxes(chart, options);
        drawCurves(chart, options);
    };
}());
