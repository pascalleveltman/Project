window.onload = function () {

  // import json data files
  var requests = [d3.json("../data/Data_Project.json")];

  // when loaded, plot all figures with start values
  Promise.all(requests).then(function(response) {

    // make the time slider
    slider(response[0]);

    // make the bubble chart with the start values and its legends
    for (i = 2016; i > 2004; i --){
      d3.select("#bubble_chart").remove();
      bubble(response[0], String(i), 0);
    }
    legend1();
    legend2();

    // make the line chart with the start values
    line_chart1(response[0], "Belgium", 0);

    // make the scatter plot with the start values
    scatter_plot(response[0], 0);

    // define what to do when the button is clicked
    d3.select("button")
      .on("click", function(d){
        scatter_plot_update(response[0], 1)
      });

  });

};

function bubble(data, year, gone){

  // select the right data by its year
  year_data = data[0][String(year)]

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
    var color_bubble = color_array[color_index];
    return color_bubble;
  }

  // check if there is a chart that has to be removed
  if (gone == 0){

    // set the diameter of the chart
    var diameter = 700;

    // add chart in the right size
    var svg = d3.select("#chart")
      .append("svg")
        .attr("height", diameter)
        .attr("width", diameter)
        .attr("id", "bubble_chart")
      .append("g")
        .attr("transform", "translate(0,0)");

    // position the bubbles
    var simulation = d3.forceSimulation()
      .force("x", d3.forceX(diameter / 2).strength(0.05))
      .force("y", d3.forceY(diameter / 2).strength(0.05))
      .force("collide", d3.forceCollide(function(d){
        return radius_scale(d.APR) + 2;
      }));

    // create the bubbles
    var circles = svg.selectAll(".bubble")
      .data(year_data)
        .enter()
      .append("circle")
        .attr("class", "bubblepoint")
        .attr("r", function(d){
          return radius_scale(d.APR);
        })
        .attr("fill", function(d){
          return set_color(d.EFP, d.REG, 0);
        })
      .on("mouseover", function(d, i) {
        tooltip.style("display", null);
        d3.select(this)
          .attr("stroke", function(d){
            return set_color(d.EFP, d.REG, 1);
          })
          .attr("stroke-width", 2 )
          .attr("r", function(d){
            return radius_scale(d.APR);
          })
      })
      .on("mousemove", function(d){
        var x_pos = d3.mouse(this)[0] + 10;
        var y_pos = d3.mouse(this)[1] - 80;
        var html = ("<span>" + d.Country + "<br> Flights: " +  d.APR + "<br> Footprint: " + d.EFP + "</span>")
        tooltip.attr("transform", "translate(" + x_pos + "," + y_pos + ")")
          .attr("color", "black");
        tooltip.html(html)
          .style("position", "relative")
          .style("background-color", "#E7F4F5");
        })
      .on("mouseout", function(d, i) {
        tooltip.style("display", "none");
        d3.select(this).attr("stroke", "none")
          .attr("r", function(d){
            return radius_scale(d.APR);
          })
      })
      .on("click", function(d) {
        line_chart_update(data, d.Country, 1);
      });

    simulation.nodes(year_data)
      .on('tick', ticked);

    function ticked() {
      circles
        .attr("cx", function(d){
          return d.x;
        })
        .attr("cy", function(d){
          return d.y;
        })
    }

    // add a tooltip
    var tooltip = svg.append("foreignObject")
    .attr("width", 150)
    .attr("height", 80)

    // title for the plot
    svg.append("text")
      .attr("transform", "translate(" + 350 + "," + 25 + ")")
      .attr("font-family", "Arial")
      .style("text-anchor", "middle")
      .attr("font-size", 22)
      .text("Air Transport and Footprint of European Countries");

  }

  else if (gone == 1){

    // set the diameter of the chart
    var diameter = 700;

    // position the bubble force
    var simulation = d3.forceSimulation()
      .force("x", d3.forceX(diameter / 2).strength(0.05))
      .force("y", d3.forceY(diameter / 2).strength(0.05))
      .force("collide", d3.forceCollide(function(d){
        console.log("still moving!")
        return radius_scale(d.APR) + 2;
      }));

    // select the bubbles who need a transition
    circle = d3.selectAll(".bubblepoint").data(year_data);

    // transition the bubbles
    circle.transition().duration(500)
        .attr("r", function(d){
          return radius_scale(d.APR)
        })
        .attr("fill", function(d){
          return set_color(d.EFP, d.REG, 0)
        })

    circle
        .on("mouseover", function(d, i) {
          tooltip.style("display", null);
          d3.select(this)
            .attr("stroke", function(d){
              return set_color(d.EFP, d.REG, 1);
            })
            .attr("stroke-width", 2 )
            .attr("r", function(d){
              return radius_scale(d.APR);
            })
        })
        .on("mousemove", function(d){
          var x_pos = d3.mouse(this)[0] + 10;
          var y_pos = d3.mouse(this)[1] - 80;
          var html = ("<span> " + d.Country + "<br> Flights: " +  d.APR + "<br> Footprint: " + d.EFP + "</span>")
          tooltip.attr("transform", "translate(" + x_pos + "," + y_pos + ")");
          tooltip.html(html)
            .style("background-color", "#E7F4F5");
          })
        .on("mouseout", function(d, i) {
          tooltip.style("display", "none");
          d3.select(this).attr("stroke", "none")
            .attr("r", function(d){
              return radius_scale(d.APR);
            })
        })
        .on("click", function(d) {
          line_chart_update(data, d.Country, 1);
        });

    // add a tooltip
    var tooltip = d3.select("#bubble_chart").append("foreignObject")
      .attr("width", 150)
      .attr("height", 80)

    // define the x and y during simulation
    function ticked() {
      circle
        .attr("cx", function(d, i){
          if(d.x!=0){
              return d.x;
          }
        })
        .attr("cy", function(d, i){
          if(d.y!=0){
              return d.y;
          }
        });
    }

    // call the simulation
    simulation.nodes(year_data)
      .on('tick', ticked);
  }
}

