// Pascalle Veltman, 11025646

window.onload = function () {

  // import json data files
  var requests = [d3.json("/data/2005VB.json")];

  // call plot function with given data file
  Promise.all(requests).then(function(response) {

      slider(response[0]);

  });

};

function slider(data){

  // make selection of years from data
  var years = d3.range(0, 12).map(function(d) {
      return new Date(2005 + d, 10, 3);
  });

  console.log(data);
  var width = 600;
  var height = 100;

  // Set slider
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
       });

  var g = d3.select("#slider")
    .append("svg")
      .attr("height", height)
      .attr("width", width)
    .append("g")
      .attr('transform', 'translate(20,20)');

  g.call(time_slider);

  d3.select('p#value-time').text(d3.timeFormat('%Y')(time_slider.value()));

}
