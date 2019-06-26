function scatter_plot(data, gone){

  // select plot data
  var x_var = "APR";
  var y_var = "APR";
  var year = "2005";

  // select the right data by its year
  var year_data = data[0][String(year)];

  // Set the new dataset with the right year (make a copy so that it does not delete it in the real dataset)
  var year_data_complete =  year_data.slice();

  // Delete rows with missing value of health variable
  for (d in year_data_complete) {
      if (year_data_complete[d][x_var] == "  " || year_data_complete[d][y_var] == "  "){
        year_data_complete.splice(d, 1);
      }
  };

  // set sizes and margins of line chart
  var total_width = 600;
  var total_height = 600;
  var margin = {top: 100, right: 60, bottom: 120, left: 60}
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
    .domain([d3.min(year_data_complete, function(d) {
        return d[x_var];
     }),
     d3.max(year_data_complete, function(d) {
        return d[x_var];
     })])
    .range([0, width])
    .nice();

  var y_scale = d3.scaleLinear()
    .domain([d3.min(year_data_complete, function(d) {
        return d[y_var];
     }),
     d3.max(year_data_complete, function(d) {
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

  function tooltip_text(afk){
    if (afk == "APR"){
     return "Flights";
    }
    else if (afk == "EFP"){
     return "Footprint";
    }
    else if (afk == "RPR"){
     return "Train Rides";
    }
    else if (afk == "EEX"){
     return "Expenditure";
    }
  }

  // add dots
  svg.selectAll(".dot")
   .data(year_data_complete)
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
     var x_pos = d3.mouse(this)[0] + 20;
     var y_pos = d3.mouse(this)[1] ;
     var html = ("<span> " + d.Country + "<br> " + tooltip_text(x_var) + ": " +  parseFloat(d[x_var]).toFixed(2)+ "<br> " + tooltip_text(y_var) +": " + parseFloat(d[y_var]).toFixed(2) + "</span>")
     tooltip.attr("transform", "translate(" + x_pos + "," + y_pos + ")");
     tooltip.html(html)
      .style("background-color", "#E7F4F5");
   })
   .on("mouseout", function(d, i) {
     tooltip.style("display", "none");
     d3.select(this).attr("stroke", "none")
        .attr("r", 5)
      })
    .on("click", function(d) {
      line_chart_update(data, d.Country, 1);
    });

  // draw x axis
  var x_axis = d3.axisBottom(x_scale)
    .ticks(10);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "x_scat")
    .call(x_axis);

  // draw y axis
  var y_axis = d3.axisLeft(y_scale)
    .ticks(5);

  svg.append("g")
    .attr("class", "y_scat")
    .call(y_axis)

  function title(afk){
    if (afk == "APR"){
     return "Flights (per habitant)";
    }
    else if (afk == "EFP"){
     return "Ecological Footprint";
    }
    else if (afk == "RPR"){
     return "Train Rides (per habitant)";
    }
    else if (afk == "EEX"){
     return "Government Environmental Expenditure";
    }
  }

  // title for the plot
  svg.append("text")
    .attr("transform", "translate(" + (width/2) + "," + -60 + ")")
    .attr("font-family", "Arial")
    .style("text-anchor", "middle")
    .attr("font-size", 18)
    .text("Scatter Plot (select variables above)");

  // title for the selected year
  svg.append("text")
    .attr("transform", "translate(" + (width/2) + "," + -25 + ")")
    .attr("font-family", "Arial")
    .attr("font-weight", 'bold')
    .style("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("class", "year_title")
    .text(year);

  // text for the x axis
  svg.append("text")
    .attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom/2) + ")")
    .attr("font-family", "Arial")
    .style("text-anchor", "middle")
    .attr("font-size", 16)
    .attr("class", "x_title")
    .text(title(x_var));

  // text for the y axis
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", - height/2)
    .attr("y", - 40)
    .attr("font-family", "Arial")
    .attr("font-size", 16)
    .style("text-anchor", "middle")
    .attr("class", "y_title")
    .text(title(y_var));

  // add a tooltip
  var tooltip = d3.select("#scatter_plot").append("foreignObject")
    .attr("width", 150)
    .attr("height", 80)

}

