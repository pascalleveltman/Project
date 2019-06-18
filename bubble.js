// Pascalle Veltman, 11025646

window.onload = function () {

  // import json data files
  var requests = [d3.json("/data/Data_Project.json")];

  // call plot function with given data file
  Promise.all(requests).then(function(response) {

      legend()
      slider(response[0]);
      bubble(response[0], "2005", 0);

  });

};

function slider(data){

  // make selection of years from data
  var years = d3.range(0, 12).map(function(d) {
      return new Date(2005 + d, 10, 3);
  });

  // set the size of the slider
  var width = 600;
  var height = 100;

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
            var gone = 1
           d3.select('p#value-time').text(d3.timeFormat('%Y')(val));

           console.log(val.getFullYear())
           bubble(data, val.getFullYear(), gone)

       });

  // append slider to svg
  var g = d3.select("#slider")
    .append("svg")
      .attr("height", height)
      .attr("width", width)
    .append("g")
      .attr('transform', 'translate(20,20)');

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
  var diameter = 600;

  // add chart in the right size
  var svg = d3.select("#chart")
    .append("svg")
        .attr("height", diameter)
        .attr("width", diameter)
        .attr("id", "bubble_chart")
      .append("g")

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
      .on("mouseover.increase", function(d, i) {
        d3.select(this)
          .attr("stroke", function(d){
            return set_color(d.EFP, d.REG, 1)
          })
			     .attr("stroke-width", 2 )
           .attr("r", function(d){
             return radius_scale(d.APR)
           })})
      .on("mouseover.tool", show_tooltip)
      .on("mousemove", move_tooltip)
      .on("mouseout.decrease", function(d, i) {
        d3.select(this).attr("stroke", "none")
           .attr("r", function(d){
             return radius_scale(d.APR)
           })
         })
      .on("mouseout.tool", hide_tooltip);

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
  var tooltip = d3.select("chart")
    .append("div")
      .style("opacity", 0)
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

  // move the tooltip
  var show_tooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Country: " + d.Country)
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var move_tooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var hide_tooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }
}

function legend(){

  // set sizes of legend
  var height = 150;
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
        .attr('transform', 'translate(20,20)')

  for (i in [0, 1, 2, 3, 4, 5, 6]){
    svg.selectAll("my_bars")
      .data(colors)
        .enter()
      .append("rect")
        .attr("x", function(d){
          return i * 40
        })
        .attr("y", function(d){
          return colors.indexOf(d) * 30;
        })
        .attr("width", function(d){
          return 40;
        })
        .attr("height", 20)
        .attr("fill", function(d){
          return d[i];
        })
  }

  svg.selectAll("my_labels")
    .data(regions)
      .enter()
    .append("text")
      .attr("x", 280)
      .attr("y", function(d){
        return 16 + regions.indexOf(d) * 30;
      })
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", function(d){
        return colors[regions.indexOf(d)][4];
      })
      .attr("font-family", "Arial")
      .text(function(d){
        return d
      });



}
