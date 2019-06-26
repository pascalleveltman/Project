function line_chart(data_all, country){

  // select data and make empty lists
  var data = data_all[0];
  var APR_list = [];
  var EFP_list = [];

  // save plot values to lists
  for (var i = 2005; i <= 2016; i++) {
    for (var j = 0; j < data[String(i)].length; j++) {
      if (data[String(i)][j]["Country"] == country) {
        APR_list.push(data[String(i)][j]["APR"]);
        EFP_list.push(data[String(i)][j]["EFP"]);
      }
    }
  }

  // set sizes and margins of line chart
  var total_width = 600;
  var total_height = 600;
  var margin = {top: 100, right: 60, bottom: 120, left: 60}
  var width = total_width - margin.left - margin.right;
  var height = total_height - margin.top - margin.bottom;

  // add the svg element
  var svg = d3.select("#linechart")
    .append("svg")
      .attr("height", total_height)
      .attr("width", total_width)
      .attr("id", "line_chart")
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // set the scale for the x axis
  var x_sc_APR = d3.scaleLinear()
    .domain(["2005", "2016"])
    .range([0, width])
    .nice();

  // set the scale for the left y axis
  var y_sc_APR = d3.scaleLinear()
    .domain([Math.min(...APR_list) - 0.5, Math.max(...APR_list)])
    .range([height, 0])
    .nice();

  // set the EFP scale for the right y axis
  var y_sc_EFP = d3.scaleLinear()
    .domain([Math.min(...EFP_list) - 3, Math.max(...EFP_list)])
    .range([height, 0])
    .nice();

  // set the line generator for APR
  var APR_red = d3.schemeReds[9]
  var line_APR = d3.line()
    .x(function(d, i) {
      return x_sc_APR(2005 + i);
    })
    .y(function(d) {
      return y_sc_APR(parseFloat(d));
    })
    .curve(d3.curveMonotoneX);

  // set the line generator for EFP
  var EFP_green = d3.schemeGreens[9]
  var line_EFP = d3.line()
    .x(function(d, i) {
      return x_sc_APR(2005 + i);
    })
    .y(function(d) {
      return y_sc_EFP(parseFloat(d))
    })
    .curve(d3.curveMonotoneX);

  // draw the APR line
  svg.append("path")
      .attr("class", "APR_line")
    .datum(APR_list)
      .attr("d", line_APR)
      .style("fill", "none")
      .style("stroke", APR_red[3])
      .style("stroke-width", 2);

  // draw the dots in the line of APR
  svg.selectAll(".dot")
    .data(APR_list)
      .enter()
    .append("circle")
      .attr("class", "APR_dot")
      .attr("cx", function(d, i) {
        return x_sc_APR(2005 + i)
      })
      .attr("cy", function(d) {
        return y_sc_APR(parseFloat(d))
      })
      .attr("r", 3)
      .attr("fill", APR_red[3]);

  // draw the EFP line
  svg.append("path")
      .attr("class", "EFP_line")
    .datum(EFP_list)
    .attr("d", line_EFP)
    .style("fill", "none")
    .style("stroke", EFP_green[3])
    .style("stroke-width", 3);

  // draw the dots in the line of EFP
  svg.selectAll(".dot")
    .data(EFP_list)
      .enter()
    .append("circle")
    .attr("class", "EFP_dot")
      .attr("cx", function(d, i) {
        return x_sc_APR(2005 + i)
      })
      .attr("cy", function(d) {
        return y_sc_EFP(parseFloat(d))
      })
      .attr("r", 3)
      .attr("fill", EFP_green[3]);

  // title for the chart
  svg.append("text")
    .attr("transform", "translate(" + (total_width/2 - margin.left) + "," + (-60) + ")")
    .attr("font-family", "Arial")
    .style("text-anchor", "middle")
    .attr("font-size", 18)
    .text("Ecological Footprint and Flights over time");

  // title with the name of the country with is plotted
  svg.append("text")
    .attr("transform", "translate(" + (total_width/2 - margin.left) + "," + (- 25) + ")")
    .attr("font-family", "Arial")
    .attr("font-weight", "bold")
    .attr("class", "line_country")
    .style("text-anchor", "middle")
    .attr("font-size", 16)
    .text(country);

  // text for the x axis
  svg.append("text")
    .attr("transform", "translate(" + (total_width/2 - margin.left) + "," + (height + margin.bottom/2) + ")")
    .attr("font-family", "Arial")
    .style("text-anchor", "middle")
    .attr("font-size", 16)
    .text("Years");

  // text for the left y axis, APR
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", - height/2 )
    .attr("y", - 40)
    .attr("font-family", "Arial")
    .style("text-anchor", "middle")
    .attr("font-size", 16)
    .text("Flights (per habitant)");

  // text for the right y axis, EFP
  svg.append("text")
    .attr("transform", "rotate(90)")
    .attr("x", height/2 )
    .attr("y", - width - margin.left/2 - 10)
    .attr("font-family", "Arial")
    .style("text-anchor", "middle")
    .attr("font-size", 16)
    .text("Ecological footprint");

  // draw x axis
  var x_axis = d3.axisBottom(x_sc_APR)
    .tickFormat(d3.format("d"))
    .ticks(10);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "line_x")
    .call(x_axis);

  // draw left APR axis
  var y_axis_l = d3.axisLeft(y_sc_APR)
  svg.append("g")
    .call(y_axis_l)
    .attr("class", "line_y_l")
    .style("fill", APR_red[3]);

  // draw right EFP axis
  var y_axis_r = d3.axisRight(y_sc_EFP)
  svg.append("g")
    .attr("transform", "translate(" + width + ",0)")
    .attr("class", "line_y_r")
    .call(y_axis_r)
    .style("fill", EFP_green[3]);

}