function scatter_plot_update(data, gone){

  x_var = $('#x-value').val();
  y_var = $('#y-value').val();
  year = $('.slider .parameter-value text').html();

  // select the right data by its year
  var year_data = data[0][String(year)];

  // Set the new dataset with the right year (make a copy so that it does not delete it in the real dataset)
  var year_data_complete =  year_data.slice();

  // Delete rows with missing value of health variable
  for (d in year_data_complete) {
      if (year_data_complete[d][x_var] == "  " || year_data_complete[d][y_var] == "  "){
        year_data_complete.splice(d, 1);
      }
  };

  // set sizes and margins of line chart
  var total_width = 600;
  var total_height = 600;
  var margin = {top: 100, right: 60, bottom: 120, left: 60}
  var width = total_width - margin.left - margin.right;
  var height = total_height - margin.top - margin.bottom;

  // set the scale for the x axis and y axis
  var x_scale = d3.scaleLinear()
    .domain([d3.min(year_data_complete, function(d) {
        return d[x_var];
     }),
     d3.max(year_data_complete, function(d) {
        return d[x_var];
     })])
    .range([0, width])
    .nice();

  var y_scale = d3.scaleLinear()
    .domain([d3.min(year_data_complete, function(d) {
        return d[y_var];
     }),
     d3.max(year_data_complete, function(d) {
        return d[y_var];
     })])
    .range([height, 0])
    .nice();

  var svg = d3.select("#scatter_plot");

  // draw x axis
  var x_axis = d3.axisBottom(x_scale)
    .ticks(10);
  svg.selectAll(".x_scat")
    .transition()
    .duration(1000)
    .call(x_axis);

  // draw y axis
  var y_axis = d3.axisLeft(y_scale)
    .ticks(5);
  svg.selectAll(".y_scat")
      .transition()
      .duration(1000)
      .call(y_axis);

  function tooltip_text(afk){
    if (afk == "APR"){
     return "Flights";
    }
    else if (afk == "EFP"){
     return "Footprint";
    }
    else if (afk == "RPR"){
     return "Train Rides";
    }
    else if (afk == "EEX"){
     return "Expenditure";
    }
  }

  svg.selectAll("circle")
    .data(year_data_complete)
    .transition()
    .duration(1000)
    .attr("cx", function(d) {
      return x_scale(d[x_var])
    })
    .attr("cy", function(d) {
      return y_scale(d[y_var])
    })

  svg.selectAll("circle")
  .on("mouseover", function(d, i) {
    tooltip.style("display", null);

    d3.select(this)
      .attr("stroke", function(d){
        return set_color(d["REG"], 1)
      })
       .attr("stroke-width", 2 )
       .attr("r", 6)})
    .on("mousemove", function(d){
      var x_pos = d3.mouse(this)[0] + 20;
      var y_pos = d3.mouse(this)[1] ;
      var html = ("<span> " + d.Country + "<br> " + tooltip_text(x_var) + ": " +  parseFloat(d[x_var]).toFixed(2) + "<br> " + tooltip_text(y_var) +": " + parseFloat(d[y_var]).toFixed(2) + "</span>")
      tooltip.attr("transform", "translate(" + x_pos + "," + y_pos + ")");
      tooltip.html(html)
       .style("background-color", "#E7F4F5");
    })
    .on("mouseout", function(d, i) {
      tooltip.style("display", "none");
      d3.select(this).attr("stroke", "none")
         .attr("r", 5)
     })

  function title(afk){
    if (afk == "APR"){
     return "Flights (per habitant)";
    }
    else if (afk == "EFP"){
     return "Ecological Footprint";
    }
    else if (afk == "RPR"){
     return "Train Rides (per habitant)";
    }
    else if (afk == "EEX"){
     return "Government Environmental Expenditure";
    }
  }

  // title for the selected year
  svg.select(".year_title").text(year);
  svg.select(".x_title").text(title(x_var));
  svg.select(".y_title").text(title(y_var));

  // add a tooltip
  var tooltip = d3.select("#scatter_plot").append("foreignObject")
    .attr("width", 150)
    .attr("height", 80)

}
