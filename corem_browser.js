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
    var xScale, yScale, xAxis, yAxis;

    function drawAxes(chart, options, domain) {
        xScale = d3.scaleLinear().domain([domain.minx - 1, domain.maxx + 1]).range([0, options.width]);
        yScale = d3.scaleLinear().domain([domain.miny, domain.maxy + 1]).range([options.height, 0]);
        xAxis = d3.axisBottom(xScale).ticks(10);
        yAxis = d3.axisRight(yScale).ticks(5);

        chart.append("g").attr("class", "axis").call(xAxis);
        chart.append("g").attr("class", "axis").call(yAxis);

        chart.append("text")
            .attr("class", "axis-label")
            .attr("x", -150).attr("y", 635)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .attr("dy", ".1em")
            .text("GRE count");
    }

    function drawCurve(chart, options, data, color) {
        var line = d3.line()
            .x(function(d) { return xScale(d.pos); })
            .y(function(d) { return yScale(d.count); });

        chart.append("path").datum(data).attr("class", "line").attr("d", line)
            .style('stroke', color);
    }

    function find_domain(data, initDomain) {
        for (var i in data) {
            var d = data[i];
            if (d.pos > initDomain.maxx) initDomain.maxx = d.pos;
            if (d.pos < initDomain.minx) initDomain.minx = d.pos;
            if (d.count > initDomain.maxy) initDomain.maxy = d.count;
        }
        return initDomain;
    }

    corem_browser.init = function(selector, options) {
        var chart = d3.select(selector).attr('width', options.width)
            .attr('height', options.height);
        $.get('http://localhost:5000/api/v1.0.0/gene_gres/Rv0116c', null,
              function (data, status, jqxhr) {
                  var gene = data.gene;
                  var gres = Object.keys(data.gres);

                  // initialize domain
                  var domain = {
                      'minx': 1000000, 'maxx': 0,
                      'miny': 0, 'maxy': 0
                  };
                  var colors = ['red', 'green', 'blue'];

                  for (var i in gres) {
                      var gredata = data.gres[gres[i]];
                      domain = find_domain(gredata, domain);
                  }
                  drawAxes(chart, options, domain);

                  for (var i in gres) {
                      var gredata = data.gres[gres[i]];
                      drawCurve(chart, options, gredata, colors[i % colors.length]);
                  }
              }, "json");
    };
}());
