require(['common'], function () {
  require(['jquery', 'api', '../lib/d3-6.6.0'], function ($, $http, d3) {

    d3.json('/d3-data', function (error) {
      if (error) alert('Error!')
    }).then(function (res) {
      let dataset = res.data
      let width = '100%'
      let height = '100%'
      let min = d3.min(dataset);
      let max = d3.max(dataset);

      // let linear = d3.scaleLinear()
      //   .domain([min, max])
      //   .range([0, 900])
      let svg = d3.select('#app')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      let rectHeight = 25  //每个矩形所占的像素高度(包括空白)
      svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", 20)
        .attr("y", function(d, i){
          return i * rectHeight
        })
        .attr("width", function(d){
          return d
        })
        .attr("height", rectHeight-2)
        .attr("fill", "steelblue")
    })
  })
})
