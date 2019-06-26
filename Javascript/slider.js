function slider(data){

  // make selection of all years of the dataset
  var years = d3.range(0, 12)
    .map(function(d) {
      return new Date(2005 + d, 10, 3);
    });

  // set the size of the slider
  var width = 700;
  var height = 80;

  // make the slider
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
      scatter_plot_update(data, 1);
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