function line_chart_update(data_all, country){

  // select data and make empty lists
  var data = data_all[0];
  var APR_list = [];
  var EFP_list = [];

  // save values of plot data to lists
  for (var i = 2005; i <= 2016; i++) {
    for (var j = 0; j < data[String(i)].length; j++) {
      if (data[String(i)][j]["Country"] == country) {
        APR_list.push(data[String(i)][j]["APR"]);
        EFP_list.push(data[String(i)][j]["EFP"]);
      }
    }
  }

  // set sizes and margins of line chart
  var total_width = 600;
  var total_height = 600;
  var margin = {top: 100, right: 60, bottom: 120, left: 60}
  var width = total_width - margin.left - margin.right;
  var height = total_height - margin.top - margin.bottom;

  // add the svg element
  var svg = d3.select("#line_chart");

  // et the scale for the x axis
  var x_sc_APR = d3.scaleLinear()
    .domain([2005, 2016])
    .range([0, width])
    .nice();

  // set the APR scale for the axis
  var y_sc_APR = d3.scaleLinear()
    .domain([Math.min(...APR_list) - 0.5, Math.max(...APR_list)])
    .range([height, 0])
    .nice();
  var y_axis_l = d3.axisLeft(y_sc_APR);
  svg.selectAll(".line_y_l")
    .transition()
    .duration(1000)
    .call(y_axis_l);

  // set the EFP scale for the axis
  var y_sc_EFP = d3.scaleLinear()
    .domain([Math.min(...EFP_list) - 3, Math.max(...EFP_list)])
    .range([height, 0])
    .nice();
  var y_axis_r = d3.axisRight(y_sc_EFP);
  svg.selectAll(".line_y_r")
    .transition()
    .duration(1000)
    .call(y_axis_r);

  // set the line generator for APR
  var APR_red = d3.schemeReds[9]
  var line_APR = d3.line()
    .x(function(d, i) {
      return x_sc_APR(2005 + i);
    })
    .y(function(d) {
      return y_sc_APR(parseFloat(d));
    })
    .curve(d3.curveMonotoneX);

  // set the line generator for EFP
  var EFP_green = d3.schemeGreens[9]
  var line_EFP = d3.line()
    .x(function(d, i) {
      return x_sc_APR(2005 + i);
    })
    .y(function(d) {
      return y_sc_EFP(parseFloat(d))
    })
    .curve(d3.curveMonotoneX);

  // select svg elements
  var up_APR = svg.select(".APR_line")
    .datum(APR_list);
  var up_APR_d = svg.selectAll(".APR_dot")
    .data(APR_list)
  var up_EFP = svg.selectAll(".EFP_line")
    .datum(EFP_list)
  var up_EFP_d = svg.selectAll(".EFP_dot")
    .data(EFP_list)

  // draw the APR line
  up_APR
    .attr("class", "APR_line")
    .transition()
    .duration(1000)
    .attr("d", line_APR)
    .style("fill", "none")
    .style("stroke", APR_red[3])
    .style("stroke-width", 2);

  // draw the dots in the line of APR
  up_APR_d
    .transition()
    .duration(1000)
    .attr("class", "APR_dot")
    .attr("cx", function(d, i) {
      return x_sc_APR(2005 + i)
    })
    .attr("cy", function(d) {
      return y_sc_APR(parseFloat(d))
    })

  // draw the EFP line
  up_EFP
    .attr("class", "EFP_line")
    .transition()
    .duration(1000)
    .attr("d", line_EFP)
    .style("fill", "none")
    .style("stroke", EFP_green[3])
    .style("stroke-width", 3);

  // draw the dots in the line of APR
  up_EFP_d
    .transition()
    .duration(1000)
    .attr("class", "EFP_dot")
    .attr("cx", function(d, i) {
      return x_sc_APR(2005 + i);
    })
    .attr("cy", function(d) {
      return y_sc_EFP(parseFloat(d));
    });

  // title with the name of the country with is plotted
  svg.select(".line_country").text(country);

}
