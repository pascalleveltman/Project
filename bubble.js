// Pascalle Veltman, 11025646

window.onload = function () {

  // import json data files
  var requests = [d3.json("/data/Data_Project.json")];

  // call plot function with given data file
  Promise.all(requests).then(function(response) {

      legend();
      slider(response[0]);
      bubble(response[0], "2005", 0);
      line_chart(response[0], "Belgium", 0);
      scatter_plot(response[0], 0);
      // scatter_plot(response[0], "2005", $('#x-value').val(), $('#y-value').val());

      d3.select("button")
        .on("click", function(d){
          scatter_plot(response[0], 1)
        })
  });

};

function slider(data){

  // make selection of years from data
  var years = d3.range(0, 12).map(function(d) {
      return new Date(2005 + d, 10, 3);
  });

  // set the size of the slider
  var width = 700;
  var height = 80;

  // set slider
  var time_slider = d3.sliderBottom()
       .min(d3.min(years))
       .max(d3.max(years))
       .step(1000 * 60 * 60 * 24 * 365)
       .width(500)
       .tickFormat(d3.timeFormat('%Y'))
       .tickValues(years)
       .default(new Date(2000, 10, 3))
       .on('onchange', val => {
           d3.select('p#value-time').text(d3.timeFormat('%Y')(val));

           bubble(data, val.getFullYear(), 1);
           scatter_plot(data, 1);

       });

  // append slider to svg
  var g = d3.select("#slider")
    .append("svg")
      .attr("height", height)
      .attr("width", width)
    .append("g")
      .attr('transform', 'translate(80,20)');

  // call slider
  g.call(time_slider);
  d3.select('p#value-time').text(d3.timeFormat('%Y')(time_slider.value()));

}

function bubble(data, year, gone){

  // check if there is a chart that has to be removed
  if (gone == 1){
    d3.select("#bubble_chart").remove();
  }

  // select the right data by its year
  year_data = data[0][String(year)]

  // set the diameter of the chart
  var diameter = 700;

  // add chart in the right size
  var svg = d3.select("#chart")
    .append("svg")
        .attr("height", diameter)
        .attr("width", diameter)
        .attr("id", "bubble_chart")
      .append("g")
        .attr("transform", "translate(50,0)")

  // position the bubbles
  var simulation = d3.forceSimulation()
    .force("x", d3.forceX(diameter / 2).strength(0.05))
    .force("y", d3.forceY(diameter / 2).strength(0.05))
    .force("collide", d3.forceCollide(function(d){
      return radius_scale(d.APR) + 2;
    }));

  // set the size of the bubbles
  var radius_scale = d3.scaleSqrt().domain(
      [d3.min(year_data, function(d) {
          return d.APR;
       }),
       d3.max(year_data, function(d) {
          return d.APR;
       })])
       .range([10, 80]);

  // create a function to scale the colors
  var color_scale = d3.scaleLinear().domain(
    [d3.min(year_data, function(d) {
        return d.EFP;
     }),
     d3.max(year_data, function(d) {
        return d.EFP;
     })])
     .range([0, 8]);

  // set color of north, east, south or west european country
  function set_color(value, region, mouse){
    if (region == "N"){
      var color_array = d3.schemeBlues[9];
    }
    else if (region == "E"){
      var color_array = d3.schemePurples[9];
    }
    else if (region == "S"){
      var color_array = d3.schemeReds[9];
    }
    else if (region == "W"){
      var color_array = d3.schemeGreens[9];
    }
    var color_index = Math.round(color_scale(value));
    if (mouse == 1){
      color_index = color_index + 2;
    }
    var color_bubble = color_array[color_index]
    return color_bubble
  }

  var group_data = [year_data, data];

  // create the bubbles
  var circles = svg.selectAll(".bubble")
    .data(year_data)
    .enter()
    .append("circle")
      .attr("r", function(d){
        return radius_scale(d.APR)
      })
      .attr("fill", function(d){
        return set_color(d.EFP, d.REG, 0)
      })
      .on("mouseover", function(d, i) {

        tooltip.style("display", null);

        d3.select(this)
          .attr("stroke", function(d){
            return set_color(d.EFP, d.REG, 1)
          })
			     .attr("stroke-width", 2 )
           .attr("r", function(d){
             return radius_scale(d.APR)
      })})
      .on("mousemove", function(d){
        var x_pos = d3.mouse(this)[0] - 15
        var y_pos = d3.mouse(this)[1] - 25
        tooltip.attr("transform", "translate(" + x_pos + "," + y_pos + ")")
        tooltip.select("text").text(d.Country)
      })
      .on("mouseout", function(d, i) {

        tooltip.style("display", "none");

        d3.select(this).attr("stroke", "none")
           .attr("r", function(d){
             return radius_scale(d.APR)
           })
         })
       .on("click", function(d) {
         line_chart(data, d.Country, 1);
       });

  simulation.nodes(year_data)
    .on('tick', ticked)

  function ticked() {
    circles
      .attr("cx", function(d){
        return d.x
      })
      .attr("cy", function(d){
        return d.y
      })
  }

  // add a tooltip
  var tooltip = svg.append("g")
      .attr("class", "tooltip")

  tooltip.append("text")
    // .attr("class", "tooltiptext")
}