function legend1(){

  // set sizes of legend
  var height = 200;
  var width = 600;

  // define the variables per line
  var regions = ["North Europe", "East Europe", "South Europe", "West Europe"];
  var colors = [d3.schemeBlues[9], d3.schemePurples[9], d3.schemeReds[9], d3.schemeGreens[9]];

  // add chart in the right size
  var svg = d3.select("#legend")
    .append("svg")
      .attr("height", height)
      .attr("width", width)
      .attr("id", "bubble_chart")
    .append("g")
      .attr('transform', 'translate(10,50)');

  // make the lines with colors
  for (i in [0, 1, 2, 3, 4, 5, 6, 7, 8]){

    svg.selectAll("my_bars")
      .data(colors)
        .enter()
      .append("rect")
        .attr("x", function(d){
          return i * 20
        })
        .attr("y", function(d){
          return colors.indexOf(d) * 20;
        })
        .attr("width", function(d){
          return 20;
        })
        .attr("height", 10)
        .attr("fill", function(d){
          return d[i]
        });

  }

  for (i = 0; i <4; i ++){
    svg.append("line")
      .style("stroke", "black")
      .style("stroke-width", 2)
      .attr("x1", function(d){
        return i * 60;
      })
      .attr("y1", 70)
      .attr("x2", function(d){
        return i * 60;
      })
      .attr("y2", 80);

    svg.append("text")
      .text(function(d){
        return i*3;
      })
      .attr("y", 90)
      .attr("x", function(d){
        return i * 60 - 2;
      })
      .attr("font-size", 10)
  }

  svg.append("text")
    .attr("x", 0)
    .attr("y", -20)
    .attr("font-size", 16)
    .text("Ecological footprint");

  // add labels
  svg.selectAll("my_labels")
    .data(regions)
      .enter()
    .append("text")
      .attr("x", 185)
      .attr("y", function(d){
        return 10 + regions.indexOf(d) * 20;
      })
      .attr("width", 20)
      .attr("height", 20)
      .attr("font-family", "Arial")
      .attr("font-size", 12)
      .text(function(d){
        return d
      });

}

function legend2(){

  // append the svg object to the body of the page
  var height = 440;
  var width = 400;

  // create the svg
  var svg = d3.select("#legend2")
    .append("svg")
      .attr("width", width)
      .attr("height", height);

  // define the scale you use for bubble size
  var size = d3.scaleSqrt()
    .domain([0, 3])
    .range([1, 80]);

  // set places
  var values_shown = [1, 2, 3];
  var x_circle = 100;
  var x_label = 200;
  var y_circle = 200;

  svg.append("text")
    .attr("x", 10)
    .attr("y", 20)
    .attr("font-size", 16)
    .text("Flights per Habitant");

  // make the circles
  svg.selectAll("legend")
    .data(values_shown)
      .enter()
    .append("circle")
      .attr("cx", x_circle)
      .attr("cy", function(d){ return y_circle - size(d) } )
      .attr("r", function(d){ return size(d) })
      .style("fill", "none")
      .attr("stroke", "black");

  // add segments
  svg.selectAll("legend")
    .data(values_shown)
      .enter()
    .append("line")
      .attr('x1', function(d){ return x_circle + size(d) } )
      .attr('x2', x_label)
      .attr('y1', function(d){ return y_circle - size(d) } )
      .attr('y2', function(d){ return y_circle - size(d) } )
      .attr('stroke', 'black')
      .style('stroke-dasharray', ('2,2'));

  // add labels
  svg.selectAll("legend")
    .data(values_shown)
  .enter()
  .append("text")
    .attr('x', x_label)
    .attr('y', function(d){ return y_circle - size(d) } )
    .text( function(d){ return d } )
    .style("font-size", 10)
    .attr('alignment-baseline', 'middle');

}