function legend(){

  // set sizes of legend
  var height = 100;
  var width = 600;

  var regions = ["North Europe", "East Europe", "South Europe", "West Europe"];
  var colors = [d3.schemeBlues[9], d3.schemePurples[9], d3.schemeReds[9], d3.schemeGreens[9]];

  // add chart in the right size
  var svg = d3.select("#legend")
    .append("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("id", "bubble_chart")
    .append("g")
        .attr('transform', 'translate(0,0)')

  for (i in [8, 7, 6, 5, 4, 3, 2, 1, 0]){
    svg.selectAll("my_bars")
      .data(colors)
        .enter()
      .append("rect")
        .attr("x", function(d){
          return (i-8) * - 20
        })
        .attr("y", function(d){
          return colors.indexOf(d) * 20;
        })
        .attr("width", function(d){
          return 20;
        })
        .attr("height", 10)
        .attr("fill", function(d){
          return d[i];
        })
  }

  svg.selectAll("my_labels")
    .data(regions)
      .enter()
    .append("text")
      .attr("x", 180)
      .attr("y", function(d){
        return 10 + regions.indexOf(d) * 20;
      })
      .attr("width", 20)
      .attr("height", 20)
      // .attr("fill", function(d){
      //   return colors[regions.indexOf(d)][4];
      // })
      .attr("font-family", "Arial")
      .attr("font-size", 12)
      .text(function(d){
        return d
      });

}

function line_chart(data_all, country, gone){

  // check if there is a chart that has to be removed
  if (gone == 1){
    d3.select("#line_chart").remove();
  }

  // select data  and make empty lists
  var data = data_all[0];
  var years_list = [];
  var APR_list = [];
  var EFP_list = [];

  // fill lists with right country data to use
  for (var i = 2005; i <= 2016; i++) {
       years_list.push(i);
  }
  for (var i = 2005; i <= 2016; i++) {
    for (var j = 0; j < data[String(i)].length; j++) {
      if (data[String(i)][j]["Country"] == country) {
        APR_list.push(data[String(i)][j]["APR"]);
        EFP_list.push(data[String(i)][j]["EFP"])
      }
    }
  }

  // set sizes and margins of line chart
  var total_width = 650;
  var total_height = 500;
  var margin = {top: 80, right: 100, bottom: 80, left: 100}
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

  // set the APR scale for the axis
  var x_sc_APR = d3.scaleLinear()
      .domain([2005, 2016])
      .range([0, width])
      .nice();
  var y_sc_APR = d3.scaleLinear()
       .domain([Math.min(...APR_list) - 0.5, Math.max(...APR_list)])
       .range([height, 0])
       .nice();

  // set the EFP scale for the axis
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
      .curve(d3.curveMonotoneX)

  // set the line generator for EFP
  var EFP_green = d3.schemeGreens[9]
  var line_EFP = d3.line()
      .x(function(d, i) {
        return x_sc_APR(2005 + i);
      })
      .y(function(d) {
        return y_sc_EFP(parseFloat(d));
      })
      .curve(d3.curveMonotoneX)

  // draw the APR line and dots
  svg.append("path")
    .datum(APR_list)
    .attr("d", line_APR)
    .style("fill", "none")
    .style("stroke", APR_red[3])
    .style("stroke-width", 2);

  svg.selectAll(".dot")
    .data(APR_list)
    .enter()
    .append("circle") // Uses the enter().append() method
      .attr("cx", function(d, i) {
        return x_sc_APR(2005 + i)
      })
      .attr("cy", function(d) {
        return y_sc_APR(parseFloat(d))
      })
      .attr("r", 3)
      .attr("fill", APR_red[3])

  // draw the EFP line and dots
  svg.append("path")
    .datum(EFP_list)
    .attr("d", line_EFP)
    .style("fill", "none")
    .style("stroke", EFP_green[3])
    .style("stroke-width", 3);

  svg.selectAll(".dot")
    .data(EFP_list)
    .enter()
    .append("circle") // Uses the enter().append() method
      .attr("cx", function(d, i) {
        return x_sc_APR(2005 + i)
      })
      .attr("cy", function(d) {
        return y_sc_EFP(parseFloat(d))
      })
      .attr("r", 3)
      .attr("fill", EFP_green[3])

  // text for the x axis
  svg.append("text")
    .attr("transform", "translate(" + (total_width/2 - margin.left) + "," + (height + margin.bottom/2) + ")")
    .attr("font-family", "Arial")
    .style("text-anchor", "middle")
    .attr("font-size", 14)
    .text("Years");

  // text for the y axis
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", - height/2 )
    .attr("y", - 40)
    .attr("font-family", "Arial")
    .style("text-anchor", "middle")
    .attr("font-size", 14)
    .text("Average flights per habitant");
  // text for the y axis
  svg.append("text")
    .attr("transform", "rotate(90)")
    .attr("x", height/2 )
    .attr("y", - width - margin.left/2)
    .attr("font-family", "Arial")
    .style("text-anchor", "middle")
    .attr("font-size", 14)
    .text("Ecological footprint");

  // draw x axis
  var x_axis = d3.axisBottom(x_sc_APR)
    .ticks(10);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(x_axis);
  // draw left APR axis
  var y_axis_l = d3.axisLeft(y_sc_APR)
  svg.append("g")
      .call(y_axis_l)
      .style("fill", APR_red[3]);
  // draw right EFP axis
  var y_axis_r = d3.axisRight(y_sc_EFP)
  svg.append("g")
      .attr("transform", "translate(" + width + ",0)")
      .call(y_axis_r)
      .style("fill", EFP_green[3]);

}

function scatter_plot(data, gone){

  // select plot data
  var x_var = "EFP";
  var y_var = "APR";
  var year = "2005";

  // check if there is a chart that has to be removed
  if (gone == 1){
    d3.select("#scatter_plot").remove();
    x_var = $('#x-value').val();
    y_var = $('#y-value').val();
    year = $('.slider .parameter-value text').html();
    console.log(x_var, y_var, year)
  }

  // select the right data by its year
  var year_data = data[0][String(year)];

  // set sizes and margins of line chart
  var total_width = 650;
  var total_height = 500;
  var margin = {top: 80, right: 100, bottom: 80, left: 100}
  var width = total_width - margin.left - margin.right;
  var height = total_height - margin.top - margin.bottom;

  // add chart in the right size
  var svg = d3.select("#scatterplot")
    .append("svg")
        .attr("height", total_height)
        .attr("width", total_width)
        .attr("id", "scatter_plot")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // set the scale for the x axis and y axis
  var x_scale = d3.scaleLinear()
      .domain([d3.min(year_data, function(d) {
          return d[x_var];
       }),
       d3.max(year_data, function(d) {
          return d[x_var];
       })])
      .range([0, width])
      .nice();

  var y_scale = d3.scaleLinear()
      .domain([d3.min(year_data, function(d) {
          return d[y_var];
       }),
       d3.max(year_data, function(d) {
          return d[y_var];
       })])
      .range([height, 0])
      .nice();

  // set color of north, east, south or west european country
  function set_color(region, mouse){
    color_index = 4
    if (mouse == 1){
      color_index = color_index + 2;
    }

    if (region == "N"){
      return d3.schemeBlues[9][color_index];
    }
    else if (region == "E"){
      return d3.schemePurples[9][color_index];
    }
    else if (region == "S"){
      return d3.schemeReds[9][color_index];
    }
    else if (region == "W"){
      return d3.schemeGreens[9][color_index];
    }
  }

  // add dots
  svg.selectAll(".dot")
   .data(year_data)
   .enter()
   .append("circle")
     .attr("cx", function(d) {
       return x_scale(d[x_var])
     })
     .attr("cy", function(d) {
       return y_scale(d[y_var])
     })
     .attr("r", 5)
     .attr("fill", function(d){
       return set_color(d["REG"], 0)
     })
     .on("mouseover", function(d, i) {

       tooltip.style("display", null);

       d3.select(this)
         .attr("stroke", function(d){
           return set_color(d["REG"], 1)
         })
          .attr("stroke-width", 2 )
          .attr("r", 6)})
     .on("mousemove", function(d){
       var x_pos = d3.mouse(this)[0] - 15
       var y_pos = d3.mouse(this)[1] - 15
       tooltip.attr("transform", "translate(" + x_pos + "," + y_pos + ")")
       tooltip.select("text").text(d.Country)
     })
     .on("mouseout", function(d, i) {

       tooltip.style("display", "none");

       d3.select(this).attr("stroke", "none")
          .attr("r", 5)
        })
      .on("click", function(d) {
        line_chart(data, d.Country, 1);
      });

   // draw x axis
   var x_axis = d3.axisBottom(x_scale)
    .ticks(10);
   svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(x_axis);
   // draw y axis
   var y_axis = d3.axisLeft(y_scale)
    .ticks(5);
   svg.append("g")
       .call(y_axis)

   function title(afk){
     if (afk == "APR"){
       return "Average Flights per Habitant";
     }
     else if (afk == "EFP"){
       return "Ecological Footprint";
     }
     else if (afk == "RPR"){
       return "Average Train Rides per Habitant";
     }
     else if (afk == "EEX"){
       return "Government Environmental Expenditure";
     }
   }

   // text for the x axis
   svg.append("text")
     .attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom/2) + ")")
     .attr("font-family", "Arial")
     .style("text-anchor", "middle")
     .attr("font-size", 14)
     .text(title(x_var));
   // text for the y axis
   svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("x", - height/2)
     .attr("y", - 40)
     .attr("font-family", "Arial")
     .attr("font-size", 14)
     .style("text-anchor", "middle")
     .text(title(y_var));

   // add a tooltip
   var tooltip = svg.append("g")

   tooltip.append("text")
      .style("class", "tooltip")

}
